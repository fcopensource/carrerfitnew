"use client";

import {
  BarChart3, BrainCircuit, Check, ChevronRight, CircleCheck, Code2, Lightbulb,
  ListChecks, Maximize2, Minimize2, Play, RotateCcw, Save, Sparkles, Timer, Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppNav from "@/components/AppNav";

type PracticeMode = "coding" | "aptitude";
type Language = "JavaScript" | "Python" | "Java" | "C++" | "C" | "Go" | "Rust";

const languageTemplates: Record<Language, string> = {
  JavaScript: "function solve(input) {\\n  // Write your solution here\\n  \\n}",
  Python: "def solve(input):\\n    # Write your solution here\\n    pass",
  Java: "class Solution {\\n    public Object solve(Object input) {\\n        // Write your solution here\\n        return null;\\n    }\\n}",
  "C++": "#include <bits/stdc++.h>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<int> solve(vector<int>& input) {\\n        // Write your solution here\\n    }\\n};",
  C: "#include <stdio.h>\\n\\nint main(void) {\\n    // Write your solution here\\n    return 0;\\n}",
  Go: "package main\\n\\nfunc solve(input []int) []int {\\n    // Write your solution here\\n    return nil\\n}",
  Rust: "fn solve(input: Vec<i32>) -> Vec<i32> {\\n    // Write your solution here\\n    vec![]\\n}",
};

type CodingProblem = { title: string; difficulty: "Easy" | "Medium"; category: string; prompt: string; examples: string[]; starter: string };

const codingProblems: CodingProblem[] = [
  {
    title: "Two-sum pairs", difficulty: "Easy", category: "Arrays",
    prompt: "Given an array of numbers and a target, return the indexes of two values whose sum equals the target. Assume exactly one solution exists.",
    examples: ["Input: [2, 7, 11, 15], target = 9", "Output: [0, 1]"],
    starter: "function twoSum(numbers, target) {\n  // Write your approach here\n  \n}",
  },
  {
    title: "Valid brackets", difficulty: "Easy", category: "Stacks",
    prompt: "Return true when every opening bracket is correctly closed in the right order.",
    examples: ["Input: \"{[()]}\"", "Output: true"],
    starter: "function isValid(value) {\n  // Write your approach here\n  \n}",
  },
  {
    title: "Longest unique substring", difficulty: "Medium", category: "Strings",
    prompt: "Find the length of the longest substring that contains no repeated characters.",
    examples: ["Input: \"careerfit\"", "Output: 6"],
    starter: "function longestUniqueSubstring(value) {\n  // Write your approach here\n  \n}",
  },
];

const aptitudeQuestions = [
  { category: "Quantitative", question: "A role has a salary of ₹60,000 per month. After a 15% increase, what is the new monthly salary?", options: ["₹66,000", "₹69,000", "₹72,000", "₹75,000"], answer: 1 },
  { category: "Logical reasoning", question: "Which number completes the series: 3, 8, 15, 24, ?", options: ["30", "33", "35", "37"], answer: 2 },
  { category: "Verbal reasoning", question: "Choose the word closest in meaning to “concise.”", options: ["Detailed", "Brief", "Uncertain", "Informal"], answer: 1 },
  { category: "Data interpretation", question: "A team completed 18 of 24 planned tasks. What percentage of tasks are complete?", options: ["65%", "70%", "75%", "80%"], answer: 2 },
  { category: "Problem solving", question: "A process takes 30 minutes. Automation reduces it by 40%. How long does it take now?", options: ["12 minutes", "18 minutes", "20 minutes", "24 minutes"], answer: 1 },
  { category: "Quantitative", question: "A candidate answers 42 of 50 questions correctly. What is the score percentage?", options: ["80%", "82%", "84%", "86%"], answer: 2 },
  { category: "Logical reasoning", question: "If all analysts are problem-solvers and some problem-solvers are writers, which statement must be true?", options: ["All writers are analysts", "Some analysts are writers", "All analysts are problem-solvers", "No writer is an analyst"], answer: 2 },
  { category: "Verbal reasoning", question: "Choose the grammatically correct sentence.", options: ["Each of the reports were reviewed.", "Each of the reports was reviewed.", "Each reports was reviewed.", "Each report were reviewed."], answer: 1 },
  { category: "Data interpretation", question: "Revenue grew from ₹8 lakh to ₹10 lakh. What was the percentage increase?", options: ["20%", "22.5%", "25%", "28%"], answer: 2 },
  { category: "Quantitative", question: "A team of 6 completes a task in 10 days. At the same rate, how many days would 12 people need?", options: ["4", "5", "6", "8"], answer: 1 },
  { category: "Logical reasoning", question: "A meeting is on Thursday. Two days after the meeting is:", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 2 },
  { category: "Problem solving", question: "You discover an error in a report one hour before delivery. What is the strongest first action?", options: ["Send it without changes", "Hide the error", "Verify the impact and correct the affected figures", "Wait for someone else to notice"], answer: 2 },
] as const;

export default function PracticePage({ initialMode = "coding", standalone = false }: { initialMode?: PracticeMode; standalone?: boolean }) {
  const [mode, setMode] = useState<PracticeMode>(initialMode);
  const [problemIndex, setProblemIndex] = useState(0);
  const [code, setCode] = useState(codingProblems[0].starter);
  const [codeMessage, setCodeMessage] = useState("Choose a problem, write your approach, then review it against the examples.");
  const [language, setLanguage] = useState<Language>("JavaScript");
  const [editorFullscreen, setEditorFullscreen] = useState(false);
  const [draftState, setDraftState] = useState("Draft saved locally");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testStarted, setTestStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const problem = codingProblems[problemIndex];
  const score = useMemo(() => aptitudeQuestions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);

  useEffect(() => {
    const updateFullscreenState = () => setEditorFullscreen(document.fullscreenElement?.id === "careerfit-editor");
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  function selectProblem(index: number) {
    setProblemIndex(index); setCode(languageTemplates[language]); setDraftState("New problem draft"); setCodeMessage("New workspace ready. Trace the sample cases before you submit your approach.");
  }

  function changeLanguage(next: Language) {
    setLanguage(next); setCode(languageTemplates[next]); setDraftState(`New ${next} draft`); setCodeMessage(`${next} starter template loaded. Explain your approach before you submit.`);
  }

  function saveDraft() {
    window.localStorage.setItem(`carrerfit-coding-${problemIndex}-${language}`, code);
    setDraftState("Saved in this browser");
  }

  async function toggleEditorFullscreen() {
    const editor = document.getElementById("careerfit-editor");
    if (!editor) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await editor.requestFullscreen();
  }

  function reviewCode() {
    const lines = code.trim().split("\n").filter(Boolean).length;
    setCodeMessage(lines < 4 ? "Add your approach, edge cases, and a return statement before reviewing." : "Approach captured. Check time complexity, empty input, and the provided sample cases before a secure runner is enabled.");
  }

  function restartTest() {
    setAnswers({}); setSubmitted(false); setTestStarted(true);
  }

  return (
    <main className="practiceShell">
      <AppNav light />
      <section className="practiceHero">
        <div>
          <span className="practiceEyebrow"><Sparkles/> Careerfit Practice Centre</span>
          <h1>Practice skills that make you <em>job-ready.</em></h1>
          <p>Build coding confidence, sharpen aptitude, and finish each session with focused next steps.</p>
        </div>
        <div className="practiceStats">
          <span><Code2/> Coding drills</span><span><BrainCircuit/> Aptitude tests</span><span><BarChart3/> Scorecards</span>
          <div className="practiceRouteLinks"><Link className={mode === "coding" ? "selected" : ""} href="/coding-practice">Coding playground</Link><Link className={mode === "aptitude" ? "selected" : ""} href="/aptitude-tests">Aptitude tests</Link></div>
        </div>
      </section>

      {!standalone && <section className="practiceTabs" aria-label="Practice mode">
        <button className={mode === "coding" ? "active" : ""} onClick={() => setMode("coding")}><Code2/> Coding practice <ChevronRight/></button>
        <button className={mode === "aptitude" ? "active" : ""} onClick={() => setMode("aptitude")}><BrainCircuit/> Aptitude test <ChevronRight/></button>
      </section>}

      {mode === "coding" ? (
        <section className="codingWorkspace">
          <aside className="problemList">
            <div><span>Problem set</span><strong>Core interview patterns</strong></div>
            {codingProblems.map((item, index) => <button className={index === problemIndex ? "selected" : ""} onClick={() => selectProblem(index)} key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{item.title}</strong><small>{item.category} · <i className={item.difficulty.toLowerCase()}>{item.difficulty}</i></small></span></button>)}
          </aside>
          <div className="problemPanel">
            <div className="problemHeader"><span>{problem.category}</span><i className={problem.difficulty.toLowerCase()}>{problem.difficulty}</i></div>
            <h2>{problem.title}</h2><p>{problem.prompt}</p>
            <div className="sampleCases"><strong>Examples</strong>{problem.examples.map((example) => <code key={example}>{example}</code>)}</div>
            <div className="problemGuidance"><Lightbulb/><span><strong>Think before you type</strong>Describe your data structure and time complexity in a comment.</span></div>
          </div>
          <div id="careerfit-editor" className={editorFullscreen ? "editorPanel isFullscreen" : "editorPanel"}>
            <div className="editorTop"><span><CircleCheck/> Careerfit code studio</span><div><span className="draftState">{draftState}</span><button className="editorIconButton" onClick={toggleEditorFullscreen} aria-label={editorFullscreen ? "Exit full screen" : "Enter full screen"}>{editorFullscreen ? <Minimize2/> : <Maximize2/>}</button></div></div>
            <div className="editorToolbar"><label>Language<select value={language} onChange={(event) => changeLanguage(event.target.value as Language)}>{(Object.keys(languageTemplates) as Language[]).map((item) => <option key={item}>{item}</option>)}</select></label><span>Problem #{String(problemIndex + 1).padStart(2, "0")}</span><span className="sandboxNotice">Secure runner pending</span></div>
            <div className="editorCanvas"><ol aria-hidden="true">{code.split("\n").map((_, index) => <li key={index}>{index + 1}</li>)}</ol><textarea aria-label="Coding solution editor" value={code} onChange={(event) => { setCode(event.target.value); setDraftState("Unsaved changes"); }} spellCheck={false}/></div>
            <div className="editorActions"><button onClick={() => { setCode(languageTemplates[language]); setDraftState("Starter restored"); }}><RotateCcw/> Restore starter</button><div><button onClick={saveDraft}><Save/> Save draft</button><button className="primary" onClick={reviewCode}><Play/> Review solution</button></div></div>
            <div className="codeFeedback"><span><ListChecks/> Practice feedback</span><p>{codeMessage}</p></div>
          </div>
        </section>
      ) : (
        <section className="aptitudeWorkspace">
          {!testStarted ? <div className="testWelcome"><span><Timer/></span><small>Five-question assessment</small><h2>Test your interview readiness.</h2><p>Work through quantitative, logical, verbal, data, and problem-solving questions. Your scorecard appears instantly.</p><button onClick={() => setTestStarted(true)}>Start aptitude test <ChevronRight/></button></div> : !submitted ? <div className="testCard"><div className="testProgress"><span>Practice assessment</span><strong>{Object.keys(answers).length} / {aptitudeQuestions.length} answered</strong></div>{aptitudeQuestions.map((item, index) => <article key={item.question}><span>{String(index + 1).padStart(2, "0")} · {item.category}</span><h2>{item.question}</h2><div>{item.options.map((option, optionIndex) => <button className={answers[index] === optionIndex ? "selected" : ""} onClick={() => setAnswers((value) => ({ ...value, [index]: optionIndex }))} key={option}><b>{String.fromCharCode(65 + optionIndex)}</b>{option}</button>)}</div></article>)}<button className="submitTest" disabled={Object.keys(answers).length !== aptitudeQuestions.length} onClick={() => setSubmitted(true)}>View scorecard <Trophy/></button></div> : <div className="scorecard"><span className="scoreBadge"><Trophy/></span><small>Practice scorecard</small><h2>{score} of {aptitudeQuestions.length} correct</h2><p>{score >= 4 ? "Strong start. You are showing consistent interview reasoning." : "Useful baseline. Review the explanations and repeat the sections that felt slow."}</p><div className="scoreMeter"><i style={{ width: `${(score / aptitudeQuestions.length) * 100}%` }}/></div><div className="scoreBreakdown">{aptitudeQuestions.map((item, index) => <span className={answers[index] === item.answer ? "correct" : "review"} key={item.category}><b>{answers[index] === item.answer ? <Check/> : "!"}</b>{item.category}</span>)}</div><button onClick={restartTest}><RotateCcw/> Take another test</button></div>}
        </section>
      )}
    </main>
  );
}
