import { FormEvent, useEffect, useState } from "react";
import Footer from "@/components/subparts/Footer";
import Navbar from "@/components/subparts/Navbar";
import axios from "axios";
import SourceDataPanel from "@/components/capture/SourceDataPanel";

type AddedKnowledgeEntry = {
  title: string;
  note: string;
  source: string;
};

const CapturePage = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteSource, setNoteSource] = useState("Direct note");
  const [addedEntry, setAddedEntry] = useState<AddedKnowledgeEntry | null>(
    null,
  );
  const [noteError, setNoteError] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  // client/src/pages/CapturePage.jsx (relevant slice)
  const [sourceItems, setSourceItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSourceItems = async () => {
      try {
        const response = await axios.get("/capture/daily-batch/source");
        setSourceItems(
          Array.isArray(response.data?.items) ? response.data.items : [],
        );
      } catch {
        setSourceItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSourceItems();
  }, []);

  // ...

  const handleAddNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!noteTitle.trim() || !noteBody.trim()) {
      setNoteError("Add a title and note before creating the entry.");
      return;
    }

    const entry = {
      title: noteTitle.trim(),
      note: noteBody.trim(),
      source: noteSource,
    };

    setAddedEntry(entry);
    setNoteTitle("");
    setNoteBody("");
    setNoteError("");
    setIsEditingNote(false);
  };

  const handleEditNote = () => {
    if (!addedEntry) return;

    setNoteTitle(addedEntry.title);
    setNoteBody(addedEntry.note);
    setNoteSource(addedEntry.source);
    setIsEditingNote(true);
    setNoteError("");
  };

  const handleDeleteNote = () => {
    setAddedEntry(null);
    setNoteTitle("");
    setNoteBody("");
    setNoteError("");
    setIsEditingNote(false);
  };

  return (
    <div>
      <SourceDataPanel items={sourceItems} loading={loading} />
      <>
        {/* SOPHISTICATED EDITORIAL HEADER */}
        <Navbar />
        {/* MAIN VIEW CONTAINER */}
        <main className="w-full pt-20 pb-16 mx-auto px-5 lg:px-8 flex-1">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {/* 1. PAGE HERO / EDITORIAL TITLE */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-b border-[#223148]/15 pb-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2 text-[#505f78] font-code-md text-[11px] tracking-wider uppercase">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A3D]" />
                  <span className="font-semibold text-[#0c1c32]">
                    Archival Session #4092
                  </span>
                  <span className="text-[#c5c6cd]">·</span>
                  <span>Departing Staff Infrastructure Engineer</span>
                  <span className="text-[#c5c6cd]">·</span>
                  <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded text-[10px] font-bold">
                    Last day April 18
                  </span>
                </div>
                <h1 className="font-display text-[36px] md:text-[42px] leading-[1.12] font-semibold text-[#0c1c32] tracking-tight">
                  Knowledge Handoff — Elena Rostova
                </h1>
                <p className="font-body-lead text-[16px] leading-relaxed text-[#44474d] max-w-xl">
                  Capturing what you know before you go. Continuity synthesizes
                  unwritten context, closed PRs, and war-room resolutions into
                  durable institutional memory.
                </p>
                <div className="flex items-center gap-2 font-code-md text-[11px] text-[#505f78] pt-1">
                  <span className="material-symbols-outlined text-[15px] text-[#2D5A3D]">
                    verified_user
                  </span>
                  <span>
                    Zero disruption to offboarding workflow · Auto-vectorized in
                    minutes
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 w-full">
                <div className="relative w-full rounded-xl bg-[#223148] border border-[#2f486d] shadow-xl p-4 overflow-hidden text-[#bad3ff]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2f486d]/60 font-code-md text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#38475f]" />
                      <span className="w-2 h-2 rounded-full bg-[#38475f]" />
                      <span className="w-2 h-2 rounded-full bg-[#38475f]" />
                      <span className="ml-1 uppercase tracking-widest text-[#bad3ff]">
                        Continuous Ingestion
                      </span>
                    </div>
                    <span className="text-[#e9c176] tracking-wider font-semibold text-[10px]">
                      ACTIVE SYNTHESIS
                    </span>
                  </div>
                  <div className="py-3 space-y-2 font-code-md text-[11px]">
                    <div className="flex items-center justify-between bg-[#1a2537] border border-[#2f486d] px-2.5 py-1 text-[10px]">
                      <span className="flex items-center gap-1.5 text-[#fbf2e8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                        Slack #infra-war-room
                      </span>
                      <span className="text-[#8a99b5]">38 msgs</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#1a2537] border border-[#2f486d] px-2.5 py-1 text-[10px]">
                      <span className="flex items-center gap-1.5 text-[#fbf2e8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                        Jira INC-419
                      </span>
                      <span className="text-[#8a99b5]">Post-Mortem</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#1a2537] border border-[#2f486d] px-2.5 py-1 text-[10px]">
                      <span className="flex items-center gap-1.5 text-[#fbf2e8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bad3ff]" />
                        GitHub PR #881
                      </span>
                      <span className="text-[#8a99b5]">db-core-config</span>
                    </div>
                  </div>
                  <div className="pt-2.5 border-t border-[#2f486d]/50 flex items-center justify-between font-code-md text-[10px] text-[#8a99b5]">
                    <span className="flex items-center gap-1 text-[#e9c176]">
                      <span className="material-symbols-outlined text-[12px]">
                        check_circle
                      </span>{" "}
                      4 vectors unified
                    </span>
                    <span>Latency: 0.04s</span>
                  </div>
                </div>
              </div>
            </header>
            {/* 2. SECTION 1: SOURCE DATA PANEL */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-[21px] font-semibold text-[#0c1c32]">
                    Source Data
                  </h2>
                  <span className="bg-[#223148] text-white px-2.5 py-0.5 rounded-full font-code-md text-[10px] uppercase tracking-wider font-semibold">
                    Raw Work History
                  </span>
                </div>
                <span className="font-code-md text-[11px] text-[#505f78]">
                  3 verified repository sources linked
                </span>
              </div>
              <p className="font-body-sm text-[13px] text-[#505f78] leading-relaxed -mt-1">
                Unstructured artifacts automatically retrieved from Jira, GitHub
                PRs, incident war rooms, and Slack discussions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Source 1: Incident Postmortem */}
                <div className="bg-white rounded-lg p-4 border border-[#223148]/10 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#223148] text-white px-2 py-0.5 rounded font-code-md text-[10px] font-bold tracking-tight">
                        INC-419 · Post-Mortem
                      </span>
                      <span className="font-code-md text-[10px] text-[#505f78]">
                        Mar 14, 2024
                      </span>
                    </div>
                    <h3 className="font-display text-[15px] font-semibold text-[#0c1c32] leading-snug">
                      PgBouncer pool exhaustion during burst concurrency surges
                    </h3>
                    <p className="font-body-sm text-[12px] text-[#44474d] leading-relaxed">
                      Bypassed pooling daemon on checkout-worker pods after 45k
                      req/sec spikes saturated socket threads.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#f0e7dd] flex items-center justify-between text-[11px] font-code-md text-[#505f78]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        link
                      </span>
                      Jira #INC-419
                    </span>
                    <span className="text-[#2D5A3D] font-medium">Indexed</span>
                  </div>
                </div>
                {/* Source 2: Slack War Room */}
                <div className="bg-white rounded-lg p-4 border border-[#223148]/10 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#f0e7dd] text-[#0c1c32] px-2 py-0.5 rounded font-code-md text-[10px] font-bold tracking-tight border border-[#223148]/15">
                        Slack · #infra-war-room
                      </span>
                      <span className="font-code-md text-[10px] text-[#505f78]">
                        Jan 29, 2024
                      </span>
                    </div>
                    <h3 className="font-display text-[15px] font-semibold text-[#0c1c32] leading-snug">
                      Workaround for Envoy ingress keepalive TCP resets
                    </h3>
                    <p className="font-body-sm text-[12px] text-[#44474d] leading-relaxed">
                      Setting tcp_keepalives_idle = 60s temporarily prevented
                      AWS NLB silent drops during blue/green rollout.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#f0e7dd] flex items-center justify-between text-[11px] font-code-md text-[#505f78]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        forum
                      </span>
                      38 messages
                    </span>
                    <span className="text-[#2D5A3D] font-medium">Indexed</span>
                  </div>
                </div>
                {/* Source 3: GitHub PR */}
                <div className="bg-white rounded-lg p-4 border border-[#223148]/10 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#223148] text-white px-2 py-0.5 rounded font-code-md text-[10px] font-bold tracking-tight">
                        PR #881 · db-core-config
                      </span>
                      <span className="font-code-md text-[10px] text-[#505f78]">
                        Nov 12, 2023
                      </span>
                    </div>
                    <h3 className="font-display text-[15px] font-semibold text-[#0c1c32] leading-snug">
                      Prepared statement cache leak mitigation
                    </h3>
                    <p className="font-body-sm text-[12px] text-[#44474d] leading-relaxed">
                      Added prepare_threshold=0 on async worker connection
                      strings to stop memory leaks.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#f0e7dd] flex items-center justify-between text-[11px] font-code-md text-[#505f78]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        commit
                      </span>
                      Diff &amp; RFC
                    </span>
                    <span className="text-[#2D5A3D] font-medium">Indexed</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end pt-1">
                <button
                  className="inline-flex items-center gap-2 bg-[#2D5A3D] hover:bg-[#22442e] text-white px-5 py-2.5 rounded-lg font-label-md text-[12px] uppercase tracking-wider font-bold shadow-sm transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    neurology
                  </span>
                  <span>Extract Knowledge</span>
                </button>
              </div>
            </section>
            {/* 3. SECTION 2: EXTRACTION / ANALYZING STATE (CALM, EDITORIAL) */}
            <section className="bg-white rounded-lg border border-[#2D5A3D]/20 p-4 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D5A3D] animate-pulse ring-4 ring-[#2D5A3D]/10 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-body-md text-[14px] font-semibold text-[#0c1c32]">
                    Analyzing your work history... Synthesizing architectural
                    intent and runbook context
                  </span>
                  <span className="font-code-md text-[11px] text-[#505f78]">
                    Cross-referencing commit messages with incident
                    retrospectives
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-48 flex flex-col gap-1 shrink-0">
                <div className="flex justify-between font-code-md text-[10px] text-[#505f78]">
                  <span>Extraction status</span>
                  <span className="font-semibold text-[#2D5A3D]">75%</span>
                </div>
                <div className="w-full h-1.5 bg-[#f0e7dd] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D5A3D] rounded-full w-3/4" />
                </div>
              </div>
            </section>
            {/* 3.5 SECTION: ADD NOTE */}
            <section className="bg-[#fbf7f2] rounded-lg border border-[#2D5A3D]/20 p-5 md:p-6 shadow-[0_2px_8px_rgba(34,49,72,0.04)]">
              <div className="flex flex-col gap-1 border-b border-[#223148]/15 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#2D5A3D]">
                    note_add
                  </span>
                  <h2 className="font-display text-[22px] font-semibold text-[#0c1c32]">
                    Add a Note
                  </h2>
                </div>
                <p className="font-body-sm text-[13px] text-[#505f78]">
                  Add context that is not present in the connected sources.
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleAddNote}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                      Entry title
                    </span>
                    <input
                      className="w-full bg-white text-[#1f1b15] rounded-md px-3 py-2.5 font-body-sm text-[13px] border border-[#c5c6cd] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none"
                      onChange={(event) => setNoteTitle(event.target.value)}
                      placeholder="e.g. Rule for emergency schema changes"
                      value={noteTitle}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                      Source label
                    </span>
                    <select
                      className="w-full bg-white text-[#1f1b15] rounded-md px-3 py-2.5 font-body-sm text-[13px] border border-[#c5c6cd] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none"
                      onChange={(event) => setNoteSource(event.target.value)}
                      value={noteSource}
                    >
                      <option>Direct note</option>
                      <option>Offboarding conversation</option>
                      <option>Runbook addition</option>
                      <option>Team decision</option>
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                    Knowledge note
                  </span>
                  <textarea
                    className="w-full bg-white text-[#1f1b15] rounded-md p-3 font-body-sm text-[13px] leading-relaxed border border-[#c5c6cd] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none resize-y"
                    onChange={(event) => setNoteBody(event.target.value)}
                    placeholder="Describe the decision, workaround, or context the team should remember."
                    rows={4}
                    value={noteBody}
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="font-code-md text-[11px] text-[#B85C38]"
                    role="alert"
                  >
                    {noteError}
                  </span>
                  <button
                    className="inline-flex items-center gap-2 bg-[#2D5A3D] hover:bg-[#22442e] text-white px-5 py-2.5 rounded-lg font-label-md text-[12px] uppercase tracking-wider font-bold shadow-sm transition-all"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isEditingNote ? "save" : "add_circle"}
                    </span>
                    <span>
                      {isEditingNote
                        ? "Update Knowledge Entry"
                        : "Add to Knowledge Entries"}
                    </span>
                  </button>
                </div>
              </form>
            </section>
            {/* 4. SECTION 3: DRAFT KNOWLEDGE ENTRIES */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#223148]/15 pb-2">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-[22px] font-semibold text-[#0c1c32]">
                    Draft Knowledge Entries
                  </h2>
                  <span className="bg-[#2D5A3D]/10 text-[#2D5A3D] border border-[#2D5A3D]/20 px-2.5 py-0.5 rounded-full font-code-md text-[11px] font-bold">
                    2 of 4 entries approved
                  </span>
                </div>
                <span className="font-code-md text-[11px] text-[#505f78] tracking-wider uppercase font-medium">
                  Sorted by critical impact
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {addedEntry && (
                  <article className="relative bg-white rounded-lg p-5 md:p-6 shadow-[0_3px_12px_rgba(34,49,72,0.05)] border border-[#223148]/10 flex flex-col gap-3.5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#c5a059]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#e9c176]/20 text-[#8a631b] px-2.5 py-0.5 rounded-full font-code-md text-[11px] font-bold tracking-wide flex items-center gap-1.5 border border-[#c5a059]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                          Pending Review
                        </span>
                        <span className="font-code-md text-[11px] text-[#505f78]">
                          Added from {addedEntry.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          aria-label="Edit note"
                          className="w-8 h-8 rounded-full bg-[#f0e7dd]/60 hover:bg-[#eae1d7] text-[#223148] flex items-center justify-center transition-all"
                          onClick={handleEditNote}
                          title="Edit note"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            edit
                          </span>
                        </button>
                        <button
                          aria-label="Delete note"
                          className="w-8 h-8 rounded-full bg-[#f0e7dd]/60 hover:bg-[#ffdad6] text-[#B85C38] flex items-center justify-center transition-all"
                          onClick={handleDeleteNote}
                          title="Delete note"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#fbf7f2] p-3.5 rounded-lg border border-[#223148]/10">
                      <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                        Note
                      </span>
                      <h3 className="font-display text-[17px] font-semibold text-[#0c1c32]">
                        {addedEntry.title}
                      </h3>
                      <p className="font-body-sm text-[#44474d] leading-relaxed whitespace-pre-wrap">
                        {addedEntry.note}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded font-code-md text-[10px] font-medium">
                        #manual-note
                      </span>
                      <span className="font-code-md text-[11px] text-[#c5a059] font-medium">
                        Click checkmark to approve
                      </span>
                    </div>
                  </article>
                )}
                {/* ENTRY 1: APPROVED STATE */}
                {sourceItems.length >= 0 && (
                  <article className="relative bg-white rounded-lg p-5 md:p-6 shadow-[0_3px_12px_rgba(34,49,72,0.05)] border border-[#223148]/10 flex flex-col gap-3.5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#2D5A3D]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#2D5A3D]/10 text-[#2D5A3D] px-2.5 py-0.5 rounded-full font-code-md text-[11px] font-bold tracking-wide flex items-center gap-1.5 border border-[#2D5A3D]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3D]" />
                          ● Approved for Archive
                        </span>
                        <span className="font-code-md text-[11px] text-[#505f78]">
                          Derived from INC-419
                        </span>
                      </div>
                      {/* Action Controls: Approve (active), Edit, Discard */}
                      <div className="flex items-center gap-1.5">
                        <button
                          className="w-8 h-8 rounded-full bg-[#2D5A3D] text-white flex items-center justify-center shadow-xs transition-all"
                          title="Approved"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            check
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 rounded-full bg-[#f0e7dd]/60 hover:bg-[#eae1d7] text-[#223148] flex items-center justify-center transition-all"
                          title="Edit Entry"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 rounded-full bg-[#f0e7dd]/60 hover:bg-[#ffdad6] text-[#B85C38] flex items-center justify-center transition-all"
                          title="Discard"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-[#fbf7f2] p-3.5 rounded-lg border border-[#223148]/10 text-[13px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                          Problem
                        </span>
                        <p className="font-body-md text-[#0c1c32] font-medium leading-snug">
                          PgBouncer socket descriptor saturation on flash
                          checkout spikes
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                          Symptom
                        </span>
                        <p className="font-body-sm text-[#44474d] leading-snug">
                          Worker pods throw 504 gateway timeouts; pool daemon
                          fails health pings despite low CPU load
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2 pt-2 border-t border-[#eae1d7]">
                        <span className="font-code-md text-[10px] uppercase tracking-wider text-[#2D5A3D] font-bold">
                          Solution
                        </span>
                        <p className="font-body-sm text-[#1f1b15] leading-relaxed">
                          Switch checkout-worker to transaction-level pooling
                          with{" "}
                          <code className="font-code-md text-[11px] bg-[#eae1d7] text-[#0c1c32] px-1 py-0.5 rounded">
                            max_client_conn=1200
                          </code>{" "}
                          and{" "}
                          <code className="font-code-md text-[11px] bg-[#eae1d7] text-[#0c1c32] px-1 py-0.5 rounded">
                            pool_mode=transaction
                          </code>
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <span className="font-code-md text-[10px] uppercase tracking-wider text-[#505f78] font-bold">
                          Context
                        </span>
                        <p className="font-body-sm text-[#44474d] leading-relaxed">
                          Direct leases avoid persistent socket locking when
                          burst transactions exceed Aurora write limits.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded font-code-md text-[10px] font-medium">
                          #postgres
                        </span>
                        <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded font-code-md text-[10px] font-medium">
                          #pooling
                        </span>
                        <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded font-code-md text-[10px] font-medium">
                          #checkout
                        </span>
                        <span className="bg-[#eae1d7] text-[#223148] px-2 py-0.5 rounded font-code-md text-[10px] font-medium">
                          #infra
                        </span>
                      </div>
                      <span className="font-code-md text-[11px] text-[#2D5A3D] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          verified
                        </span>
                        Ready for repository
                      </span>
                    </div>
                  </article>
                )}
                {/* ENTRY 2: PENDING REVIEW STATE */}
              </div>
            </section>
            {/* 5. SECTION 4: GAP-FILL QUESTIONS */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 border-b border-[#223148]/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#475f86]">
                    help_center
                  </span>
                  <h2 className="font-display text-[22px] font-semibold text-[#0c1c32]">
                    Gap-Fill Questions
                  </h2>
                </div>
                <p className="font-body-sm text-[13px] text-[#505f78]">
                  Clarifying undocumented edge cases before final archiving.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {/* Question Card 1 */}
                <div className="bg-white rounded-lg p-5 border border-[#223148]/10 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#f0e7dd] text-[#0c1c32] font-code-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q1
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-body-md text-[14px] font-semibold text-[#0c1c32]">
                        Who owns the fallback manual DNS failover switch if the
                        primary Aurora cluster locks up?
                      </h3>
                      <span className="font-code-md text-[11px] text-[#505f78]">
                        Unresolved dependency detected in Disaster Recovery
                        runbook v1.9
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <textarea
                      className="w-full bg-[#fbf7f2] text-[#1f1b15] rounded-md p-3 font-body-sm text-[13px] leading-relaxed border border-[#c5c6cd] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none resize-y"
                      rows={2}
                      defaultValue={
                        "The Secondary SRE team in EMEA holds the break-glass KMS tokens; escalation route is documented in 1Password vault #infra-core."
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-code-md text-[#505f78]">
                    <span className="flex items-center gap-1 text-[#2D5A3D] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                      Response recorded
                    </span>
                    <span>Updated 2 hours ago</span>
                  </div>
                </div>
                {/* Question Card 2 */}
                <div className="bg-white rounded-lg p-5 border border-[#223148]/10 shadow-[0_2px_8px_rgba(34,49,72,0.04)] flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#f0e7dd] text-[#0c1c32] font-code-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q2
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-body-md text-[14px] font-semibold text-[#0c1c32]">
                        What is the unwritten rule regarding deploying schema
                        migrations during end-of-quarter billing cycles?
                      </h3>
                      <span className="font-code-md text-[11px] text-[#505f78]">
                        Team cultural policy missing in standard engineering
                        guide
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <textarea
                      className="w-full bg-[#fbf7f2] text-[#1f1b15] rounded-md p-3 font-body-sm text-[13px] leading-relaxed border border-[#c5c6cd] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none resize-y"
                      rows={2}
                      defaultValue={
                        "Strict zero-migration policy 48 hours prior to midnight UTC on quarter end. If emergency patch is mandated, Finance VP and Staff DBRE must co-sign the PR with an active dry-run shadow table replay."
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-code-md text-[#505f78]">
                    <span className="flex items-center gap-1 text-[#2D5A3D] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                      Response recorded
                    </span>
                    <span>Updated 45 mins ago</span>
                  </div>
                </div>
              </div>
            </section>
            {/* 6. SECTION 5: FINISH & SAVE CTA */}
            <section className="bg-[#223148] rounded-xl p-8 md:p-10 border border-[#2f486d] shadow-xl flex flex-col items-center justify-center text-center gap-5 my-2 text-[#f3eae0]">
              <div className="inline-flex items-center gap-2 font-code-md text-[11px] text-[#bad3ff] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#bad3ff]" />
                <span>Deployment Ready Protocol</span>
              </div>
              <div className="flex flex-col gap-1.5 max-w-lg">
                <h3 className="font-display text-[26px] md:text-[30px] font-semibold text-[#f3eae0] tracking-tight">
                  Ready to finalize this handoff?
                </h3>
                <p className="font-body-md text-[14px] text-[#8a99b5] leading-relaxed">
                  Commits 4 approved knowledge dossiers and 2 gap-fill responses
                  into the verified institutional knowledge codex.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  className="inline-flex items-center justify-center gap-2 bg-[#2D5A3D] hover:bg-[#22442e] text-white px-8 py-3.5 rounded-lg font-label-md text-[12px] uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    task_alt
                  </span>
                  <span>Finish &amp; Save to Knowledge Base</span>
                </button>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 font-code-md text-[11px] text-[#8a99b5]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#e9c176]">
                    verified
                  </span>
                  SOC 2 Type II compliant
                </span>
                <span className="text-[#2f486d]">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#e9c176]">
                    lock
                  </span>
                  Enterprise AES-256
                </span>
                <span className="text-[#2f486d]">•</span>
                <span>Elena Rostova · Verified Node #04</span>
              </div>
            </section>
          </div>
        </main>

        {/* REFINED EDITORIAL FOOTER */}
        <Footer />
      </>
    </div>
  );
};

export default CapturePage;
