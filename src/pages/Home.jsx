import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WumpusCard from "../components/WumpusCard.jsx";
import { LottieBox } from "../components/Preview.jsx";
import Icon from "../components/Icon.jsx";
import { WUMPUSES, FORMATS, MOODS, MOOD_ICON } from "../lib/assets.js";
import { useStored } from "../lib/hooks.js";
import { useToast } from "../components/Toast.jsx";

const HELLO = { slug: "hello", name: "Hello" };
const BOOPS = ["Boop!", "Boop boop!", "Hehe!", "That tickles!", "Again again!", "Wumpus is blushing…", "BOOP!"];

export default function Home() {
  const [q, setQ] = useState("");
  const [mood, setMood] = useState("All");
  const [fmt, setFmt] = useStored("ww-format", "gif");
  const [boops, setBoops] = useState(() => { try { return +localStorage.getItem("ww-boops") || 0; } catch { return 0; } });
  const [wiggle, setWiggle] = useState(false);
  const toast = useToast();
  const nav = useNavigate();
  const grid = useRef(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return WUMPUSES.filter(
      (w) => (mood === "All" || w.mood === mood) && (!s || (w.name + " " + w.description).toLowerCase().includes(s))
    );
  }, [q, mood]);

  const boop = () => {
    const n = boops + 1;
    setBoops(n);
    try { localStorage.setItem("ww-boops", String(n)); } catch { /* ignore */ }
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
    toast(`${BOOPS[n % BOOPS.length]} (${n} boop${n === 1 ? "" : "s"})`, "hand");
  };
  const surprise = () => nav(`/wumpus/${WUMPUSES[Math.floor(Math.random() * WUMPUSES.length)].slug}`);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Icon name="star" size="1em" /> {WUMPUSES.length} animations · 3 formats each</p>
          <h1>
            Every <span className="hl">Wumpus</span> mood,<br />
            in three <span className="wob">flavors</span>.
          </h1>
          <p className="lede">
            Grab Discord’s favorite little guy as a <b>GIF</b>, a <b>PNG</b> or a <b>Lottie&nbsp;JSON</b> —
            free to preview, free to download.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#gallery" onClick={(e) => { e.preventDefault(); grid.current?.scrollIntoView({ behavior: "smooth" }); }}>
              Browse the gallery <Icon name="down" />
            </a>
            <button className="btn" onClick={surprise}><Icon name="dice" /> Surprise me</button>
          </div>
        </div>
        <button className={`hero-mascot ${wiggle ? "boop" : ""}`} onClick={boop} aria-label="Boop the Wumpus">
          <span className="blob" aria-hidden="true" />
          <span className="mascot-lottie"><LottieBox w={HELLO} /></span>
          <span className="speech">{boops ? `${boops} boop${boops === 1 ? "" : "s"}` : "Boop me!"}</span>
        </button>
      </section>

      <section className="gallery" id="gallery" ref={grid}>
        <div className="toolbar">
          <label className="search">
            <Icon name="search" size="1.2em" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a mood… (try “dance”)" aria-label="Search wumpuses" />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search"><Icon name="close" size="1em" /></button>}
          </label>
          <div className="seg" role="group" aria-label="Preview format">
            <span className="seg-label">Preview as</span>
            {FORMATS.map((f) => (
              <button key={f.id} className={fmt === f.id ? "on" : ""} aria-pressed={fmt === f.id} onClick={() => setFmt(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="chips" role="group" aria-label="Filter by mood">
          {MOODS.map((m) => (
            <button key={m} className={`chip ${mood === m ? "on" : ""}`} aria-pressed={mood === m} onClick={() => setMood(m)}>
              <Icon name={MOOD_ICON[m]} size="1.1em" /> {m}
            </button>
          ))}
        </div>

        {list.length ? (
          <div className="grid">
            {list.map((w, i) => <WumpusCard key={w.slug} w={w} fmt={fmt} index={i} />)}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-emoji"><Icon name="cave" size="4.5rem" /></div>
            <h3>Nobody here but us caves.</h3>
            <p>No Wumpus matches “{q}”. Try another word or clear the filters.</p>
            <button className="btn" onClick={() => { setQ(""); setMood("All"); }}>Reset</button>
          </div>
        )}
      </section>
    </>
  );
}
