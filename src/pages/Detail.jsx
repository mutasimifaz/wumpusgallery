import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LottieBox, SmartImg } from "../components/Preview.jsx";
import Icon from "../components/Icon.jsx";
import { WUMPUSES, FORMATS, bySlug, pathFor, fileName } from "../lib/assets.js";
import { copyLink } from "../lib/download.js";
import { useToast } from "../components/Toast.jsx";
import NotFound from "./NotFound.jsx";

const BGS = [
  { id: "checker", label: "Transparent", cls: "bg-checker" },
  { id: "white", label: "White", cls: "bg-white" },
  { id: "blurple", label: "Blurple", cls: "bg-blurple" },
  { id: "night", label: "Night", cls: "bg-night" },
  { id: "sun", label: "Sunny", cls: "bg-sun" },
];

export default function Detail() {
  const { slug } = useParams();
  const w = bySlug(slug);
  const [fmt, setFmt] = useState("gif");
  const [bg, setBg] = useState("checker");
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const lottieRef = useRef(null);
  const toast = useToast();
  if (!w) return <NotFound />;

  const i = WUMPUSES.indexOf(w);
  const prev = WUMPUSES[(i - 1 + WUMPUSES.length) % WUMPUSES.length];
  const next = WUMPUSES[(i + 1) % WUMPUSES.length];
  const grabbed = (f) => toast(`${w.name} .${f.ext} downloading`, "download");
  const copy = async (f) => toast((await copyLink(w, f.id)) ? `${f.label} link copied` : "Copy failed — your browser said no", "link");

  return (
    <div className="detail">
      <Link to="/" className="back"><Icon name="left" /> All wumpuses</Link>
      <div className="detail-grid">
        <div className="stage-wrap">
          <div className={`stage ${BGS.find((b) => b.id === bg).cls}`} key={`${w.slug}-${fmt}`}>
            {fmt === "lottie" ? (
              <LottieBox w={w} playing={playing} speed={speed} lottieRef={lottieRef} />
            ) : (
              <SmartImg w={w} fmt={fmt} />
            )}
          </div>
          <div className="swatches" role="group" aria-label="Preview background">
            {BGS.map((b) => (
              <button key={b.id} className={`swatch ${b.cls} ${bg === b.id ? "on" : ""}`} title={b.label} aria-label={b.label} aria-pressed={bg === b.id} onClick={() => setBg(b.id)} />
            ))}
          </div>
        </div>

        <div className="info">
          <span className="mood-tag solo">{w.mood}</span>
          <h1>{w.name}</h1>
          <p className="desc">{w.description}</p>

          <h2>Preview as</h2>
          <div className="seg" role="group" aria-label="Preview format">
            {FORMATS.map((f) => (
              <button key={f.id} className={fmt === f.id ? "on" : ""} aria-pressed={fmt === f.id} onClick={() => setFmt(f.id)}>{f.label}</button>
            ))}
          </div>
          {fmt === "lottie" && (
            <div className="lottie-controls">
              <button className="btn small" onClick={() => setPlaying((p) => !p)}><Icon name={playing ? "pause" : "play"} size="1em" /> {playing ? "Pause" : "Play"}</button>
              {[0.5, 1, 2].map((s) => (
                <button key={s} className={`btn small ${speed === s ? "primary" : ""}`} onClick={() => setSpeed(s)}>{s}×</button>
              ))}
            </div>
          )}

          <h2>Download</h2>
          <div className="dl-list">
            {FORMATS.map((f) => (
              <div className="dl" key={f.id}>
                <a className="btn primary dl-main" href={pathFor(w, f.id)} download={fileName(w, f.id)} onClick={() => grabbed(f)}><Icon name="download" /> {f.label} <small>.{f.ext}</small></a>
                <button className="btn icon" onClick={() => copy(f)} title={`Copy ${f.label} link`} aria-label={`Copy ${f.label} link`}><Icon name="link" /></button>
              </div>
            ))}
          </div>
          <p className="hint">Tip: Lottie files are tiny and stay sharp at any size. GIFs work everywhere. PNGs are the still frame.</p>

          <div className="pager">
            <Link to={`/wumpus/${prev.slug}`} className="btn"><Icon name="left" /> {prev.name}</Link>
            <Link to={`/wumpus/${next.slug}`} className="btn">{next.name} <Icon name="right" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
