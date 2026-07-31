import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllTrainingPrograms,
  createTrainingProgram,
  updateTrainingProgram,
  archiveTrainingProgram,
} from "../api/trainingPrograms";
import { getAllStudents } from "../api/students";
import { getTrainingEnrollments, setTrainingEnrollments } from "../api/enrollments";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import TrainingProgramForm from "../components/TrainingProgramForm";
import StatusBadge from "../components/StatusBadge";
import AssignTrainingModal from "../components/AssignTrainingModal";
import { IconPlus } from "../components/icons";

export default function TrainingPrograms() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [editingTraining, setEditingTraining] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [archiveTarget, setArchiveTarget] = useState(null);
  const [archiving, setArchiving] = useState(false);

  const [students, setStudents] = useState([]);
  const [assignTarget, setAssignTarget] = useState(null);
  const [assignSelectedIds, setAssignSelectedIds] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [trainingsData, studentsData] = await Promise.all([getAllTrainingPrograms(), getAllStudents()]);
      setTrainings(trainingsData);
      setStudents(studentsData);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load training programs."));
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

  const filtered = trainings.filter((t) => {
    const q = query.toLowerCase();
    const matchesQuery =
      t.title?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  async function handleCreate(form) {
    setSaving(true);
    setFormError("");
    try {
      await createTrainingProgram(form);
      setModalMode(null);
      setToast("Training program created.");
      load();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't create this training program."));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(form) {
    setSaving(true);
    setFormError("");
    try {
      await updateTrainingProgram(editingTraining.id, form);
      setModalMode(null);
      setEditingTraining(null);
      setToast("Training program updated.");
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
      await archiveTrainingProgram(archiveTarget.id);
      setArchiveTarget(null);
      setToast("Training program removed.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this training program."));
    } finally {
      setArchiving(false);
    }
  }

  async function openAssign(training) {
    setAssignTarget(training);
    setAssignLoading(true);
    try {
      const studentIds = await getTrainingEnrollments(training.id);
      setAssignSelectedIds(studentIds);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load current assignments."));
      setAssignSelectedIds([]);
    } finally {
      setAssignLoading(false);
    }
  }

  async function handleAssignSubmit(studentIds) {
    setAssigning(true);
    try {
      await setTrainingEnrollments(assignTarget.id, studentIds);
      setToast(`Student assignments updated for “${assignTarget.title}”.`);
      setAssignTarget(null);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save student assignments."));
    } finally {
      setAssigning(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Learning</p>
          <h1>Training programs</h1>
          <p className="subtitle">Create and maintain the training programs employees complete.</p>
        </div>
        <button
          className="btn btn-brass"
          onClick={() => {
            setFormError("");
            setModalMode("create");
          }}
        >
          <IconPlus width={15} height={15} />
          New training
        </button>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}

      <div className="toolbar">
        <div className="field search-input" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Search by title or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: 160 }}
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <span className="cell-muted">
          {filtered.length} of {trainings.length} training programs
        </span>
      </div>

      {loading ? (
        <LoadingState label="Loading training programs…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : trainings.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No training programs yet" message="Create your first program to start assigning training." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((training) => (
                <tr key={training.id}>
                  <td className="cell-primary">
                    <Link to={`/trainings/${training.id}`} style={{ color: "inherit" }}>
                      {training.title}
                    </Link>
                  </td>
                  <td>{training.category || "—"}</td>
                  <td className="cell-muted">{training.duration ? `${training.duration} hrs` : "—"}</td>
                  <td>
                    <StatusBadge value={training.status} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openAssign(training)}>
                        Assign students
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingTraining(training);
                          setFormError("");
                          setModalMode("edit");
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setArchiveTarget(training)}>
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
          title={modalMode === "create" ? "New training program" : `Edit “${editingTraining?.title}”`}
          onClose={() => {
            setModalMode(null);
            setEditingTraining(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setModalMode(null);
                  setEditingTraining(null);
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" form="training-form" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : modalMode === "create" ? "Create training" : "Save changes"}
              </button>
            </>
          }
        >
          {formError && <div className="banner banner-error">{formError}</div>}
          <TrainingProgramForm
            initial={modalMode === "edit" ? editingTraining : null}
            busy={saving}
            onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
          />
        </Modal>
      )}

      {archiveTarget && (
        <ConfirmDialog
          title="Remove training program"
          message={`“${archiveTarget.title}” will be removed and unassigned from employees. This can't be undone from here.`}
          confirmLabel="Remove program"
          danger
          busy={archiving}
          onConfirm={handleArchive}
          onClose={() => setArchiveTarget(null)}
        />
      )}

      {assignTarget && !assignLoading && (
        <AssignTrainingModal
          title={`Assign students — ${assignTarget.title}`}
          subtitle="Choose which students are enrolled in this training program."
          options={students.map((s) => ({ id: s.id, label: s.full_name, sublabel: s.department }))}
          initialSelectedIds={assignSelectedIds}
          busy={assigning}
          onSubmit={handleAssignSubmit}
          onClose={() => setAssignTarget(null)}
        />
      )}
    </>
  );
}
