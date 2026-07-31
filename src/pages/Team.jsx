import { useEffect, useState } from "react";
import { getAllTeam, createTeamMember, updateTeamMember, deleteTeamMember } from "../api/team";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import TeamForm from "../components/TeamForm";
import { IconPlus } from "../components/icons";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalMode, setModalMode] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllTeam();
      setTeam(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load the team roster."));
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

  async function handleCreate(formData, missingImage) {
    if (missingImage) {
      setFormError("Please upload a profile photo.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await createTeamMember(formData);
      setModalMode(null);
      setToast("Team member added.");
      load();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Couldn't add this team member."));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(formData) {
    setSaving(true);
    setFormError("");
    try {
      await updateTeamMember(editingMember.id, formData);
      setModalMode(null);
      setEditingMember(null);
      setToast("Team member updated.");
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
      await deleteTeamMember(deleteTarget.id);
      setDeleteTarget(null);
      setToast("Team member removed.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this team member."));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Organization</p>
          <h1>Care team</h1>
          <p className="subtitle">Manage the roster shown on the public "Our Team" page.</p>
        </div>
        <button
          className="btn btn-brass"
          onClick={() => {
            setFormError("");
            setModalMode("create");
          }}
        >
          <IconPlus width={15} height={15} />
          Add team member
        </button>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}
      {error && <div className="banner banner-error">{error}</div>}

      {loading ? (
        <LoadingState label="Loading team roster…" />
      ) : team.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No team members yet" message="Add your first team member to show them on the public site." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Designation</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="flex items-center gap-12">
                      <img src={member.image_url} alt={member.name} className="avatar" />
                      <span className="cell-primary">{member.name}</span>
                    </div>
                  </td>
                  <td>{member.designation || "—"}</td>
                  <td className="cell-muted">{member.department || "—"}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingMember(member);
                          setFormError("");
                          setModalMode("edit");
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(member)}>
                        Delete
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
          title={modalMode === "create" ? "Add team member" : `Edit ${editingMember?.name}`}
          onClose={() => {
            setModalMode(null);
            setEditingMember(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setModalMode(null);
                  setEditingMember(null);
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" form="team-form" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : modalMode === "create" ? "Add member" : "Save changes"}
              </button>
            </>
          }
        >
          {formError && <div className="banner banner-error">{formError}</div>}
          <TeamForm initial={modalMode === "edit" ? editingMember : null} busy={saving} onSubmit={modalMode === "create" ? handleCreate : handleUpdate} />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete team member"
          message={`${deleteTarget.name} will be permanently removed from the roster and their photo deleted.`}
          confirmLabel="Delete"
          danger
          busy={deleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
