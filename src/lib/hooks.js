import { useEffect, useRef, useState, useCallback } from "react";
import { pathFor } from "./assets.js";

export function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, seen]);
  return [ref, seen];
}

export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return localStorage.getItem(key) ?? initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    setValue(v);
    try { localStorage.setItem(key, v); } catch { /* ignore */ }
  }, [key]);
  return [value, set];
}

const cache = new Map();
async function loadJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("bad status");
  const text = await res.text();
  return JSON.parse(text); // throws if the dev server returned index.html
}

/** Loads a wumpus' Lottie JSON. */
export function useLottieData(w, enabled = true) {
  const [state, setState] = useState({ data: cache.get(w.slug) ?? null, failed: false });
  useEffect(() => {
    if (!enabled || cache.has(w.slug)) {
      if (cache.has(w.slug)) setState({ data: cache.get(w.slug), failed: false });
      return;
    }
    let live = true;
    loadJson(pathFor(w, "lottie"))
      .then((data) => { cache.set(w.slug, data); live && setState({ data, failed: false }); })
      .catch(() => live && setState({ data: null, failed: true }));
    return () => { live = false; };
  }, [w, enabled]);
  return state;
}
