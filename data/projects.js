// data/projects.js — Open Source contributions only

var PROJECTS_DATA = [];

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
    state: "merged",
    date: "Mar 2026",
    badges: ["Go", "TUI", "Bubble Tea"],
    summary: "Prevent Start() spawning multiple tickers causing accelerated countdown — data race fix.",
    highlights: ["Merged; concurrency fix."]
  },
  {
    id: "volcano-5050",
    repo: "volcano-sh/volcano",
    title: "Fix queue allocated metric for jobless queues",
    prUrl: "https://github.com/volcano-sh/volcano/pull/5050",
    issueUrl: "",
    state: "merged",
    date: "Feb 2026",
    badges: ["Go", "CNCF", "Batch Scheduling"],
    summary: "Correct allocated metric consistency when queues have no jobs (capacity scheduling).",
    highlights: ["Merged; CNCF batch system."]
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
  window.OSS_DATA = OSS_DATA;
}