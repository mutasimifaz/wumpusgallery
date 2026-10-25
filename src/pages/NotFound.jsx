import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <div className="empty big">
      <div className="empty-emoji"><Icon name="cave" size="4.5rem" /></div>
      <h1>404 — lost in the caves</h1>
      <p>Even Wumpus couldn’t find that page.</p>
      <Link className="btn primary" to="/">Take me home</Link>
    </div>
  );
}
