// data/projects.js — Open Source contributions only
// Flagship projects section removed per request.

var PROJECTS_DATA = [];

var OSS_DATA = [
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