import { useEffect, useState } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  archiveStudent,
  setStudentStatus,
  resetStudentPassword,
} from "../api/students";
import { getAllTrainingPrograms } from "../api/trainingPrograms";
import { getStudentEnrollments, setStudentEnrollments } from "../api/enrollments";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import StudentForm from "../components/StudentForm";
import StatusBadge from "../components/StatusBadge";
import AssignTrainingModal from "../components/AssignTrainingModal";
import TempPasswordModal from "../components/TempPasswordModal";
import { IconPlus } from "../components/icons";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [editingStudent, setEditingStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [resetTarget, setResetTarget] = useState(null);
  const [resetting, setResetting] = useState(false);

  const [trainings, setTrainings] = useState([]);
  const [assignTarget, setAssignTarget] = useState(null);
  const [assignSelectedIds, setAssignSelectedIds] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [toast, setToast] = useState("");
  const [tempPasswordInfo, setTempPasswordInfo] = useState(null); // { studentName, email, tempPassword } | null

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [studentsData, trainingsData] = await Promise.all([getAllStudents(), getAllTrainingPrograms()]);
      setStudents(studentsData);
      setTrainings(trainingsData);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load students."));
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

  const filtered = students.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.full_name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.employee_id?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q)
    );
  });

  async function handleCreate(form) {
    setSaving(true);
    setFormError("");
    try {
      const result = await createStudent(form);
      setModalMode(null);
      load();
      if (result?.tempPassword) {
        setTempPasswordInfo({
          studentName: form.full_name,
          email: form.email,
          tempPassword: result.tempPassword,
          promoted: result.promoted,
        });
      } else {
        setToast("Student added.");
      }
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't add this student."));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(form) {
    setSaving(true);
    setFormError("");
    try {
      await updateStudent(editingStudent.id, form);
      setModalMode(null);
      setEditingStudent(null);
      setToast("Student updated.");
      load();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't save changes."));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await archiveStudent(deleteTarget.id);
      setDeleteTarget(null);
      setToast("Student removed.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this student."));
    } finally {
      setDeleting(false);
    }
  }

  async function handleToggleStatus(student) {
    const next = student.status === "active" ? "inactive" : "active";
    try {
      await setStudentStatus(student.id, next);
      setToast(next === "active" ? "Student activated." : "Student deactivated.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't update status."));
    }
  }

  async function handleResetPassword() {
    setResetting(true);
    try {
      const result = await resetStudentPassword(resetTarget.id);
      const target = resetTarget;
      setResetTarget(null);
      if (result?.tempPassword) {
        setTempPasswordInfo({
          studentName: target.full_name,
          email: target.email,
          tempPassword: result.tempPassword,
        });
      } else {
        setToast("Password reset.");
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't reset this password."));
    } finally {
      setResetting(false);
    }
  }

  async function openAssign(student) {
    setAssignTarget(student);
    setAssignLoading(true);
    try {
      const trainingIds = await getStudentEnrollments(student.id);
      setAssignSelectedIds(trainingIds);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load current assignments."));
      setAssignSelectedIds([]);
    } finally {
      setAssignLoading(false);
    }
  }

  async function handleAssignSubmit(trainingIds) {
    setAssigning(true);
    try {
      await setStudentEnrollments(assignTarget.id, trainingIds);
      setToast(`Training assignments updated for ${assignTarget.full_name}.`);
      setAssignTarget(null);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save training assignments."));
    } finally {
      setAssigning(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Learning</p>
          <h1>Students</h1>
          <p className="subtitle">Manage the employees enrolled in training programs.</p>
        </div>
        <button
          className="btn btn-brass"
          onClick={() => {
            setFormError("");
            setModalMode("create");
          }}
        >
          <IconPlus width={15} height={15} />
          Add student
        </button>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}
      {error && <div className="banner banner-error">{error}</div>}

      <div className="toolbar">
        <div className="field search-input" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Search by name, email, employee ID, or department"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <span className="cell-muted">
          {filtered.length} of {students.length} students
        </span>
      </div>

      {loading ? (
        <LoadingState label="Loading students…" />
      ) : students.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No students yet" message="Add your first student to start assigning training." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id}>
                  <td className="cell-primary">{student.full_name}</td>
                  <td className="cell-mono">{student.employee_id || "—"}</td>
                  <td>{student.department || "—"}</td>
                  <td className="cell-muted">{student.email}</td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(student)}
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                      title="Click to toggle status"
                    >
                      <StatusBadge value={student.status} />
                    </button>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingStudent(student);
                          setFormError("");
                          setModalMode("edit");
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => openAssign(student)}>
                        Assign training
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => setResetTarget(student)}>
                        Reset password
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(student)}>
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
          title={modalMode === "create" ? "Add student" : `Edit ${editingStudent?.full_name}`}
          onClose={() => {
            setModalMode(null);
            setEditingStudent(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setModalMode(null);
                  setEditingStudent(null);
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" form="student-form" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : modalMode === "create" ? "Add student" : "Save changes"}
              </button>
            </>
          }
        >
          {formError && <div className="banner banner-error">{formError}</div>}
          <StudentForm
            initial={modalMode === "edit" ? editingStudent : null}
            busy={saving}
            onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Remove student"
          message={`${deleteTarget.full_name} will be removed and unenrolled from all training programs. This can't be undone from here.`}
          confirmLabel="Remove student"
          danger
          busy={deleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {resetTarget && (
        <ConfirmDialog
          title="Reset password"
          message={`Generate a new temporary password for ${resetTarget.email}? You'll need to share it with them yourself.`}
          confirmLabel="Generate new password"
          busy={resetting}
          onConfirm={handleResetPassword}
          onClose={() => setResetTarget(null)}
        />
      )}

      {assignTarget && !assignLoading && (
        <AssignTrainingModal
          title={`Assign training — ${assignTarget.full_name}`}
          subtitle="Choose which training programs this student is enrolled in."
          options={trainings.map((t) => ({ id: t.id, label: t.title, sublabel: t.category }))}
          initialSelectedIds={assignSelectedIds}
          busy={assigning}
          onSubmit={handleAssignSubmit}
          onClose={() => setAssignTarget(null)}
        />
      )}

      {tempPasswordInfo && (
        <TempPasswordModal
          studentName={tempPasswordInfo.studentName}
          email={tempPasswordInfo.email}
          tempPassword={tempPasswordInfo.tempPassword}
          promoted={tempPasswordInfo.promoted}
          onClose={() => setTempPasswordInfo(null)}
        />
      )}
    </>
  );
}
