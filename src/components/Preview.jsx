import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Icon from "./Icon.jsx";
import { pathFor } from "../lib/assets.js";
import { useInView, useLottieData } from "../lib/hooks.js";

/** <img> that shows a sleepy placeholder if the file is missing. */
function SmartImg({ w, fmt, className }) {
  const src = pathFor(w, fmt);
  const [dead, setDead] = useState(false);
  useEffect(() => setDead(false), [src]);
  if (dead) return <div className="sleepy" title="Couldn't load this one"><Icon name="sleep" size="3rem" /></div>;
  return (
    <img className={className} src={src} alt={`${w.name} Wumpus`} loading="lazy" draggable="false" onError={() => setDead(true)} />
  );
}

export const LottieBox = ({ w, playing = true, speed = 1, lottieRef }) => {
  const { data, failed } = useLottieData(w);
  useEffect(() => { lottieRef?.current?.setSpeed?.(speed); }, [speed, data, lottieRef]);
  useEffect(() => {
    if (!lottieRef?.current) return;
    if (playing) lottieRef.current.play(); else lottieRef.current.pause();
  }, [playing, data, lottieRef]);
  if (failed) return <SmartImg w={w} fmt="gif" />;
  if (!data) return <div className="sleepy pulse"><Icon name="sparkle" size="2.4rem" /></div>;
  return <Lottie lottieRef={lottieRef} animationData={data} loop autoplay renderer="svg" />;
};

/** Shows a wumpus in the chosen format. Lottie only boots once the card scrolls into view. */
export default function Preview({ w, fmt }) {
  const [ref, seen] = useInView();
  return (
    <div className="preview" ref={ref}>
      {fmt === "lottie" ? (seen ? <LottieBox w={w} /> : <div className="sleepy"><Icon name="sparkle" size="2.4rem" /></div>) : <SmartImg w={w} fmt={fmt} />}
    </div>
  );
}

export { SmartImg };
