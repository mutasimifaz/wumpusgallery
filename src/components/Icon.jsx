const P = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <><path d="M12 4v11" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>,
  play: <path d="M7 4.5v15l12-7.5z" fill="currentColor" />,
  pause: <><path d="M8 5v14M16 5v14" strokeWidth="3.2" /></>,
  dice: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="9" cy="9" r="1.2" fill="currentColor" /><circle cx="15" cy="15" r="1.2" fill="currentColor" /><circle cx="15" cy="9" r="1.2" fill="currentColor" /><circle cx="9" cy="15" r="1.2" fill="currentColor" /></>,
  down: <><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></>,
  left: <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  right: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" />,
  sparkle: <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" fill="currentColor" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20z" fill="currentColor" />,
  cave: <><path d="M3 20c0-8 4-14 9-14s9 6 9 14" /><path d="M8 20c0-4 1.6-7 4-7s4 3 4 7" /></>,
  tip: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.3 1 2.1h5c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 3z" /></>,
  palette: <><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /><circle cx="16" cy="10" r="1" fill="currentColor" /></>,
  hand: <><path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11" /><path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V11" /><path d="M14 10V6.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6 7-2.5 0-4-1.2-5.3-3.5L4 14.5a1.5 1.5 0 0 1 2.4-1.8L8 14" /></>,
  sleep: <><path d="M5 6h6l-6 7h6" /><path d="M13 12h5l-5 6h5" /></>,
  broken: <><circle cx="12" cy="12" r="9" /><path d="M8 15c1.2-1.2 2.6-1.8 4-1.8s2.8.6 4 1.8" /><path d="m8 8 2 2M10 8 8 10M14 8l2 2M16 8l-2 2" /></>,
  /* mood faces */
  all: <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>,
  happy: <><circle cx="12" cy="12" r="9" /><path d="M8 14c1 1.8 2.4 2.7 4 2.7s3-.9 4-2.7" /><circle cx="9" cy="9.5" r="1" fill="currentColor" /><circle cx="15" cy="9.5" r="1" fill="currentColor" /></>,
  lovey: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20z" />,
  chill: <><circle cx="12" cy="12" r="9" /><path d="M7.5 10c.8.8 2.2.8 3 0M13.5 10c.8.8 2.2.8 3 0" /><path d="M9 15.5c1.8 1 4.2 1 6 0" /></>,
  grumpy: <><circle cx="12" cy="12" r="9" /><path d="m7.5 8.5 3 1.5M16.5 8.5 13.5 10" /><path d="M8.5 16.5c2-1.6 5-1.6 7 0" /></>,
  yikes: <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="9.5" r="1" fill="currentColor" /><circle cx="15" cy="9.5" r="1" fill="currentColor" /><ellipse cx="12" cy="16" rx="2.2" ry="2.8" /></>,
};

export default function Icon({ name, size = "1.1em", className = "", ...rest }) {
  return (
    <svg className={`ic ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {P[name]}
    </svg>
  );
}
