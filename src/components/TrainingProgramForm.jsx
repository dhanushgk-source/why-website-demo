import { useState } from "react";

const STATUSES = ["draft", "published"];

export default function TrainingProgramForm({ initial, busy, onSubmit, onCancel }) {
  const [preview, setPreview] = useState(initial?.thumbnail_url || "");

  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "",
    duration: initial?.duration || "",
    status: initial?.status || STATUSES[0],
    description: initial?.description || "",
    thumbnail: null,
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleThumbnail(e) {
    const file = e.target.files[0];
    if (!file) return;
    update("thumbnail", file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });
    onSubmit(formData);
  }

  return (
    <form id="training-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="training-thumbnail">Thumbnail</label>
        <input id="training-thumbnail" type="file" accept="image/*" onChange={handleThumbnail} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 10, marginTop: 12 }}
          />
        )}
      </div>

      <div className="field">
        <label htmlFor="training-title">Title</label>
        <input
          id="training-title"
          type="text"
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Customer Support Onboarding"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="training-category">Category</label>
          <input
            id="training-category"
            type="text"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            placeholder="Caregiver"
          />
        </div>
        <div className="field">
          <label htmlFor="training-duration">Duration (hrs)</label>
          <input
            id="training-duration"
            type="number"
            min="0"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="4"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="training-status">Status</label>
        <select id="training-status" value={form.status} onChange={(e) => update("status", e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="training-description">Description</label>
        <textarea
          id="training-description"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What this training covers…"
        />
      </div>

      {onCancel && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : initial ? "Save changes" : "Create training"}
          </button>
        </div>
      )}
    </form>
  );
}
