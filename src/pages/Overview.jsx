import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../api/jobs";
import { getAllApplications } from "../api/applications";
import { getAllTeam } from "../api/team";
import { LoadingState, ErrorState } from "../components/StateBlock";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";

export default function Overview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [team, setTeam] = useState([]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [j, a, t] = await Promise.all([getAllJobs(), getAllApplications(), getAllTeam()]);
      setJobs(j);
      setApplications(a);
      setTeam(t);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't load your dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const pendingCount = applications.filter((a) => (a.status || "pending").toLowerCase() === "pending").length;
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
    .slice(0, 6);

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}</h1>
          <p className="subtitle">Here's how careers and care operations look today.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState label="Pulling the latest numbers…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Open positions</div>
              <div className="stat-value">{jobs.length}</div>
              <div className="stat-note">
                <Link to="/jobs">Manage job postings →</Link>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Applications</div>
              <div className="stat-value">{applications.length}</div>
              <div className="stat-note">{pendingCount} awaiting review</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Care team members</div>
              <div className="stat-value">{team.length}</div>
              <div className="stat-note">
                <Link to="/team">View roster →</Link>
              </div>
            </div>
          </div>

          <div className="section-title">Recent applications</div>
          <div className="table-wrap">
            {recentApplications.length === 0 ? (
              <div className="state-block">
                <h3>No applications yet</h3>
                <p>New candidate applications will show up here.</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role applied to</th>
                    <th>Applied</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr key={app.id}>
                      <td>
                        <div className="cell-primary">{app.full_name}</div>
                        <div className="cell-muted">{app.email}</div>
                      </td>
                      <td>{app.title}</td>
                      <td className="cell-muted">
                        {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : "—"}
                      </td>
                      <td>
                        <StatusBadge value={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}
