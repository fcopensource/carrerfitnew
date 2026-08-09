import mysql, { type Pool, type PoolOptions } from "mysql2/promise";

let pool: Pool | null = null;
let schemaPromise: Promise<void> | null = null;

export function isMysqlConfigured() {
  if (process.env.DATABASE_URL?.startsWith("mysql")) return true;
  return ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"].every((name) => Boolean(process.env[name]));
}

export function databaseBackend() {
  return isMysqlConfigured() ? "mysql" as const : "sqlite" as const;
}

export async function getMysqlPool() {
  if (!isMysqlConfigured()) throw new Error("MySQL environment variables are incomplete.");
  if (!pool) pool = mysql.createPool(mysqlOptions());
  await ensureMysqlSchema(pool);
  return pool;
}

export async function checkMysqlConnection() {
  const startedAt = Date.now();
  const connection = await (await getMysqlPool()).getConnection();
  try {
    await connection.query("SELECT 1");
    return { ok: true, backend: "mysql" as const, latencyMs: Date.now() - startedAt };
  } finally {
    connection.release();
  }
}

function mysqlOptions(): PoolOptions {
  const url = process.env.DATABASE_URL?.startsWith("mysql") ? new URL(process.env.DATABASE_URL) : null;
  const sslEnabled = /^(1|true|yes)$/i.test(process.env.DB_SSL || "");
  return {
    host: url?.hostname || process.env.DB_HOST,
    port: Number(url?.port || process.env.DB_PORT || 3306),
    user: url ? decodeURIComponent(url.username) : process.env.DB_USER,
    password: url ? decodeURIComponent(url.password) : process.env.DB_PASSWORD,
    database: url ? decodeURIComponent(url.pathname.replace(/^\//, "")) : process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Math.max(2, Math.min(10, Number(process.env.DB_POOL_SIZE) || 5)),
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    dateStrings: true,
    charset: "utf8mb4",
    ...(sslEnabled ? { ssl: { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false" } } : {}),
  };
}

async function ensureMysqlSchema(target: Pool) {
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    const connection = await target.getConnection();
    try {
      await connection.query(`CREATE TABLE IF NOT EXISTS job_sources (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        url TEXT NOT NULL,
        url_hash CHAR(64) NOT NULL UNIQUE,
        type VARCHAR(40) NOT NULL,
        enabled TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME(3) NOT NULL,
        last_scraped_at DATETIME(3) NULL,
        last_status VARCHAR(24) NOT NULL DEFAULT 'Pending',
        last_error VARCHAR(500) NULL,
        last_import_count INT UNSIGNED NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query("UPDATE job_sources SET enabled=0,last_status='Success',last_error=NULL WHERE id='manual-admin-source'");
      await connection.query("UPDATE job_sources SET enabled=0,last_status='Failed',last_error='Disabled because the source did not expose structured individual job records.' WHERE url LIKE '%google.com/about/careers/applications/jobs/results%' OR url LIKE '%hirist.tech%'");
      await connection.query("UPDATE job_sources SET enabled=0,last_status='Failed',last_error='Disabled because this is an individual stale job page, not a reusable employer feed.' WHERE name='Summer 2027 Intern - Software Engineer'");
      await connection.query(`INSERT IGNORE INTO job_sources
        (id,name,url,url_hash,type,enabled,created_at) VALUES
        ('seed-lever-jumpcloud','JumpCloud','https://jobs.lever.co/jumpcloud','1f5bf77471b5b946aa2ba6897e914246502fb005753e8d55f7b74f96ff385a87','Lever',1,UTC_TIMESTAMP(3)),
        ('seed-lever-smart-working','Smart Working','https://jobs.lever.co/smart-working-solutions','54912d486575bb10f2e36add53444591e67b97f13e7877977cb5c95386343ccc','Lever',1,UTC_TIMESTAMP(3)),
        ('seed-lever-highlevel','HighLevel','https://jobs.lever.co/gohighlevel','6948382583be4ab2f295045dc48dedf9b0c0d6cd3cdc76c99ce729c8738afb23','Lever',1,UTC_TIMESTAMP(3)),
        ('seed-lever-peoplegrove','PeopleGrove','https://jobs.lever.co/peoplegrove','8148cdbcde9dadf587ccd93212bc98eaf37ad20aee8a0421f0347ee8469c37e3','Lever',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-phonepe','PhonePe','https://boards.greenhouse.io/phonepe','d3f1200fae3566d50b764e60d02fb8f2485a9f2699cdd05018a53c7faee36655','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-postman','Postman','https://boards.greenhouse.io/postman','d70b76f9bd9f9fe7aa62177f8cae4e8adb74b8b47e561fabf18c46dc044f9a5c','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-ashby-linear','Linear','https://jobs.ashbyhq.com/linear','ed039c768172c33d03f780799b57441a89743d499c6be155b77f8fa4baeefbe6','Ashby',1,UTC_TIMESTAMP(3)),
        ('seed-ashby-ramp','Ramp','https://jobs.ashbyhq.com/ramp','c068716db4f03e610c81b8535835fe4539affb2cafd4dfa9c1d5b60acf522f12','Ashby',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-figma','Figma','https://boards.greenhouse.io/figma','66c8efac1d5f8431eba7be9cb8f373673e10dc1e7bebb2a8e70c5dc28c55d2c8','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-cloudflare','Cloudflare','https://boards.greenhouse.io/cloudflare','2818aa96d8535c0ee9b7de1a81bdf0779aa81625822a92d20bf1168e9109134f','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-datadog','Datadog','https://boards.greenhouse.io/datadog','246cded4fabc0820e15a0b97426250d142bec511369d7d5e8ad13266e2d2ebfe','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-mongodb','MongoDB','https://boards.greenhouse.io/mongodb','d3627c8522668117c83fc9b1d5f5d521bfc714d16e9129c8186098e4a4f29b9a','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-grafanalabs','Grafana Labs','https://boards.greenhouse.io/grafanalabs','2b7de3d1f33c3ce1ef4d1b0459ae0297cbe4138ec6deba292a5998bbf9a300fa','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-twilio','Twilio','https://boards.greenhouse.io/twilio','f1146bb952f3ced1d8cb00e04549164cba8ba5e086ed30e3000a337e2ef0f0a9','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-coinbase','Coinbase','https://boards.greenhouse.io/coinbase','4f9816f45923672636fcfbf85073f8148be8e768ad1ff1e5522e98a418f74ef2','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-reddit','Reddit','https://boards.greenhouse.io/reddit','348615190345f23b423a4457b43f4c43e67d05c4e775d4a1ee4efb9ce6c14814','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-samsara','Samsara','https://boards.greenhouse.io/samsara','e77019793e1fd6d7fd6cdb368fded4e44e417d50e260a75fe1e73a605accc914','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-coursera','Coursera','https://boards.greenhouse.io/coursera','1634d01b26157f931a03ce8f79125b9d86baa0df6df319b63628d835da251ecb','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-discord','Discord','https://boards.greenhouse.io/discord','107b960ce91a6582875b99ab65fb822368f9cd8caa5d3c5a8fe72bc35f257e0f','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-okta','Okta','https://boards.greenhouse.io/okta','5e36e359e9043068a97bf5edd8cce82678d96a6b49a89b751ccb78adb47dacc8','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-airbnb','Airbnb','https://boards.greenhouse.io/airbnb','8076eb02fd1f8d04b1e7335514168c7d43a51be16f5100db42a1f1dc999bd28f','Greenhouse',1,UTC_TIMESTAMP(3)),
        ('seed-greenhouse-duolingo','Duolingo','https://boards.greenhouse.io/duolingo','8efc8ab52c74b437a41e04bfd42c61d19087808fef9dccd7ddd40ee340a6596c','Greenhouse',1,UTC_TIMESTAMP(3))`);
      await connection.query(`CREATE TABLE IF NOT EXISTS imported_jobs (
        id VARCHAR(80) PRIMARY KEY,
        external_id VARCHAR(200) NOT NULL,
        source_id VARCHAR(36) NOT NULL,
        source_type VARCHAR(40) NOT NULL,
        source_name VARCHAR(120) NOT NULL,
        title VARCHAR(180) NOT NULL,
        company VARCHAR(120) NOT NULL,
        location VARCHAR(200) NOT NULL,
        work_mode VARCHAR(24) NOT NULL,
        description LONGTEXT NOT NULL,
        apply_url TEXT NOT NULL,
        posted_at DATETIME(3) NULL,
        skills LONGTEXT NOT NULL,
        requirements LONGTEXT NOT NULL,
        category VARCHAR(80) NOT NULL,
        level VARCHAR(80) NOT NULL,
        active TINYINT(1) NOT NULL DEFAULT 1,
        first_seen_at DATETIME(3) NOT NULL,
        last_seen_at DATETIME(3) NOT NULL,
        UNIQUE KEY imported_jobs_source_external_uq (source_id, external_id),
        KEY imported_jobs_active_idx (active, last_seen_at),
        KEY imported_jobs_search_idx (title, company, category),
        CONSTRAINT imported_jobs_source_fk FOREIGN KEY (source_id) REFERENCES job_sources(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query("UPDATE imported_jobs SET active=0 WHERE LOWER(TRIM(title)) IN ('search job','search jobs','job search') OR LOWER(title) LIKE '%job vacancies%'");
      await connection.query(`CREATE TABLE IF NOT EXISTS carrerfit_store (
        store_key VARCHAR(40) PRIMARY KEY,
        payload LONGTEXT NOT NULL,
        updated_at DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(254) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email_verified_at DATETIME(3) NULL,
        failed_login_count INT UNSIGNED NOT NULL DEFAULT 0,
        locked_until DATETIME(3) NULL,
        last_login_at DATETIME(3) NULL,
        created_at DATETIME(3) NOT NULL,
        updated_at DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS auth_sessions (
        token_hash CHAR(64) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        expires_at DATETIME(3) NOT NULL,
        created_at DATETIME(3) NOT NULL,
        last_seen_at DATETIME(3) NOT NULL,
        user_agent_hash CHAR(64) NULL,
        ip_hash CHAR(64) NULL,
        mfa_verified_at DATETIME(3) NULL,
        KEY auth_sessions_user_idx (user_id),
        KEY auth_sessions_expiry_idx (expires_at),
        CONSTRAINT auth_sessions_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query("ALTER TABLE auth_sessions ADD COLUMN IF NOT EXISTS mfa_verified_at DATETIME(3) NULL");
      await connection.query(`CREATE TABLE IF NOT EXISTS admin_mfa (
        user_id VARCHAR(36) PRIMARY KEY,
        secret_ciphertext TEXT NOT NULL,
        enabled_at DATETIME(3) NULL,
        created_at DATETIME(3) NOT NULL,
        updated_at DATETIME(3) NOT NULL,
        CONSTRAINT admin_mfa_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS admin_access_tokens (
        token_hash CHAR(64) PRIMARY KEY,
        expires_at DATETIME(3) NOT NULL,
        created_at DATETIME(3) NOT NULL,
        KEY admin_access_tokens_expiry_idx (expires_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS administrator_accounts (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        active TINYINT(1) NOT NULL DEFAULT 1,
        failed_login_count INT UNSIGNED NOT NULL DEFAULT 0,
        locked_until DATETIME(3) NULL,
        last_login_at DATETIME(3) NULL,
        created_at DATETIME(3) NOT NULL,
        updated_at DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS job_bot_runs (
        id VARCHAR(36) PRIMARY KEY,
        trigger_type VARCHAR(24) NOT NULL,
        status VARCHAR(24) NOT NULL,
        source_count INT UNSIGNED NOT NULL DEFAULT 0,
        refreshed_count INT UNSIGNED NOT NULL DEFAULT 0,
        failed_count INT UNSIGNED NOT NULL DEFAULT 0,
        started_at DATETIME(3) NOT NULL,
        finished_at DATETIME(3) NULL,
        KEY job_bot_runs_started_idx (started_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS analytics_sessions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NULL,
        device_type VARCHAR(20) NOT NULL,
        started_at DATETIME(3) NOT NULL,
        last_seen_at DATETIME(3) NOT NULL,
        total_duration_ms BIGINT UNSIGNED NOT NULL DEFAULT 0,
        page_views INT UNSIGNED NOT NULL DEFAULT 0,
        KEY analytics_sessions_user_idx (user_id,last_seen_at),
        KEY analytics_sessions_seen_idx (last_seen_at),
        CONSTRAINT analytics_sessions_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS analytics_events (
        id VARCHAR(36) PRIMARY KEY,
        session_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NULL,
        path VARCHAR(300) NOT NULL,
        event_type VARCHAR(24) NOT NULL,
        duration_ms INT UNSIGNED NOT NULL DEFAULT 0,
        created_at DATETIME(3) NOT NULL,
        KEY analytics_events_path_idx (path,created_at),
        KEY analytics_events_session_idx (session_id,created_at),
        KEY analytics_events_user_idx (user_id,created_at),
        CONSTRAINT analytics_events_session_fk FOREIGN KEY (session_id) REFERENCES analytics_sessions(id) ON DELETE CASCADE,
        CONSTRAINT analytics_events_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS auth_tokens (
        token_hash CHAR(64) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        purpose VARCHAR(32) NOT NULL,
        expires_at DATETIME(3) NOT NULL,
        created_at DATETIME(3) NOT NULL,
        KEY auth_tokens_user_purpose_idx (user_id, purpose),
        KEY auth_tokens_expiry_idx (expires_at),
        CONSTRAINT auth_tokens_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS user_private_data (
        user_id VARCHAR(36) PRIMARY KEY,
        resume_profile LONGTEXT NULL,
        resume_jobs LONGTEXT NULL,
        assessment_matches LONGTEXT NULL,
        updated_at DATETIME(3) NOT NULL,
        CONSTRAINT user_private_data_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS user_resume_files (
        user_id VARCHAR(36) PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        mime_type VARCHAR(120) NOT NULL,
        size_bytes INT UNSIGNED NOT NULL,
        encrypted_data LONGBLOB NOT NULL,
        iv VARBINARY(12) NOT NULL,
        auth_tag VARBINARY(16) NOT NULL,
        uploaded_at DATETIME(3) NOT NULL,
        CONSTRAINT user_resume_files_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS user_resume_documents (
        user_id VARCHAR(36) PRIMARY KEY,
        encrypted_document LONGBLOB NOT NULL,
        document_iv VARBINARY(12) NOT NULL,
        document_auth_tag VARBINARY(16) NOT NULL,
        encrypted_text LONGBLOB NOT NULL,
        text_iv VARBINARY(12) NOT NULL,
        text_auth_tag VARBINARY(16) NOT NULL,
        word_count INT UNSIGNED NOT NULL,
        character_count INT UNSIGNED NOT NULL,
        analyzed_at DATETIME(3) NOT NULL,
        CONSTRAINT user_resume_documents_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS resume_analysis_runs (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        status VARCHAR(24) NOT NULL,
        ai_powered TINYINT(1) NULL,
        ats_score INT UNSIGNED NULL,
        extraction_confidence DECIMAL(5,4) NULL,
        processing_ms INT UNSIGNED NULL,
        error_code VARCHAR(80) NULL,
        created_at DATETIME(3) NOT NULL,
        completed_at DATETIME(3) NULL,
        KEY resume_runs_user_idx (user_id,created_at),
        KEY resume_runs_status_idx (status,created_at),
        CONSTRAINT resume_runs_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS user_applications (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        job_id VARCHAR(80) NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_at DATETIME(3) NOT NULL,
        UNIQUE KEY user_applications_job_uq (user_id, job_id),
        KEY user_applications_user_idx (user_id),
        CONSTRAINT user_applications_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      await connection.query(`CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(160) NOT NULL UNIQUE,
        title VARCHAR(180) NOT NULL,
        excerpt VARCHAR(400) NOT NULL,
        content LONGTEXT NOT NULL,
        category VARCHAR(80) NOT NULL,
        tags LONGTEXT NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        seo_title VARCHAR(180) NOT NULL,
        seo_description VARCHAR(400) NOT NULL,
        featured TINYINT(1) NOT NULL DEFAULT 0,
        status VARCHAR(20) NOT NULL DEFAULT 'Draft',
        published_at DATETIME(3) NULL,
        created_at DATETIME(3) NOT NULL,
        updated_at DATETIME(3) NOT NULL,
        KEY blog_posts_status_date_idx (status, published_at),
        KEY blog_posts_category_idx (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    } finally {
      connection.release();
    }
  })().catch((error) => {
    schemaPromise = null;
    throw error;
  });
  return schemaPromise;
}

export async function closeMysqlPoolForTests() {
  if (pool) await pool.end();
  pool = null;
  schemaPromise = null;
}
