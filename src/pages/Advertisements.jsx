import { useEffect, useState } from "react";
import {
  getAllAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from "../api/advertisements";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import AdvertisementForm from "../components/AdvertisementForm";
import { IconPlus } from "../components/icons";

export default function Advertisements() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");

  const [modalMode, setModalMode] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllAdvertisements();
      setAds(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load advertisements."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const t = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(t);
  }, [toast]);

  const filtered = ads.filter((ad) => {
    const q = query.toLowerCase();

    return (
      ad.title?.toLowerCase().includes(q) ||
      ad.subtitle?.toLowerCase().includes(q)
    );
  });

  async function handleCreate(formData) {
    setSaving(true);
    setFormError("");

    try {
      await createAdvertisement(formData);

      setModalMode(null);

      setToast("Advertisement created.");

      load();
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(formData) {
    setSaving(true);
    setFormError("");

    try {
      await updateAdvertisement(editingAd.id, formData);

      setEditingAd(null);

      setModalMode(null);

      setToast("Advertisement updated.");

      load();
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      await deleteAdvertisement(deleteTarget.id);

      setDeleteTarget(null);

      setToast("Advertisement deleted.");

      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Landing Page</p>

          <h1>Advertisements</h1>

          <p className="subtitle">
            Manage landing page advertisements shown to visitors.
          </p>
        </div>

        <button
          className="btn btn-brass"
          onClick={() => {
            setModalMode("create");
            setFormError("");
          }}
        >
          <IconPlus width={15} height={15} />
          New Advertisement
        </button>
      </div>

      {toast && (
        <div className="banner banner-success">
          {toast}
        </div>
      )}

      <div className="toolbar">
        <div className="field search-input">
          <input
            placeholder="Search advertisements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <span className="cell-muted">
          {filtered.length} of {ads.length} advertisements
        </span>
      </div>

      {loading ? (
        <LoadingState label="Loading advertisements..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : ads.length === 0 ? (
        <div className="table-wrap">
          <EmptyState
            title="No advertisements found"
            message="Create your first advertisement."
          />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((ad) => (
                <tr key={ad.id}>

                  <td>

                    <img
                      src={ad.image_url}
                      alt={ad.title}
                      style={{
                        width: 120,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />

                  </td>

                  <td>

                    <div className="cell-primary">
                      {ad.title}
                    </div>

                    <div className="cell-muted">
                      {ad.subtitle}
                    </div>

                  </td>

                  <td>{ad.priority}</td>

                  <td>

                    <span
                      className={
                        ad.is_active
                          ? "badge badge-success"
                          : "badge badge-danger"
                      }
                    >
                      {ad.is_active ? "Active" : "Inactive"}
                    </span>

                  </td>

                  <td>

                    <div className="row-actions">

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingAd(ad);
                          setModalMode("edit");
                          setFormError("");
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteTarget(ad)}
                      >
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
          title={
            modalMode === "create"
              ? "New Advertisement"
              : `Edit "${editingAd?.title}"`
          }
          onClose={() => {
            setModalMode(null);
            setEditingAd(null);
          }}
          footer={
            <>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setModalMode(null);
                  setEditingAd(null);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="ad-form"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : modalMode === "create"
                  ? "Create Advertisement"
                  : "Save Changes"}
              </button>
            </>
          }
        >
          {formError && (
            <div className="banner banner-error">
              {formError}
            </div>
          )}

          <AdvertisementForm
            initial={editingAd}
            busy={saving}
            onSubmit={
              modalMode === "create"
                ? handleCreate
                : handleUpdate
            }
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Advertisement"
          message={`Delete "${deleteTarget.title}"? This action cannot be undone.`}
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