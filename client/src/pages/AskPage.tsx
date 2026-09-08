import Footer from '@/components/subparts/Footer'
import Navbar from '@/components/subparts/Navbar'
import React from 'react'

const AskPage = () => {
  return (
    <div>
      <Navbar/>
      <main className="w-full pt-20 pb-16 mx-auto px-5 lg:px-8 flex-1">
  <div className="max-w-6xl mx-auto flex flex-col gap-8">
    <section className="flex flex-col gap-2 pt-2 border-b border-[#D4CFC0] pb-6">
      <div className="flex items-center gap-2 text-[#2D5A3D] font-code-md text-[11px] tracking-widest uppercase font-semibold">
        <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A3D]" />
        <span>Archival Dossier // Query Response</span>
      </div>
      <h1 className="font-display text-[36px] md:text-[42px] leading-[1.15] font-semibold text-[#223148] tracking-tight">
        Ask the Knowledge Base
      </h1>
      <p className="font-body-md text-[16px] text-[#44474d] leading-relaxed">
        Search what your team already knows.
      </p>
    </section>
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-body-sm text-[#75777e] font-code-md text-[11px] px-1">
        <span>SUBMITTED INQUIRY</span>
        <span>SESSION #4092 · 14:32 UTC</span>
      </div>
      <div className="bg-[#f0e7dd]/60 border border-[#D4CFC0] rounded-lg p-4 md:p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-[#2D5A3D] font-serif text-2xl leading-none mt-0.5 select-none font-bold">
            “
          </span>
          <p
            className="font-serif text-[18px] md:text-[20px] text-[#0c1c32] font-medium leading-snug tracking-tight"
            id="displayed-query"
          >
            Why did we disable connection pooling on checkout in March?
          </p>
        </div>
        <span className="font-code-md text-[10px] uppercase font-semibold text-[#2D5A3D] bg-[#2D5A3D]/10 px-2 py-0.5 rounded border border-[#2D5A3D]/20 shrink-0">
          MATCH 98.4%
        </span>
      </div>
    </section>
    <article className="bg-white rounded-lg border border-[#D4CFC0] p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[#D4CFC0] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2D5A3D]" />
          <span className="font-code-md text-[11px] font-bold uppercase tracking-widest text-[#2D5A3D]">
            SYNTHESIZED ANSWER
          </span>
        </div>
        <span className="font-code-md text-[10px] font-semibold uppercase tracking-wider text-[#223148] bg-[#f0e7dd] border border-[#D2C7B8] px-2 py-0.5 rounded">
          POST-INCIDENT ANALYSIS
        </span>
      </div>
      <div className="space-y-4 font-body-md text-[15px] leading-[26px] text-[#1f1b15]">
        <p>
          Connection pooling was bypassed in{" "}
          <code className="font-code-md text-[12px] bg-[#f0e7dd] text-[#0c1c32] px-1.5 py-0.5 rounded font-semibold">
            checkout-worker
          </code>{" "}
          during{" "}
          <strong className="font-bold text-[#0c1c32] bg-[#f0e7dd]/70 px-1 py-0.5 rounded">
            INC-419
          </strong>{" "}
          because the pooling daemon daemonized socket threads during burst
          concurrency surges, prematurely saturating{" "}
          <code className="font-code-md text-[12px] bg-[#f0e7dd] text-[#0c1c32] px-1.5 py-0.5 rounded font-semibold">
            max_client_conn
          </code>{" "}
          limits across regional pods.
        </p>
        <p className="text-[#44474d]">
          Under sudden load spikes (&gt;45k checkout req/sec), thread allocation
          stalled prior to health-probe pings, resulting in cascading worker
          timeouts. The remediation team bypassed persistent multiplexing,
          switched{" "}
          <code className="font-code-md text-[12px] bg-[#f0e7dd] text-[#0c1c32] px-1.5 py-0.5 rounded font-semibold">
            pool_mode
          </code>{" "}
          to direct transaction leases, and capped client threads at 1,200 with
          aggressive client idle reclaims.
        </p>
      </div>
      <div className="rounded-md bg-[#223148] border border-[#2f486d] overflow-hidden text-white">
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#162338] border-b border-[#2f486d] text-[#bad3ff] font-code-md text-[11px] tracking-wider uppercase">
          <span>Production Remediation Patch · INC-419 · ENV/PROD</span>
          <button
            className="hover:text-white flex items-center gap-1 transition-colors text-[11px] text-[#b8c7e4]"
            onclick="navigator.clipboard.writeText('DATABASE_URL=postgres://app:sec@pooler.internal:6432/checkout?pool_mode=transaction&idle_timeout=2500ms')"
          >
            <span className="material-symbols-outlined text-[13px]">
              content_copy
            </span>
            <span>Copy</span>
          </button>
        </div>
        <div className="p-3.5 font-code-md text-[12px] leading-relaxed text-[#bad3ff] overflow-x-auto select-all">
          <code>
            DATABASE_URL=postgres://app:sec@pooler.internal:6432/checkout?pool_mode=transaction&amp;idle_timeout=2500ms
          </code>
        </div>
      </div>
      <div className="pt-4 border-t border-[#D4CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#223148] text-[#fdfaf7] font-code-md text-[12px] font-bold flex items-center justify-center shrink-0">
            SC
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body-md text-[13px] font-bold text-[#0c1c32]">
                Sarah Chen
              </span>
              <span className="text-[#D4CFC0]">•</span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#505f78] font-semibold">
                Former Principal DBRE
              </span>
            </div>
            <span className="font-code-md text-[11px] text-[#75777e]">
              Resolved in INC-419 · March 14, 2024
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            className="w-8 h-8 rounded-md flex items-center justify-center border border-[#D2C7B8] bg-[#f0e7dd]/40 text-[#44474d] hover:text-[#0c1c32] hover:border-[#223148] transition-colors"
            title="Helpful"
          >
            <span className="material-symbols-outlined text-[16px]">
              thumb_up
            </span>
          </button>
          <button
            className="w-8 h-8 rounded-md flex items-center justify-center border border-[#D2C7B8] bg-[#f0e7dd]/40 text-[#44474d] hover:text-[#0c1c32] hover:border-[#223148] transition-colors"
            title="Not helpful"
          >
            <span className="material-symbols-outlined text-[16px]">
              thumb_down
            </span>
          </button>
          <button
            className="w-8 h-8 rounded-md flex items-center justify-center border border-[#D2C7B8] bg-[#f0e7dd]/40 text-[#44474d] hover:text-[#0c1c32] hover:border-[#223148] transition-colors"
            onclick="navigator.clipboard.writeText(window.location.href)"
            title="Copy citation"
          >
            <span className="material-symbols-outlined text-[16px]">
              content_copy
            </span>
          </button>
          <button
            className="w-8 h-8 rounded-md flex items-center justify-center border border-[#D2C7B8] bg-[#f0e7dd]/40 text-[#44474d] hover:text-[#0c1c32] hover:border-[#223148] transition-colors"
            title="Share or Export"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
          </button>
        </div>
      </div>
    </article>
    <section className="bg-[#f0e7dd]/40 rounded-lg border border-[#D4CFC0] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#D4CFC0] pb-2.5">
        <span className="font-code-md text-[11px] uppercase tracking-widest text-[#223148] font-bold">
          Source Citations &amp; Evidence (3)
        </span>
        <span className="font-code-md text-[10px] text-[#505f78]">
          VERIFIED CITATIONS
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 bg-white rounded border border-[#D4CFC0]">
          <span className="font-code-md text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#223148] text-[#fdfaf7] shrink-0">
            INCIDENT
          </span>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-code-md text-[12px] font-semibold text-[#0c1c32]">
                INC-419 Postmortem
              </span>
              <span className="font-code-md text-[10px] font-bold text-[#2D5A3D]">
                0.96 MATCH
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-[#44474d] mt-0.5">
              Root cause analysis: socket descriptor exhaustion during burst
              flash checkout spikes.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-white rounded border border-[#D4CFC0]">
          <span className="font-code-md text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#223148] text-[#fdfaf7] shrink-0">
            PULL REQUEST
          </span>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-code-md text-[12px] font-semibold text-[#0c1c32]">
                PR #1048 (checkout-pooler)
              </span>
              <span className="font-code-md text-[10px] font-bold text-[#2D5A3D]">
                0.91 MATCH
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-[#44474d] mt-0.5">
              checkout-pooler config bypass for pgbouncer direct transaction
              lease mode.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-white rounded border border-[#D4CFC0]">
          <span className="font-code-md text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D2C7B8] text-[#223148] shrink-0">
            SLACK CONV
          </span>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-code-md text-[12px] font-semibold text-[#0c1c32]">
                Slack #war-room-checkout
              </span>
              <span className="font-code-md text-[10px] font-bold text-[#2D5A3D]">
                0.84 MATCH
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-[#44474d] mt-0.5">
              Workaround for Envoy ingress keepalive TCP resets and timeout
              mitigations.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white rounded-lg border border-[#D4CFC0] p-6 flex flex-col gap-4">
      <div className="border-b border-[#D4CFC0] pb-2.5">
        <h2 className="font-display font-semibold text-[18px] text-[#223148]">
          Related Experts
        </h2>
        <p className="font-body-sm text-[12px] text-[#505f78]">
          Engineers with direct operational history on this service
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded border border-[#D4CFC0] bg-[#f0e7dd]/40 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#223148] text-[#fdfaf7] font-code-md text-[11px] font-bold flex items-center justify-center shrink-0">
              SC
            </div>
            <div>
              <span className="font-body-md text-[12px] font-bold text-[#0c1c32] block">
                Sarah Chen
              </span>
              <span className="font-code-md text-[10px] text-[#505f78] block">
                Principal DBRE
              </span>
            </div>
          </div>
          <p className="font-body-sm text-[11px] text-[#44474d] leading-snug">
            Author of INC-419 remediation &amp; connection pools
          </p>
        </div>
        <div className="p-3 rounded border border-[#D4CFC0] bg-[#f0e7dd]/40 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#223148] text-[#fdfaf7] font-code-md text-[11px] font-bold flex items-center justify-center shrink-0">
              MV
            </div>
            <div>
              <span className="font-body-md text-[12px] font-bold text-[#0c1c32] block">
                Marcus Vance
              </span>
              <span className="font-code-md text-[10px] text-[#505f78] block">
                Staff SRE
              </span>
            </div>
          </div>
          <p className="font-body-sm text-[11px] text-[#44474d] leading-snug">
            Maintained Envoy ingress proxy config &amp; keepalive
          </p>
        </div>
        <div className="p-3 rounded border border-[#D4CFC0] bg-[#f0e7dd]/40 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#223148] text-[#fdfaf7] font-code-md text-[11px] font-bold flex items-center justify-center shrink-0">
              ER
            </div>
            <div>
              <span className="font-body-md text-[12px] font-bold text-[#0c1c32] block">
                Elena Rostova
              </span>
              <span className="font-code-md text-[10px] text-[#505f78] block">
                Staff Infra Engineer
              </span>
            </div>
          </div>
          <p className="font-body-sm text-[11px] text-[#44474d] leading-snug">
            Author of Aurora connection failover runbook
          </p>
        </div>
      </div>
    </section>
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-[#505f78] font-code-md text-[11px] px-1">
        <span className="uppercase tracking-wider font-semibold text-[#0c1c32]">
          Example Inquiry Presets
        </span>
        <span>CLICK TO LOAD</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="text-left px-3 py-1.5 rounded-full bg-white hover:bg-[#f0e7dd]/60 border border-[#D4CFC0] text-body-sm text-[12px] text-[#1f1b15] hover:text-[#0c1c32] transition-colors"
          onclick="setQueryPrompt('How was the Redis memory leak mitigated during the v2.4 rollout?')"
        >
          "How was the Redis memory leak mitigated during the v2.4 rollout?"
        </button>
        <button
          className="text-left px-3 py-1.5 rounded-full bg-white hover:bg-[#f0e7dd]/60 border border-[#D4CFC0] text-body-sm text-[12px] text-[#1f1b15] hover:text-[#0c1c32] transition-colors"
          onclick="setQueryPrompt('What was the workaround for Envoy TCP keepalive timeouts?')"
        >
          "What was the workaround for Envoy TCP keepalive timeouts?"
        </button>
        <button
          className="text-left px-3 py-1.5 rounded-full bg-white hover:bg-[#f0e7dd]/60 border border-[#D4CFC0] text-body-sm text-[12px] text-[#1f1b15] hover:text-[#0c1c32] transition-colors"
          onclick="setQueryPrompt('Who owns the fallback manual DNS failover switch if primary Aurora cluster locks up?')"
        >
          "Who owns the fallback manual DNS failover switch if primary Aurora
          cluster locks up?"
        </button>
      </div>
    </section>
    <section className="flex flex-col gap-2 pb-8">
      <form
        className="relative w-full"
        id="ask-search-form"
        onsubmit="event.preventDefault(); handleUserQuery();"
      >
        <div className="relative flex items-center bg-white rounded-xl border border-[#D4CFC0] shadow-xs focus-within:border-[#2D5A3D] focus-within:ring-2 focus-within:ring-[#2D5A3D]/20 transition-all">
          <div className="pl-4 text-[#505f78] flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">
              manage_search
            </span>
          </div>
          <input
            autoComplete="off"
            className="w-full py-3.5 pl-3 pr-14 bg-transparent font-body-md text-[14px] text-[#0c1c32] placeholder:text-[#8a99b5] focus:outline-none"
            id="user-query-input"
            placeholder="Ask a follow-up or search past postmortems, PRs, and Slack discussions..."
            type="text"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#2D5A3D] hover:bg-[#234730] text-white rounded-lg flex items-center justify-center transition-all shadow-xs"
            title="Execute Query (⌘ + Enter)"
            type="submit"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between text-[#505f78] font-code-md text-[11px] px-1">
        <span>
          Targeting:{" "}
          <strong className="text-[#0c1c32] font-semibold">
            Production Archive + Engineering Transcripts
          </strong>
        </span>
        <span className="hidden sm:inline text-[#75777e]">
          Press ⌘ + Enter to execute
        </span>
      </div>
    </section>
  </div>
</main>

<Footer/>
    </div>
  )
}

export default AskPage