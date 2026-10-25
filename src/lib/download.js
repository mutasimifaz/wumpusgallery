import { pathFor } from "./assets.js";

/** Copies the full link to a file (works once the site is deployed, and on localhost). */
export async function copyLink(w, fmt) {
  const text = new URL(pathFor(w, fmt), window.location.origin).href;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
