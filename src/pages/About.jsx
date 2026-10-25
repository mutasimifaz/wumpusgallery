import { LottieBox } from "../components/Preview.jsx";
import Icon from "../components/Icon.jsx";

const HELLO = { slug: "hello", name: "Hello" };

export default function About() {
  return (
    <div className="about">
      <div className="about-grid">
        <div className="paper">
          <h1>About <span className="hl">Wumpus Gallery</span></h1>
          <h2><Icon name="happy" size="1.1em" /> Who is Wumpus?</h2>
          <p>
            Wumpus is Discord’s mascot. He shows up in the branding, in easter eggs, stickers and illustrations all
            over the app, and he waves hello whenever someone joins a server or opens a new DM.
          </p>
          <h2><Icon name="cave" size="1.1em" /> Hunt the Wumpus</h2>
          <p>
            The name is a nod to <i>Hunt the Wumpus</i>, a text adventure Gregory Yob wrote in 1973. You wander a
            network of caves shaped like a dodecahedron, hunting a creature called the Wumpus.
          </p>
          <h2><Icon name="heart" size="1.1em" /> Why this site exists</h2>
          <p>
            I’ve uploaded a collection of Wumpus animations sourced from the archives of distok.top, a site that is
            now closed. After seeing how much people loved and used the single animation I shared from my old
            account in 2022, I decided to upload the full collection.
          </p>
          <p>
            Please note that I did not create these myself; I am simply archiving them so the community can still
            enjoy them.
          </p>
          <p className="fine">
            Fan-made and non-commercial. Not affiliated with Discord. All Wumpus artwork belongs to Discord Inc.
          </p>
        </div>
        <div className="about-mascot"><span className="blob" aria-hidden="true" /><LottieBox w={HELLO} /></div>
      </div>
    </div>
  );
}
