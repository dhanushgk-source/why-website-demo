import { useEffect, useState } from "react";
import { getAllJobs, createJob, updateJob, archiveJob } from "../api/jobs";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import JobForm from "../components/JobForm";
import { IconPlus, IconSearch } from "../components/icons";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [archiveTarget, setArchiveTarget] = useState(null);
  const [archiving, setArchiving] = useState(false);

  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load job postings."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = jobs.filter((j) => {
    const q = query.toLowerCase();
    return (
      j.title?.toLowerCase().includes(q) ||
      j.department?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q)
    );
  });

  async function handleCreate(form) {
    setSaving(true);
    setFormError("");
    try {
      await createJob(form);
      setModalMode(null);
      setToast("Job posting created.");
      load();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't create this job."));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(form) {
    setSaving(true);
    setFormError("");
    try {
      await updateJob(editingJob.id, form);
      setModalMode(null);
      setEditingJob(null);
      setToast("Job posting updated.");
      load();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't save changes."));
    } finally {
      setSaving(false);
    }
  }

  async function handleArchive() {
    setArchiving(true);
    try {
      await archiveJob(archiveTarget.id);
      setArchiveTarget(null);
      setToast("Job posting removed from listings.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this job."));
    } finally {
      setArchiving(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Careers</p>
          <h1>Job postings</h1>
          <p className="subtitle">Create and maintain the open roles candidates see on the careers page.</p>
        </div>
        <button
          className="btn btn-brass"
          onClick={() => {
            setFormError("");
            setModalMode("create");
          }}
        >
          <IconPlus width={15} height={15} />
          New job
        </button>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}

      <div className="toolbar">
        <div className="field search-input" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Search by title, department, or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <span className="cell-muted">
          {filtered.length} of {jobs.length} active postings
        </span>
      </div>

      {loading ? (
        <LoadingState label="Loading job postings…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : jobs.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No job postings yet" message="Create your first listing to start accepting applications." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id}>
                  <td className="cell-primary">{job.title}</td>
                  <td>{job.department || "—"}</td>
                  <td>{job.location || "—"}</td>
                  <td className="cell-muted">{job.employment_type || "—"}</td>
                  <td className="cell-muted">{job.salary || "—"}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingJob(job);
                          setFormError("");
                          setModalMode("edit");
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setArchiveTarget(job)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalMode && (
        <Modal
          title={modalMode === "create" ? "New job posting" : `Edit “${editingJob?.title}”`}
          onClose={() => {
            setModalMode(null);
            setEditingJob(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setModalMode(null);
                  setEditingJob(null);
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" form="job-form" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : modalMode === "create" ? "Create job" : "Save changes"}
              </button>
            </>
          }
        >
          {formError && <div className="banner banner-error">{formError}</div>}
          <JobForm initial={modalMode === "edit" ? editingJob : null} busy={saving} onSubmit={modalMode === "create" ? handleCreate : handleUpdate} />
        </Modal>
      )}

      {archiveTarget && (
        <ConfirmDialog
          title="Remove job posting"
          message={`“${archiveTarget.title}” will be hidden from the careers page. This can't be undone from here.`}
          confirmLabel="Remove posting"
          danger
          busy={archiving}
          onConfirm={handleArchive}
          onClose={() => setArchiveTarget(null)}
        />
      )}
    </>
  );
}
