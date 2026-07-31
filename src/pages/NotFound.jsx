import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="state-block" style={{ paddingTop: 100 }}>
      <h3>Page not found</h3>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-outline btn-sm mt-24" style={{ display: "inline-flex" }}>
        Back to dashboard
      </Link>
    </div>
  );
}
