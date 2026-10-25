import list from "../data/wumpuses.json";

export const WUMPUSES = list;
export const FORMATS = [
  { id: "gif", label: "GIF", ext: "gif" },
  { id: "png", label: "PNG", ext: "png" },
  { id: "lottie", label: "Lottie", ext: "json" },
];
export const MOODS = ["All", "Happy", "Lovey", "Chill", "Grumpy", "Yikes"];
export const MOOD_ICON = { All: "all", Happy: "happy", Lovey: "lovey", Chill: "chill", Grumpy: "grumpy", Yikes: "yikes" };

const extOf = (fmt) => FORMATS.find((f) => f.id === fmt).ext;

/** Path of a file inside public/wumpus/<slug>/ */
export const pathFor = (w, fmt) => `/wumpus/${w.slug}/${w.slug}.${extOf(fmt)}`;
export const bySlug = (slug) => WUMPUSES.find((w) => w.slug === slug);
export const fileName = (w, fmt) => `wumpus-${w.slug}.${extOf(fmt)}`;
