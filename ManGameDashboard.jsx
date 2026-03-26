import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

const PASSWORD = "12";

// ─── Graduation Countdown Logic ───
const GRAD_DATE = new Date("2026-05-04T19:00:00+03:00"); // May 4, 2026 7PM Qatar

function getTimeLeft() {
  const now = new Date();
  const diff = GRAD_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

// ─── Password Screen ───
function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);
  const submit = () => {
    if (pw.trim() === PASSWORD) { onUnlock(); }
    else { setShake(true); setTimeout(() => setShake(false), 500); }
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f3ef", fontFamily: "'Libre Baskerville', Georgia, serif" }}>
      <div style={{ textAlign: "center", padding: "48px 40px", background: "#fff", border: "1px solid #e0ddd8", borderRadius: 16, maxWidth: 420, width: "90%", animation: shake ? "shake 0.5s ease" : undefined }}>
        <div style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>70-401</div>
        <h1 style={{ fontSize: 26, color: "#1a1a1a", fontWeight: 400, margin: "0 0 8px 0", lineHeight: 1.3 }}>Management Game</h1>
        <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 32px 0", fontStyle: "italic" }}>Spring 2026</p>
        <p style={{ color: "#666", fontSize: 14, margin: "0 0 16px 0" }}>How many units is Man Game?</p>
        <input
          type="text"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Enter number"
          style={{ width: "100%", padding: "14px 18px", fontSize: 16, background: "#faf9f7", border: "1px solid #e0ddd8", borderRadius: 8, color: "#1a1a1a", outline: "none", textAlign: "center", letterSpacing: 3, fontFamily: "inherit", boxSizing: "border-box" }}
        />
        <button onClick={submit} style={{ marginTop: 16, padding: "12px 40px", fontSize: 14, background: "#faf9f7", border: "1px solid #e0ddd8", borderRadius: 8, color: "#888", cursor: "pointer", letterSpacing: 2, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.target.style.background = "#f0eeea"; e.target.style.color = "#555"; }}
          onMouseLeave={(e) => { e.target.style.background = "#faf9f7"; e.target.style.color = "#888"; }}
        >Enter</button>
      </div>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }`}</style>
    </div>
  );
}

// ─── Countdown Unit ───
function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: "center", minWidth: 90 }}>
      <div style={{ fontSize: 72, fontWeight: 400, color: "#1a1a1a", lineHeight: 1, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: -2 }}>{String(value).padStart(2, "0")}</div>
      <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", marginTop: 8 }}>{label}</div>
    </div>
  );
}

// ─── Graduation Cap SVG ───
function GradCap({ size = 28, color = "#d5d0c8", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style}>
      <polygon points="32,8 4,24 32,40 60,24" fill={color} />
      <polygon points="32,8 4,24 32,40 60,24" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <rect x="30" y="24" width="4" height="22" rx="1" fill={color} opacity="0.7" />
      <path d="M34 46 Q34 52 40 54" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="40" cy="54" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

// ─── Graduation Countdown Page ───
function CountdownPage() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => { const i = setInterval(() => setTime(getTimeLeft()), 1000); return () => clearInterval(i); }, []);

  const caps = [
    { top: "8%", left: "8%", size: 44, delay: "0s", duration: "6s", rotate: -15, opacity: 0.35 },
    { top: "12%", right: "10%", size: 38, delay: "1.5s", duration: "7s", rotate: 12, opacity: 0.3 },
    { bottom: "18%", left: "12%", size: 34, delay: "0.8s", duration: "5.5s", rotate: -8, opacity: 0.28 },
    { bottom: "14%", right: "8%", size: 40, delay: "2.2s", duration: "6.5s", rotate: 20, opacity: 0.32 },
    { top: "45%", left: "4%", size: 30, delay: "3s", duration: "7.5s", rotate: -25, opacity: 0.25 },
    { top: "40%", right: "5%", size: 32, delay: "1s", duration: "6s", rotate: 10, opacity: 0.27 },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      {/* Floating graduation caps */}
      {caps.map((cap, i) => (
        <div key={i} style={{
          position: "absolute",
          top: cap.top, bottom: cap.bottom, left: cap.left, right: cap.right,
          opacity: cap.opacity,
          transform: `rotate(${cap.rotate}deg)`,
          animation: `capFloat ${cap.duration} ease-in-out ${cap.delay} infinite`,
          pointerEvents: "none",
        }}>
          <GradCap size={cap.size} color="#6b6560" />
        </div>
      ))}

      <div style={{ textAlign: "center", maxWidth: 640, animation: "fadeUp 1s ease both", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#bbb", marginBottom: 24 }}>Carnegie Mellon University Qatar</div>
        <h1 style={{ fontSize: 42, fontWeight: 400, color: "#1a1a1a", margin: "0 0 12px 0", lineHeight: 1.25, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Class of 2026
        </h1>
        <p style={{ color: "#888", fontSize: 15, margin: "0 0 56px 0", lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          Almost there. A few more weeks of learning (because learning is awesome!) and hopefully no more emergency alerts.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap", alignItems: "baseline" }}>
          <CountdownUnit value={time.days} label="Days" />
          <div style={{ color: "#ccc", fontSize: 48, fontWeight: 200, marginBottom: 18 }}>:</div>
          <CountdownUnit value={time.hours} label="Hours" />
          <div style={{ color: "#ccc", fontSize: 48, fontWeight: 200, marginBottom: 18 }}>:</div>
          <CountdownUnit value={time.minutes} label="Minutes" />
          <div style={{ color: "#ccc", fontSize: 48, fontWeight: 200, marginBottom: 18 }}>:</div>
          <CountdownUnit value={time.seconds} label="Seconds" />
        </div>

        <p style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#ccc", marginBottom: 56 }}>till graduation</p>

        <div style={{ background: "#fff", border: "1px solid #e0ddd8", borderRadius: 12, padding: "28px 32px", textAlign: "left", lineHeight: 1.8, color: "#777", fontSize: 14 }}>
          <p style={{ margin: "0 0 14px 0" }}>
            Hopefully, we will be back on campus and there might or might not be a countdown thing in the food court. Till then, check the above!
          </p>
          <p style={{ margin: 0 }}>
            In the mean time, finish strong!
          </p>
        </div>

        <p style={{ marginTop: 24, fontSize: 13, color: "#bbb" }}>
          Use the tabs above to access BM2 materials.
        </p>
      </div>
    </div>
  );
}

// ─── Content Data ───
const bm2Guidelines = [
  {
    title: "Purpose",
    content: [
      "Board Meeting 2 takes place after Year 8 (Round 8). Its purpose is two-fold:",
      "**Primary:** Inform the board whether you achieved the KPI targets you committed to at BM1. If yes, explain how. If no, explain why not. In explaining, you should critically reflect on your last four years of operations. This is the core of BM2.",
      "**Secondary:** Communicate your strategy and KPI targets moving forward (through the end of Year 9).",
      "This is your opportunity to effectively capture what happened over the last four years and showcase what you did throughout, even if your results lag behind competitors. The board wants to understand *how you think*, not just what happened.",
    ],
  },
  {
    title: "Part 1: Performance Review (Primary Focus)",
    content: [
      "The board wants answers to the following. Structure your executive summary and presentation accordingly:",
      "**KPI Results:** Did you achieve your KPI targets? Present each KPI, its target, and the actual result. For each, explain what drove the outcome. If you met the target, what specific decisions made that possible? If you missed, conduct root cause analysis (not description of what happened, but *why* it happened).",
      "**Market Evolution:** How did the overall market evolve over the past four years? Consider new technologies, shifting market conditions, and competitive dynamics. What surprised you?",
      "**Business Strategy:** What strategy did you pursue? In which markets and technologies did you enter or exit? Did your strategy shift from BM1, and if so, why?",
      "**Functional Strategies:** Walk through your key functional decisions and their rationale across Marketing, Production, R&D, and Finance. Connect each to your overall strategy.",
      "**What Worked and What Did Not:** Be honest. The board values candid self-assessment more than polished narratives. If a decision did not work, explain what you learned and how you adjusted.",
    ],
  },
  {
    title: "Part 2: Strategy Moving Forward",
    content: [
      "**Forward Plan:** What is your strategy for the remaining rounds? Be specific about markets, technologies, pricing, and production plans. Include risks and contingencies.",
      "**KPI Targets:** Define your KPIs and set targets for the end of Year 9. Justify why these targets are achievable given your plan and current position.",
    ],
  },
  {
    title: "Executive Summary Format",
    content: [
      "There is no one-size-fits-all template for the second executive summary. Structure it in the way that most effectively communicates your performance. Requirements:",
      "**Maximum 3 pages** (excluding cover page). Be concise and to the point.",
      "**Cover page required** (not part of the 3-page count). No appendix unless truly necessary.",
      "**Start with your main message.** Lead with clear takeaways. The board should know your position within the first paragraph. Do not build up to a conclusion; state it upfront.",
      "Avoid superlatives and filler. Every sentence should serve a purpose.",
      "Tables within the document are encouraged where they help communicate data concisely (e.g., KPI results, competitive comparisons).",
      "**Write in an analytical and persuasive manner.** The executive summary is not a report. It is a strategic communication to your board. Make claims, support them with evidence, connect decisions to outcomes.",
    ],
  },
  {
    title: "Presentation",
    content: [
      "The presentation follows the same objectives as the executive summary.",
      "**Duration:** Plan for approximately 30 minutes, including Q&A.",
      "**All team members must present** and all will participate in the Q&A initiated by board members.",
      "**Suggested opening:** Start with a brief overview of the KPIs you committed to and whether you achieved them. Summarize your committed strategy and technology position from BM1 before diving into details.",
      "**Your board is the same as BM1.** Review the feedback you received and the recording shared after BM1. Prepare accordingly.",
      "**Date: April 13, 2026.** Modality to be determined (in person or via Zoom depending on developments).",
      "Refer to the Executive Summary and Presentation component on Canvas (Assignments) for submission details.",
    ],
  },
  {
    title: "Key Reminder",
    content: [
      "BM2 takes place after Round 8, with one round remaining. You are not at the finish line yet. The board will expect you to account for what has happened *and* demonstrate that you have a clear, credible plan for the final round. Results matter, but so does the quality of your strategic reasoning.",
    ],
  },
];

const bm1Learnings = [
  {
    num: "01",
    title: "Connect Every Decision to Your Strategy",
    problem: "Several teams became reactive to competitors rather than anchored to a deliberate strategy. One team explicitly noted a disconnect between claiming a sustainability-led strategy while holding on to combustion for higher margins. The board notices when actions and stated strategy do not align.",
    forBM2: "If your strategy shifted from BM1, own it. Explain why you pivoted and what triggered the change. If you stayed the course, show how each major decision served that strategy. Do not present a list of actions without explaining the strategic logic behind them.",
  },
  {
    num: "02",
    title: "Analyze, Do Not Describe",
    problem: 'A recurring pattern was describing what happened ("revenue increased," "demand was lower than expected") without explaining why. The board does not need a recap of results they can read in the data. They need your interpretation: what caused the outcome, what you learned, and how it informed subsequent decisions.',
    forBM2: "For every metric you present, be prepared to answer \"why?\" at least two levels deep. If revenue declined, why? Because demand dropped. Why did demand drop? Because a competitor undercut your pricing in a market where your differentiation was not strong enough to justify the premium. That decomposition is what the board expects.",
  },
  {
    num: "03",
    title: "Strengthen Your Financial Narrative",
    problem: 'Boards pushed teams on share buybacks, dividend payouts, cash reserves, debt structure, and capital allocation. Several teams admitted they made financial decisions based on assumptions ("40% debt / 60% equity is standard") rather than analysis of their own situation.',
    forBM2: "Every financial decision should have a clear rationale tied to your strategic position. If you paid dividends, explain why that was better than reinvestment. If you took on debt, explain what it funded and whether the return justified the cost. Use ratios, not just raw numbers: operating cash flow, ROCE, contribution margins, turnover ratios.",
  },
  {
    num: "04",
    title: "Make Your KPIs Work for You",
    problem: "Board members challenged KPI choices: EPS as a comparison metric when it depends on capital structure, conservative TSR targets, redundant KPIs measuring the same thing, and KPIs that were tracked but not used to make decisions.",
    forBM2: "Present each KPI alongside the BM1 target and the actual result. If your board asked you to change KPIs or targets, acknowledge that. New targets for Year 9 should reflect what you learned, not just last year's numbers with a growth rate applied. Justify every target with specific assumptions.",
  },
  {
    num: "05",
    title: "Present with Confidence and Precision",
    problem: 'Hedging language ("we think," "we hope," "probably") undermined otherwise strong strategies. Some teams focused too heavily on numbers or narrative, but not both. One team learned that boards want the reasoning behind assumptions, not just the math.',
    forBM2: "If you are pursuing an aggressive strategy, present it with conviction. Know your board: review the BM1 feedback and recording. Prepare for the specific types of questions they asked. Run mock Q&As targeting the areas where your reasoning is weakest.",
  },
  {
    num: "06",
    title: "Demonstrate Competitive Awareness",
    problem: 'Several boards asked how teams were different from competitors when most pursued similar strategies (high features, similar pricing). Teams that could not articulate their competitive advantage struggled in Q&A.',
    forBM2: "Know your competitors' positions. Be prepared to explain not just what you did, but how your choices compare to others and why your approach was effective in that context. A comparative table with key metrics by competitor is a strong tool for this.",
  },
  {
    num: "07",
    title: "Prepare for Q&A as a Team",
    problem: "The strongest moments came when teammates supported each other during Q&A. The weakest moments came when teams could not explain decisions in their own presentation. Teams that ran pre-meeting Q&A preparation performed noticeably better.",
    forBM2: "Identify the 5 to 10 hardest questions your board could ask. These are usually about decisions you are least confident in or gaps between stated strategy and actual results. Practice answering as a team. Every member should be able to speak to every major decision.",
  },
];

// ─── Render Formatted Text ───
function FormattedText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} style={{ color: "#222" }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

// ─── BM2 Guidelines Tab ───
function GuidelinesTab() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 20px 80px", animation: "fadeUp 0.6s ease both" }}>
      <h2 style={{ fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 8, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Board Meeting 2 Guidelines</h2>
      <p style={{ color: "#999", fontSize: 13, marginBottom: 40, borderBottom: "1px solid #e0ddd8", paddingBottom: 20 }}>Everything you need for your executive summary, presentation, and Q&A preparation.</p>

      {bm2Guidelines.map((section, idx) => (
        <div key={idx} style={{ marginBottom: 36 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#444", marginBottom: 12, letterSpacing: 0.5 }}>{section.title}</h3>
          {section.content.map((line, j) => (
            <p key={j} style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 0", paddingLeft: line.startsWith("**") && j > 0 ? 16 : 0, borderLeft: line.startsWith("**") && j > 0 ? "2px solid #ddd" : "none" }}>
              <FormattedText text={line} />
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── BM1 Learnings Tab ───
function LearningsTab() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 20px 80px", animation: "fadeUp 0.6s ease both" }}>
      <h2 style={{ fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 8, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Learnings from Board Meeting 1</h2>
      <p style={{ color: "#999", fontSize: 13, marginBottom: 40, borderBottom: "1px solid #e0ddd8", paddingBottom: 20 }}>Based on your reflections, board feedback, and my observations. Use this as a checklist when preparing for BM2.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bm1Learnings.map((item, idx) => {
          const isOpen = expanded === idx;
          return (
            <div key={idx}
              onClick={() => setExpanded(isOpen ? null : idx)}
              style={{ background: isOpen ? "#fff" : "#faf9f7", border: `1px solid ${isOpen ? "#d5d2cc" : "#e0ddd8"}`, borderRadius: 10, padding: "16px 20px", cursor: "pointer", transition: "all 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 20, fontWeight: 300, color: "#ccc", fontFamily: "'Cormorant Garamond', Georgia, serif", minWidth: 32 }}>{item.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#444", flex: 1 }}>{item.title}</span>
                <span style={{ color: "#ccc", fontSize: 18, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>&#9662;</span>
              </div>
              {isOpen && (
                <div style={{ marginTop: 16, paddingLeft: 48, animation: "fadeUp 0.3s ease both" }}>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>What We Observed</div>
                    <p style={{ color: "#666", fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>{item.problem}</p>
                  </div>
                  <div style={{ background: "#faf9f7", border: "1px solid #e8e5e0", borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#888", marginBottom: 6 }}>For BM2</div>
                    <p style={{ color: "#555", fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>{item.forBM2}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main App ───
const TABS = [
  { id: "countdown", label: "Home" },
  { id: "guidelines", label: "BM2 Guidelines" },
  { id: "learnings", label: "Learnings from BM1" },
];

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("countdown");

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ef", fontFamily: "'Libre Baskerville', Georgia, serif", color: "#666" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(245,243,239,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e0ddd8", padding: "0 20px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: "#bbb", marginRight: "auto", textTransform: "uppercase", padding: "14px 0" }}>70-401</span>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "14px 18px", fontSize: 13, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
              color: tab === t.id ? "#333" : "#aaa",
              borderBottom: tab === t.id ? "2px solid #999" : "2px solid transparent",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { if (tab !== t.id) e.target.style.color = "#666"; }}
              onMouseLeave={(e) => { if (tab !== t.id) e.target.style.color = "#aaa"; }}
            >{t.label}</button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div>
        {tab === "countdown" && <CountdownPage />}
        {tab === "guidelines" && <GuidelinesTab />}
        {tab === "learnings" && <LearningsTab />}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes capFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        * { box-sizing: border-box; margin: 0; }
        ::selection { background: rgba(0,0,0,0.08); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        @media (max-width: 600px) {
          nav { overflow-x: auto; }
        }
      `}</style>
      <Analytics />
    </div>
  );
}
