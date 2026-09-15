// data/projects.js — Single Source of Truth (Blueprint §4)
// Decoupled verifiable projects. Every entry links to real code.
// Categories: backend | distributed | devops | cloud-native
// Featured = top 3 shown by default per Blueprint progressive disclosure

var PROJECTS_DATA = [
  {
    id: "secure-doc-portal",
    title: "Secure Document Exchange Portal",
    tagline: "End-to-End Encrypted Document Vault with S3 & Redis",
    category: "backend",
    featured: true,
    badges: ["Go", "Fiber", "PostgreSQL", "Redis", "MinIO", "sqlc", "JWT"],
    themeColor: "#A9C4D6",
    githubUrl: "https://github.com/Aliexe-code/Secure-Document-Exchange-Portal",
    liveUrl: "",
    youtubeUrl: "",
    coverImage: "assets/projects/s3.webp",
    gallery: ["assets/projects/s3.webp"],
    techStack: ["Go 1.25", "Fiber v2", "PostgreSQL + pgx + sqlc + goose", "Redis", "MinIO (S3)", "Hashicorp Vault / age", "Asynq", "JWT"],
    summary: "Secure document exchange platform with envelope encryption, JWT auth, S3-compatible storage and Redis caching — designed for sensitive file sharing with expiring share links and rate limiting.",
    highlights: [
      "Architected envelope encryption (AES-256-GCM) with Vault/age key management; encryption at rest for all documents.",
      "Implemented Redis caching tier for metadata queries, reducing PostgreSQL load and p95 latency on hot paths.",
      "Designed expiring share links, access-count limits, JWT sessions, and Asynq background jobs with sqlc type-safe queries."
    ],
    architecture: {
      pattern: "Modular Monolith — Fiber API → Service Layer → Repository (sqlc) → PostgreSQL",
      layers: "Handler (Fiber) → Service (Auth/Encryption/Storage) → Data (PostgreSQL + MinIO + Redis) → Jobs (Asynq)",
      keyDecisions: "sqlc over ORM for compile-time SQL safety; pgx pooling; goose migrations; S3-compatible MinIO for portability; Redis for metadata not blobs."
    }
  },
  {
    id: "chatx",
    title: "ChatX — Real-Time Chat Platform",
    tagline: "Horizontally Scalable WebSocket Platform with NATS",
    category: "distributed",
    featured: true,
    badges: ["Go", "WebSockets", "NATS", "Echo", "PostgreSQL"],
    themeColor: "#D9A28B",
    githubUrl: "https://github.com/Aliexe-code/chatx",
    liveUrl: "",
    youtubeUrl: "",
    coverImage: "assets/projects/nats.webp",
    gallery: ["assets/projects/nats.webp"],
    techStack: ["Go 1.25", "Echo", "WebSockets (RFC 6455)", "NATS JetStream", "PostgreSQL", "sync.RWMutex Hub"],
    summary: "Horizontally scalable real-time chat with public/private rooms, password protection and NATS pub/sub for cross-node routing — hub-based WebSocket architecture handling high concurrency.",
    highlights: [
      "Engineered hub pattern with sync.RWMutex and queue groups (chat.global, chat.room.*) for stateless horizontal scaling across NATS.",
      "Built auto-reconnect, fault tolerance and WebSocket lifecycle management with graceful cleanup and presence tracking.",
      "Supports millions of msgs/sec via NATS JetStream with pagination and filtering for message history."
    ],
    architecture: {
      pattern: "Event-Driven Hub + Pub/Sub (NATS)",
      layers: "Client (WS) → Echo Server → Hub (in-memory + RWMutex) → NATS Broker → PostgreSQL",
      keyDecisions: "NATS queue groups for room load balancing; stateless servers share nothing; fallback to single-node mode when NATS unavailable."
    }
  },
  {
    id: "paymob-integration",
    title: "PayMob Go Integration",
    tagline: "Production Payment Gateway — Modular Monolith + HTMX",
    category: "backend",
    featured: true,
    badges: ["Go", "Fiber", "SQLite", "PayMob", "HTMX", "Tailwind"],
    themeColor: "#A9C4D6",
    githubUrl: "https://github.com/Aliexe-code/paymob-go-integration",
    liveUrl: "",
    youtubeUrl: "",
    coverImage: "assets/projects/paymob.webp",
    gallery: ["assets/projects/paymob.webp"],
    techStack: ["Go 1.21+", "Fiber", "SQLite (WAL)", "PayMob Accept API", "HTMX + Tailwind", "HMAC Webhooks"],
    summary: "API-first PayMob integration with clean JSON API usable from any frontend, plus optional HTMX demo UI — HMAC-verified webhooks, dashboard and WAL-mode SQLite for concurrency.",
    highlights: [
      "Designed frontend-agnostic JSON API with optional HTMX web layer via Go build tags (api vs web).",
      "Implemented real PayMob flows (auth → order → payment key) with HMAC webhook verification and admin dashboard.",
      "SQLite WAL mode with embedded templates; demo mode for local testing without real credentials."
    ],
    architecture: {
      pattern: "Modular Monolith — domain/modules (payment, dashboard, webhook)",
      layers: "Handler (Fiber) → Domain (models/interfaces) → SQLite (WAL) → External (PayMob API)",
      keyDecisions: "Build tags to ship api-only binary; HMAC for webhook trust; SQLite for zero-ops deployment; HTMX for SSR without SPA weight."
    }
  },
  {
    id: "price-fetcher",
    title: "Microservice PriceFetcher",
    tagline: "Dual gRPC + REST Price Service with Benchmarking",
    category: "distributed",
    featured: false,
    badges: ["Go", "gRPC", "Protobuf", "REST", "Logrus"],
    themeColor: "#A9C4D6",
    githubUrl: "https://github.com/Aliexe-code/microservice-priceFetcher",
    liveUrl: "",
    youtubeUrl: "",
    coverImage: "assets/projects/grpc.webp",
    gallery: ["assets/projects/grpc.webp"],
    techStack: ["Go 1.25", "gRPC v1.78", "Protocol Buffers", "HTTP/JSON", "Logrus", "Decorator Pattern"],
    summary: "High-performance price microservice exposing identical data over gRPC (:8081) and REST (:8080) with automated 100k-iteration benchmarking and structured logging.",
    highlights: [
      "Built parallel gRPC + REST servers sharing a decorated service layer with request ID and duration logging.",
      "Defined Protobuf contracts with generated code for type-safe cross-service communication.",
      "Benchmark harness quantifies throughput/latency delta between gRPC (binary) vs REST (JSON)."
    ],
    architecture: {
      pattern: "Hexagonal — Core Service Wrapped by Adapters (gRPC/HTTP + Logging Middleware)",
      layers: "Client (gRPC|HTTP) → Logging Decorator → Price Service → Mock Data (AAPL/MSFT/GOOGL)",
      keyDecisions: "Decorator for cross-cutting logging; UUID request IDs; separate ports to allow independent scaling."
    }
  },

];

// OSS Contributions — verifiable, with truthful state badges per Blueprint Data Integrity pillar
var OSS_DATA = [
  {
    id: "gofakes3-114",
    repo: "johannesboyne/gofakes3",
    title: "Fix ListBucket pagination (s3bolt)",
    prUrl: "https://github.com/johannesboyne/gofakes3/pull/114",
    issueUrl: "",
    state: "merged",
    date: "Jul 2026",
    version: "v1.2.0",
    badges: ["Go", "BoltDB", "S3"],
    summary: "Aligned s3bolt ListBucket with s3mem: honor page.Marker + MaxKeys, cursor via c.Seek(), correct IsTruncated/NextMarker.",
    highlights: ["Used marker-based cursor seeks; matched s3mem semantics; shipped in v1.2.0 used downstream in production."]
  },
  {
    id: "docker-agent-1807",
    repo: "docker/docker-agent",
    title: "Fix alloy-model provider display (bug #1776)",
    prUrl: "https://github.com/docker/docker-agent/pull/1807",
    issueUrl: "https://github.com/docker/docker-agent/issues/1776",
    state: "merged",
    date: "Feb 2026",
    badges: ["Go", "AI Agents"],
    summary: "formattedModel derived from modelID not actual providerID — fixed by forwarding real providerID to handleStream for correct AgentInfo events.",
    highlights: ["Refactored stream handling; correct sidebar provider/model format; user-reported bug fix."]
  },
  {
    id: "agent-sandbox-332",
    repo: "kubernetes-sigs/agent-sandbox",
    title: "Add GitHub Actions workflow linters",
    prUrl: "https://github.com/kubernetes-sigs/agent-sandbox/pull/332",
    issueUrl: "",
    state: "merged",
    date: "Feb 2026",
    badges: ["Go", "CI/CD", "actionlint"],
    summary: "Added actionlint validation pre-merge with dev/tools/lint-workflows script, CI presubmit and make lint-workflows.",
    highlights: ["Reproducible locally; surfaces YAML errors before merge; CI presubmit integration."]
  },
  {
    id: "slatedb-1308",
    repo: "slatedb/slatedb",
    title: "Add DbReaderBuilder (builder-style creation)",
    prUrl: "https://github.com/slatedb/slatedb/pull/1308",
    issueUrl: "",
    state: "merged",
    date: "Feb 2026",
    badges: ["Rust", "SlateDB", "Storage"],
    summary: "Introduced builder pattern for DbReader creation for ergonomic, composable initialization.",
    highlights: ["Builder-style API; idiomatic Rust; merged to cloud-native storage engine."]
  },
  {
    id: "zephyrcache-4",
    repo: "ryandielhenn/zephyrcache",
    title: "Optimize hash ring rebuild on membership changes",
    prUrl: "https://github.com/ryandielhenn/zephyrcache/pull/4",
    issueUrl: "",
    state: "merged",
    date: "Feb 2026",
    badges: ["Go", "Distributed Cache"],
    summary: "Reduced churn on hash ring rebuild during membership changes for lower tail latency.",
    highlights: ["Cache consistency optimization; distributed systems focus."]
  },
  {
    id: "sisyphusdb-27",
    repo: "awhvish/SisyphusDB",
    title: "Add --log-requests flag for HTTP logging",
    prUrl: "https://github.com/awhvish/SisyphusDB/pull/27",
    issueUrl: "",
    state: "merged",
    date: "Feb 2026",
    badges: ["Go", "LSM-Tree", "Bloom Filters"],
    summary: "Made HTTP request logging configurable via flag instead of always-on, reducing log volume in production.",
    highlights: ["LSM-Tree KV store; opt-in observability."]
  },
  {
    id: "bubbles-922",
    repo: "charmbracelet/bubbles",
    title: "Fix timer: prevent duplicate tickers on Start()",
    prUrl: "https://github.com/charmbracelet/bubbles/pull/922",
    issueUrl: "",
    state: "open",
    date: "Mar 2026",
    badges: ["Go", "TUI", "Bubble Tea"],
    summary: "Prevent Start() spawning multiple tickers causing accelerated countdown — data race fix.",
    highlights: ["Open, under review; concurrency fix."]
  },
  {
    id: "volcano-5050",
    repo: "volcano-sh/volcano",
    title: "Fix queue allocated metric for jobless queues",
    prUrl: "https://github.com/volcano-sh/volcano/pull/5050",
    issueUrl: "",
    state: "open",
    date: "Feb 2026",
    badges: ["Go", "CNCF", "Batch Scheduling"],
    summary: "Correct allocated metric consistency when queues have no jobs (capacity scheduling).",
    highlights: ["Open; CNCF batch system."]
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
  window.OSS_DATA = OSS_DATA;
}
