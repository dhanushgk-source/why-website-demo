import { useState } from "react";

export default function ModuleForm({ initial, busy, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description });
  }

  return (
    <form id="module-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="module-title">Module title</label>
        <input
          id="module-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Introduction"
        />
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="module-description">Description</label>
        <textarea
          id="module-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What this module covers…"
        />
      </div>

      {onCancel && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : initial ? "Save changes" : "Add module"}
          </button>
        </div>
      )}
    </form>
  );
}
