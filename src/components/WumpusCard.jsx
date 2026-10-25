import { Link } from "react-router-dom";
import Preview from "./Preview.jsx";
import Icon from "./Icon.jsx";
import { FORMATS, pathFor, fileName } from "../lib/assets.js";
import { useToast } from "./Toast.jsx";

const TONES = ["tone-blurple", "tone-green", "tone-yellow", "tone-pink", "tone-sky"];

export default function WumpusCard({ w, fmt, index }) {
  const toast = useToast();
  const grabbed = (f) => toast(`${w.name} .${f.ext} downloading`, "download");
  return (
    <article className={`card ${TONES[index % TONES.length]}`} style={{ "--i": index % 12 }}>
      <Link to={`/wumpus/${w.slug}`} className="card-stage" aria-label={`Open ${w.name}`}>
        <Preview w={w} fmt={fmt} />
        <span className="mood-tag">{w.mood}</span>
      </Link>
      <div className="card-body">
        <h3>{w.name}</h3>
        <p>{w.description}</p>
        <div className="pills">
          {FORMATS.map((f) => (
            <a key={f.id} className="pill" href={pathFor(w, f.id)} download={fileName(w, f.id)} onClick={() => grabbed(f)} title={`Download ${f.label}`}>
              <Icon name="download" size="1em" /> {f.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
