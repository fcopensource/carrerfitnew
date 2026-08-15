import { z } from "zod";

export type AiProvider = "openai" | "groq";

export async function aiJson<T>(options: {
  name: string;
  system: string;
  user: string;
  schema: z.ZodType<T>;
  maxTokens: number;
  model?: string;
  reasoningEffort?: "low" | "medium" | "high" | "xhigh";
}): Promise<{ data: T; provider: AiProvider } | null> {
  if (process.env.CARRERFIT_DISABLE_AI === "1") return null;
  const jsonSchema = z.toJSONSchema(options.schema, { io: "output" }) as Record<string, unknown>;
  delete jsonSchema.$schema;

  if (process.env.OPENAI_API_KEY) {
    const result = await requestJson({
      provider: "openai",
      url: "https://api.openai.com/v1/chat/completions",
      apiKey: process.env.OPENAI_API_KEY,
      model: options.model || process.env.OPENAI_MODEL || "gpt-5.4",
      options,
      jsonSchema,
    });
    if (result) return result;
  }

  if (process.env.GROQ_API_KEY) {
    return requestJson({
      provider: "groq",
      url: "https://api.groq.com/openai/v1/chat/completions",
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      options,
      jsonSchema,
    });
  }
  return null;
}

async function requestJson<T>({ provider, url, apiKey, model, options, jsonSchema }: {
  provider: AiProvider;
  url: string;
  apiKey: string;
  model: string;
  options: { name: string; system: string; user: string; schema: z.ZodType<T>; maxTokens: number; model?: string; reasoningEffort?: "low" | "medium" | "high" | "xhigh" };
  jsonSchema: Record<string, unknown>;
}): Promise<{ data: T; provider: AiProvider } | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        model,
        max_completion_tokens: options.maxTokens,
        ...(provider === "openai" ? {
          reasoning_effort: options.reasoningEffort || process.env.OPENAI_REASONING_EFFORT || "high",
          verbosity: process.env.OPENAI_VERBOSITY || "high",
        } : {}),
        response_format: { type: "json_schema", json_schema: { name: options.name, strict: true, schema: jsonSchema } },
        messages: [{ role: "system", content: options.system }, { role: "user", content: options.user }],
      }),
    });
    if (!response.ok) {
      console.error(`${provider} AI request failed`, response.status, (await response.text()).slice(0, 500));
      return null;
    }
    const payload = await response.json() as { choices?: { message?: { content?: string } }[] };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = options.schema.safeParse(JSON.parse(content));
    if (!parsed.success) {
      console.error(`${provider} AI response validation failed`, parsed.error.issues.slice(0, 6));
      return null;
    }
    return { data: parsed.data, provider };
  } catch (error) {
    console.error(`${provider} AI request error`, error instanceof Error ? error.message : error);
    return null;
  }
}

export function configuredAiProvider(): AiProvider | null {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GROQ_API_KEY) return "groq";
  return null;
}
