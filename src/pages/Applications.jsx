import { useEffect, useMemo, useState } from "react";
import { getAllApplications, updateApplicationStatus } from "../api/applications";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import StatusBadge from "../components/StatusBadge";

const STATUS_OPTIONS = ["pending", "reviewed", "shortlisted", "accepted", "rejected"];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllApplications();
      setApplications(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load applications."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return applications.filter((a) => {
      const matchesQuery =
        a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.title?.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || (a.status || "pending").toLowerCase() === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [applications, query, statusFilter]);

  async function handleStatusChange(app, status) {
    setUpdatingId(app.id);
    const prev = applications;
    setApplications((list) => list.map((a) => (a.id === app.id ? { ...a, status } : a)));
    try {
      await updateApplicationStatus(app.id, status);
      setToast(`Marked ${app.full_name} as ${status}.`);
    } catch (err) {
      setApplications(prev);
      setError(apiErrorMessage(err, "Couldn't update this application."));
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Careers</p>
          <h1>Applications</h1>
          <p className="subtitle">Review candidates and move them through your hiring pipeline.</p>
        </div>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}
      {error && <div className="banner banner-error">{error}</div>}

      <div className="toolbar">
        <div className="flex gap-12" style={{ flexWrap: "wrap" }}>
          <div className="field search-input" style={{ marginBottom: 0 }}>
            <input
              type="text"
              placeholder="Search by name, email, or role"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginBottom: 0, minWidth: 160 }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span className="cell-muted">
          {filtered.length} of {applications.length} applications
        </span>
      </div>

      {loading ? (
        <LoadingState label="Loading applications…" />
      ) : applications.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No applications yet" message="Candidate applications will appear here as they come in." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applying for</th>
                <th>Resume</th>
                <th>Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="cell-primary">{app.full_name}</div>
                    <div className="cell-muted">{app.email}</div>
                  </td>
                  <td>{app.title}</td>
                  <td>
                    {app.resume_url ? (
                      <a href={app.resume_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        View resume
                      </a>
                    ) : (
                      <span className="cell-muted">—</span>
                    )}
                  </td>
                  <td className="cell-muted">{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : "—"}</td>
                  <td>
                    <div className="flex items-center gap-8">
                      <StatusBadge value={app.status} />
                      <select
                        value={(app.status || "pending").toLowerCase()}
                        disabled={updatingId === app.id}
                        onChange={(e) => handleStatusChange(app, e.target.value)}
                        style={{ width: "auto", padding: "6px 8px", fontSize: 12.5 }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
