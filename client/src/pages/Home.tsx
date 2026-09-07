import React from 'react'
import Navbar from '../components/subparts/Navbar'
import Footer from '../components/subparts/Footer'

const Home = () => {
  return (
    <div>
        <>
  <Navbar/>
  <main className="w-full pt-20 bg-surface min-h-screen">
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="w-full bg-[#f3eae0] text-[#0c1c32] px-margin-mobile md:px-margin-desktop py-space-3xl md:py-space-4xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-space-md z-10">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
              <span className="font-label-md text-label-md text-[#475f86] tracking-[0.2em] uppercase font-semibold">
                Engineering Institutional Memory
              </span>
            </div>
            <h1 className="font-display text-display leading-[1.08] text-[#0c1c32] tracking-tight">
              Welcome to our Continuity Solutions!
            </h1>
            <p className="font-body-lead text-body-lead text-[#44474d] max-w-xl pt-space-xs">
              Continuity turns past PRs, Slack threads, and incident postmortems
              into instant, verified answers before knowledge leaves with
              attrition.
            </p>
            <div className="pt-space-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full sm:w-auto">
              <a
                className="inline-flex items-center justify-center gap-2 h-12 px-space-xl bg-[#223148] hover:bg-[#2f486d] text-[#f3eae0] font-label-md text-label-md uppercase tracking-wider transition-all duration-200 group"
                data-path="signup"
                href="#"
              >
                <span>See it in action</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-1.5 h-12 px-space-md font-label-md text-label-md uppercase tracking-wider text-[#223148] hover:text-[#c5a059] transition-colors"
                href="#demo-preview"
              >
                <span>Explore sample query</span>
                <span className="text-sm font-sans">→</span>
              </a>
            </div>
            <div className="pt-space-xs flex items-center gap-2 font-code-md text-code-md text-[#505f78]">
              <span className="material-symbols-outlined text-[16px] text-[#475f86]">
                verified_user
              </span>
              <span>
                Zero disruption to existing workflows · Integrates with GitHub,
                Slack &amp; Jira in minutes
              </span>
            </div>
          </div>
          {/* Right Column: Abstract Technical Visual (Graph Synthesis) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full rounded-2xl bg-[#223148] border border-[#2f486d] shadow-2xl p-6 sm:p-8 overflow-hidden">
              {/* Ambient blueprint grid pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#bad3ff_1px,transparent_1px)] [background-size:16px_16px]" />
              {/* Terminal Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#2f486d]/60 font-code-md text-xs text-[#8a99b5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38475f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38475f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38475f]" />
                  <span className="ml-2 uppercase tracking-widest text-[10px] text-[#bad3ff]">
                    Continuous Vector Ingestion
                  </span>
                </div>
                <span className="text-[#c5a059] tracking-wider text-[11px]">
                  ACTIVE SYNTHESIS
                </span>
              </div>
              {/* Schematic SVG Graph */}
              <div className="relative py-6 min-h-[360px] flex items-center justify-center">
                <svg
                  className="w-full h-80"
                  fill="none"
                  viewBox="0 0 540 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="streamGrad1"
                      x1={120}
                      x2={350}
                      y1={50}
                      y2={160}
                    >
                      <stop offset="0%" stopColor="#475f86" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#c5a059"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="streamGrad2"
                      x1={120}
                      x2={350}
                      y1={120}
                      y2={160}
                    >
                      <stop offset="0%" stopColor="#475f86" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#c5a059"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="streamGrad3"
                      x1={120}
                      x2={350}
                      y1={200}
                      y2={160}
                    >
                      <stop offset="0%" stopColor="#475f86" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#c5a059"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="streamGrad4"
                      x1={120}
                      x2={350}
                      y1={270}
                      y2={160}
                    >
                      <stop offset="0%" stopColor="#475f86" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#c5a059"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <filter
                      height="140%"
                      id="glow"
                      width="140%"
                      x="-20%"
                      y="-20%"
                    >
                      <feGaussianBlur result="blur" stdDeviation={6} />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Convergence Flow Lines with pulse offsets */}
                  <path
                    className="animate-pulse"
                    d="M 130 50 C 230 50, 260 160, 340 160"
                    stroke="url(#streamGrad1)"
                    strokeDasharray="6 4"
                    strokeWidth={2}
                  />
                  <path
                    d="M 130 120 C 210 120, 260 160, 340 160"
                    stroke="url(#streamGrad2)"
                    strokeDasharray="8 3"
                    strokeWidth={2}
                  />
                  <path
                    d="M 130 200 C 210 200, 260 160, 340 160"
                    stroke="url(#streamGrad3)"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                  <path
                    className="animate-pulse"
                    d="M 130 270 C 230 270, 260 160, 340 160"
                    stroke="url(#streamGrad4)"
                    strokeDasharray="7 4"
                    strokeWidth={2}
                  />
                  {/* Micro Node Anchors */}
                  <circle cx={130} cy={50} fill="#bad3ff" r={3} />
                  <circle cx={130} cy={120} fill="#bad3ff" r={3} />
                  <circle cx={130} cy={200} fill="#bad3ff" r={3} />
                  <circle cx={130} cy={270} fill="#bad3ff" r={3} />
                  <circle
                    cx={340}
                    cy={160}
                    fill="#c5a059"
                    filter="url(#glow)"
                    r={4}
                  />
                </svg>
                {/* HTML Overlaid Source Nodes (Left) */}
                <div className="absolute left-2 sm:left-4 top-4 flex flex-col justify-between h-[280px] z-10">
                  <div className="px-2.5 py-1 bg-[#1a2537] border border-[#2f486d] text-[11px] font-code-md text-[#bad3ff] shadow-sm flex items-center gap-1.5 rounded-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                    <span>Slack #eng-incident</span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#1a2537] border border-[#2f486d] text-[11px] font-code-md text-[#bad3ff] shadow-sm flex items-center gap-1.5 rounded-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                    <span>GitHub PR #1048</span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#1a2537] border border-[#2f486d] text-[11px] font-code-md text-[#bad3ff] shadow-sm flex items-center gap-1.5 rounded-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                    <span>Jira INC-419</span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#1a2537] border border-[#2f486d] text-[11px] font-code-md text-[#bad3ff] shadow-sm flex items-center gap-1.5 rounded-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                    <span>Notion RFC-22</span>
                  </div>
                </div>
                {/* HTML Overlaid Resolved Target Node (Right) */}
                <div className="absolute right-0 sm:right-3 max-w-[240px] sm:max-w-[270px] z-10">
                  <div className="bg-[#192435] border border-[#c5a059]/70 p-4 shadow-xl text-left relative">
                    <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[#c5a059] text-[#223148] font-label-sm text-[9px] font-bold uppercase tracking-wider">
                      Verified Knowledge Node
                    </div>
                    <div className="pt-1.5 font-headline-sm text-sm text-[#f3eae0] font-serif leading-snug">
                      Postgres Connection Pool Exhaustion Fix
                    </div>
                    <p className="font-body-sm text-[11px] text-[#8a99b5] pt-1 leading-relaxed">
                      Direct port bypass on primary cluster applied 2024-03-14
                      during checkout saturation.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-[#2f486d] flex items-center justify-between text-[10px] font-code-md text-[#bad3ff]">
                      <span className="flex items-center gap-1 text-[#e9c176]">
                        <span className="material-symbols-outlined text-[12px]">
                          check_circle
                        </span>{" "}
                        4 vectors unified
                      </span>
                      <span className="text-[#8a99b5]">0.04s latency</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom Telemetry Metric */}
              <div className="pt-3 border-t border-[#2f486d]/50 flex items-center justify-between font-code-md text-[11px] text-[#8a99b5]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff] animate-ping" />
                  Ingestion state: Synchronized
                </span>
                <span>Entropy Index: 0.002 (Nominal)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2: INTRO PANEL / ABOUT THE PROBLEM */}
      <section
        className="w-full bg-[#f3eae0] text-[#0c1c32] px-margin-mobile md:px-margin-desktop py-space-3xl border-t border-[#d2c7b8]"
        id="demo-preview"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Left Column: The Attrition Gap */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-space-md pr-0 lg:pr-6">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-[#475f86] uppercase tracking-[0.2em] font-semibold">
                The Attrition Gap
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-[#0c1c32] tracking-tight">
              Engineers move on. Their architectural reasoning shouldn’t.
            </h2>
            <div className="space-y-space-sm text-[#44474d] font-body-md text-body-md leading-relaxed">
              <p>
                Every senior engineer holds months of unwritten context in their
                head—why connection pools were bypassed at 3 AM, how edge-case
                migrations were solved, and what failed before it worked.
              </p>
              <p>
                When they leave, teams spend hundreds of hours rediscovering the
                same wheel, retracing deleted branch histories, and
                reconstructing forgotten rationale.
              </p>
            </div>
            {/* Metric Callouts */}
            <div className="space-y-space-sm pt-space-xs">
              <div className="flex items-start gap-3 p-3.5 bg-[#e8dfd3] border-l-2 border-[#223148]">
                <span className="material-symbols-outlined text-[#223148] text-[20px] mt-0.5">
                  schedule
                </span>
                <div>
                  <span className="font-bold text-[#0c1c32] text-sm block">
                    Average 4.2 weeks lost per new hire onboarding
                  </span>
                  <span className="font-body-sm text-xs text-[#505f78]">
                    Reconstructing historical context for legacy infrastructure.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-[#e8dfd3] border-l-2 border-[#c5a059]">
                <span className="material-symbols-outlined text-[#c5a059] text-[20px] mt-0.5">
                  history_edu
                </span>
                <div>
                  <span className="font-bold text-[#0c1c32] text-sm block">
                    83% of repeat outages have resolved precedent
                  </span>
                  <span className="font-body-sm text-xs text-[#505f78]">
                    Buried in closed PR comments and unindexed incident
                    channels.
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Browser Frame UI Preview */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-[#ffffff] rounded-none border border-[#d2c7b8] shadow-xl overflow-hidden">
              {/* Mac OS Style Chrome Minimal Bar */}
              <div className="bg-[#f0e7dd] px-4 py-2.5 border-b border-[#d2c7b8] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d2c7b8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d2c7b8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d2c7b8]" />
                </div>
                <div className="px-4 py-1 bg-[#ffffff] border border-[#d2c7b8] text-[11px] font-code-md text-[#505f78] rounded-none flex items-center gap-2 max-w-sm w-full mx-4 justify-center">
                  <span className="material-symbols-outlined text-[13px] text-[#8a99b5]">
                    lock
                  </span>
                  <span className="truncate">
                    app.knowledgecontinuity.com/query?id=cx-8491
                  </span>
                </div>
                <span className="font-code-md text-[10px] text-[#75777e] uppercase">
                  RECORD #8491
                </span>
              </div>
              {/* Inside Interactive Dossier Workspace */}
              <div className="p-5 sm:p-7 space-y-5 bg-[#fff8f3]">
                {/* Query Search Pill */}
                <div className="flex items-center gap-3 p-3 bg-[#ffffff] border border-[#223148] shadow-sm">
                  <span className="material-symbols-outlined text-[#223148] text-[20px]">
                    search
                  </span>
                  <span className="font-body-md text-sm text-[#0c1c32] font-medium tracking-tight">
                    “Why did we disable connection pooling on checkout in
                    March?”
                  </span>
                  <span className="ml-auto font-code-md text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#bad3ff] text-[#001b3b]">
                    Instant Query
                  </span>
                </div>
                {/* Card 1: Verified Root Cause */}
                <div className="p-4 bg-[#ffffff] border border-[#d2c7b8] space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#475f86] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#c5a059]" />{" "}
                      Verified Root Cause
                    </span>
                    <span className="font-code-md text-[11px] text-[#75777e]">
                      Incident #419 · March 14, 2024
                    </span>
                  </div>
                  <p className="font-headline-sm text-base text-[#0c1c32] font-serif">
                    Checkout DB Socket Exhaustion &amp; PgBouncer Thread Locking
                  </p>
                  <p className="font-body-sm text-xs text-[#44474d] leading-relaxed">
                    High concurrency checkout spikes caused PgBouncer
                    transaction pooling to queue stale file handles. Direct
                    connection routing bypassed the pooling daemon temporarily
                    to recover throughput. Attributed to{" "}
                    <strong className="text-[#0c1c32]">@sarah-chen</strong>{" "}
                    (Principal DBRE).
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs">
                    <a
                      className="text-[#223148] font-semibold underline underline-offset-4 decoration-[#c5a059] hover:text-[#c5a059]"
                      href="#"
                    >
                      Read verified postmortem →
                    </a>
                    <span className="text-[#d2c7b8]">|</span>
                    <span className="text-[#75777e] font-code-md text-[11px]">
                      Approval ID: #AUTH-9921
                    </span>
                  </div>
                </div>
                {/* Card 2: Code Diff Excerpt */}
                <div className="p-3.5 bg-[#0c1c32] text-[#f3eae0] font-code-md text-xs space-y-1.5 overflow-x-auto">
                  <div className="flex items-center justify-between pb-1 text-[#8a99b5] text-[10px] border-b border-[#223148]">
                    <span>
                      deploy/helm/services/checkout-worker.yaml (commit eb419f0)
                    </span>
                    <span>PATCH REVISION</span>
                  </div>
                  <div className="text-[#ffdad6] bg-[#93000a]/20 px-2 py-0.5 -mx-1">
                    -
                    DATABASE_URL=postgres://app:sec@pooler.internal:6432/checkout?pool_mode=transaction
                  </div>
                  <div className="text-[#bad3ff] bg-[#bad3ff]/10 px-2 py-0.5 -mx-1">
                    +
                    DATABASE_URL=postgres://app:sec@primary.internal:5432/checkout?sslmode=verify-full
                  </div>
                </div>
                {/* Source Citations Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="inline-flex items-center gap-2 text-xs font-code-md text-[#44474d]">
                    <span className="material-symbols-outlined text-[16px] text-[#223148]">
                      verified
                    </span>
                    <span>3 sources verified:</span>
                    <span className="text-[#223148] font-medium underline">
                      Slack #infra-alerts
                    </span>
                    ,
                    <span className="text-[#223148] font-medium underline">
                      GitHub PR #1048
                    </span>
                    ,
                    <span className="text-[#223148] font-medium underline">
                      Datadog INC-419
                    </span>
                  </div>
                  <span className="font-code-md text-[10px] text-[#75777e]">
                    Synthesis time: 0.12s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 3: SERVICES / FEATURES GRID */}
      <section className="w-full bg-[#223148] text-[#f3eae0] px-margin-mobile md:px-margin-desktop py-space-3xl md:py-space-4xl">
        <div className="max-w-7xl mx-auto space-y-space-2xl">
          {/* Section Header */}
          <div className="max-w-3xl space-y-space-xs">
            <div className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-[0.2em] text-[#bad3ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              Capabilities &amp; Systems
            </div>
            <h2 className="font-display text-headline-lg md:text-display text-[#f3eae0] tracking-tight">
              Built for institutional permanence.
            </h2>
            <p className="font-body-lead text-body-lead text-[#8a99b5]">
              A persistent institutional substrate that converts ephemeral
              engineering communication into durable, verifiable organizational
              assets.
            </p>
          </div>
          {/* 2x3 Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    bolt
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  01 / Telemetry
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Instant answers
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  Natural language queries return the exact decision rationale
                  and implementation history in seconds, bypassing stale
                  readmes.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
            {/* Card 2 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    link
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  02 / Provenance
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Source-linked knowledge
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  Every answer links back directly to the immutable PR diff,
                  Slack author quote, or Jira resolution for zero-hallucination
                  trust.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
            {/* Card 3 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    sync
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  03 / Automation
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Auto-capture from Slack &amp; Jira
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  Passive ingestion of resolved incident channels and merged
                  engineering pull requests without demanding manual wiki
                  upkeep.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
            {/* Card 4 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    menu_book
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  04 / Acceleration
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Onboarding playbooks
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  Contextual reading lists and historical deep-dives tailored
                  dynamically to your repository layout and domain architecture.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
            {/* Card 5 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    troubleshoot
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  05 / Diagnostics
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Search by symptom
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  Query directly by error stack trace, socket timeout signature,
                  or memory leak pattern rather than brittle keywords.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
            {/* Card 6 */}
            <div className="p-7 bg-[#1c293d] border border-[#2f486d] hover:border-[#c5a059] transition-colors duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-[#2f486d] bg-[#223148] flex items-center justify-center text-[#c5a059]">
                  <span className="material-symbols-outlined text-[20px]">
                    hub
                  </span>
                </div>
                <div className="font-code-md text-xs text-[#8a99b5] uppercase tracking-widest">
                  06 / Architecture
                </div>
                <h3 className="font-headline-sm text-xl text-[#f3eae0] font-serif">
                  Team knowledge graph
                </h3>
                <p className="font-body-sm text-body-sm text-[#8a99b5] leading-relaxed">
                  A living topological map of subsystem component ownership,
                  historical code authors, and cross-team dependencies.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#2f486d]/50">
                <a
                  className="font-label-md text-xs uppercase tracking-wider text-[#bad3ff] group-hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                  href="#"
                >
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 4: STATS BAND */}
      <section className="w-full bg-[#d2c7b8] text-[#0c1c32] px-margin-mobile md:px-margin-desktop py-space-3xl border-y border-[#c5c6cd]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-2xl text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#c5c6cd]">
            {/* Stat 1 */}
            <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pr-8">
              <div className="font-display text-5xl md:text-6xl font-serif text-[#0c1c32] tracking-tight font-medium">
                70%
              </div>
              <p className="font-body-md text-base text-[#343029] font-medium leading-snug">
                Faster onboarding time to first production PR for incoming
                senior engineers.
              </p>
              <span className="font-code-md text-[11px] text-[#505f78] uppercase tracking-widest pt-1">
                Benchmark telemetry v4
              </span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-8">
              <div className="font-display text-5xl md:text-6xl font-serif text-[#0c1c32] tracking-tight font-medium">
                5,000+
              </div>
              <p className="font-body-md text-base text-[#343029] font-medium leading-snug">
                Engineering decisions, trade-offs &amp; postmortems
                automatically indexed.
              </p>
              <span className="font-code-md text-[11px] text-[#505f78] uppercase tracking-widest pt-1">
                Across 140+ enterprise repos
              </span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-8">
              <div className="font-display text-5xl md:text-6xl font-serif text-[#0c1c32] tracking-tight font-medium">
                40%
              </div>
              <p className="font-body-md text-base text-[#343029] font-medium leading-snug">
                Fewer repetitive questions asked across core engineering &amp;
                incident Slack channels.
              </p>
              <span className="font-code-md text-[11px] text-[#505f78] uppercase tracking-widest pt-1">
                Interruption reduction metric
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 5: CLIENT / TEAM SUCCESS QUOTES */}
      <section className="w-full bg-[#d2c7b8] text-[#0c1c32] px-margin-mobile md:px-margin-desktop py-space-3xl md:py-space-4xl">
        <div className="max-w-7xl mx-auto space-y-space-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-space-xs">
            <span className="font-label-sm text-label-sm text-[#475f86] uppercase tracking-[0.2em] font-semibold">
              Institutional Validation
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#0c1c32] tracking-tight">
              Proven across high-velocity engineering organizations.
            </h2>
          </div>
          {/* Testimonial Cards Mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 bg-[#fbf7f2] border border-[#c8bdae] shadow-sm flex flex-col justify-between relative">
              <div className="space-y-4">
                <span className="font-display text-5xl text-[#c5a059] block leading-none select-none font-serif">
                  “
                </span>
                <p className="font-body-md text-body-md text-[#1f1b15] leading-relaxed -mt-4">
                  When our principal infrastructure architect left, we
                  anticipated months of friction. KnowledgeContinuity gave our
                  new tech leads immediate answers to why our caching tier was
                  built the way it was.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#eae1d7]">
                <div className="font-headline-sm text-base text-[#0c1c32] font-serif font-bold">
                  Alex Rivera
                </div>
                <div className="font-body-sm text-xs text-[#505f78]">
                  VP of Engineering at LayerMetric
                </div>
                <div className="font-code-md text-[10px] text-[#75777e] mt-1 tracking-wider uppercase">
                  Infrastructure scale: 420+ services
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="p-8 bg-[#fbf7f2] border border-[#c8bdae] shadow-sm flex flex-col justify-between relative">
              <div className="space-y-4">
                <span className="font-display text-5xl text-[#c5a059] block leading-none select-none font-serif">
                  “
                </span>
                <p className="font-body-md text-body-md text-[#1f1b15] leading-relaxed -mt-4">
                  New engineers ship to production on week two instead of month
                  two. They don’t have to wait for someone in another timezone
                  to wake up to explain an obscure database migration.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#eae1d7]">
                <div className="font-headline-sm text-base text-[#0c1c32] font-serif font-bold">
                  Priya Desai
                </div>
                <div className="font-body-sm text-xs text-[#505f78]">
                  Staff Engineer at CloudScale
                </div>
                <div className="font-code-md text-[10px] text-[#75777e] mt-1 tracking-wider uppercase">
                  Distributed Systems Unit
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="p-8 bg-[#fbf7f2] border border-[#c8bdae] shadow-sm flex flex-col justify-between relative">
              <div className="space-y-4">
                <span className="font-display text-5xl text-[#c5a059] block leading-none select-none font-serif">
                  “
                </span>
                <p className="font-body-md text-body-md text-[#1f1b15] leading-relaxed -mt-4">
                  It’s like having every senior engineer who ever worked on the
                  codebase sitting right next to you during an active incident.
                  The context recall is uncanny and precise.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#eae1d7]">
                <div className="font-headline-sm text-base text-[#0c1c32] font-serif font-bold">
                  Marcus Vance
                </div>
                <div className="font-body-sm text-xs text-[#505f78]">
                  Head of Platform at FinCore
                </div>
                <div className="font-code-md text-[10px] text-[#75777e] mt-1 tracking-wider uppercase">
                  High-Frequency Core Ops
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 6: CTA FOOTER SECTION */}
      <section className="w-full bg-[#223148] text-[#f3eae0] px-margin-mobile md:px-margin-desktop py-space-3xl md:py-space-4xl border-t border-[#2f486d]">
        <div className="max-w-4xl mx-auto text-center space-y-space-md">
          <div className="inline-flex items-center gap-2 font-code-md text-xs text-[#bad3ff] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#bad3ff]" />
            <span>Deployment Ready Protocol</span>
          </div>
          <h2 className="font-display text-headline-lg md:text-display text-[#f3eae0] tracking-tight">
            Start preserving your team’s knowledge.
          </h2>
          <p className="font-body-lead text-body-lead text-[#8a99b5] max-w-2xl mx-auto">
            Connect your GitHub, Slack, and Jira in under 10 minutes. Zero
            manual documentation required. Continuous ingestion begins
            immediately.
          </p>
          <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="inline-flex items-center justify-center h-12 px-space-2xl bg-[#f3eae0] hover:bg-[#ffffff] text-[#223148] font-label-md text-label-md uppercase tracking-wider transition-all duration-150 font-bold"
              data-path="signup"
              href="#"
            >
              Request early access
            </a>
            <a
              className="inline-flex items-center justify-center h-12 px-space-xl border border-[#2f486d] text-[#f3eae0] hover:bg-[#2f486d]/40 font-label-md text-label-md uppercase tracking-wider transition-all duration-150"
              data-path="product"
              href="#"
            >
              Schedule engineering demo
            </a>
          </div>
          <div className="pt-space-md flex flex-wrap items-center justify-center gap-y-2 gap-x-6 font-code-md text-xs text-[#8a99b5]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#c5a059]">
                verified
              </span>
              SOC 2 Type II compliant
            </span>
            <span className="text-[#2f486d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#c5a059]">
                dns
              </span>
              On-prem &amp; VPC deployment available
            </span>
            <span className="text-[#2f486d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#c5a059]">
                lock
              </span>
              Enterprise AES-256 encryption
            </span>
          </div>
        </div>
      </section>
    </div>
  </main>
  <Footer />
</>

    </div>
  )
}

export default Home