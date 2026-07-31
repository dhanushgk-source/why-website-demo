import { useEffect, useState } from "react";
import Modal from "./Modal";

// options: [{ id, label, sublabel }]
export default function AssignTrainingModal({ title, subtitle, options, initialSelectedIds, busy, onSubmit, onClose }) {
  const [selected, setSelected] = useState(new Set(initialSelectedIds || []));
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSelected(new Set(initialSelectedIds || []));
  }, [initialSelectedIds]);

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = options.filter((o) => {
    const q = query.toLowerCase();
    return o.label.toLowerCase().includes(q) || o.sublabel?.toLowerCase().includes(q);
  });

  return (
    <Modal
      title={title}
      onClose={onClose}
      width={480}
      footer={
        <>
          <button className="btn btn-outline" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => onSubmit(Array.from(selected))} disabled={busy}>
            {busy ? "Saving…" : "Save assignments"}
          </button>
        </>
      }
    >
      {subtitle && <p style={{ marginTop: 0, color: "var(--text-muted)" }}>{subtitle}</p>}

      <div className="field search-input" style={{ marginBottom: 14 }}>
        <input type="text" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {options.length === 0 ? (
        <p className="cell-muted">Nothing to assign yet.</p>
      ) : (
        <div style={{ maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {filtered.length === 0 && <p className="cell-muted">No matches.</p>}
          {filtered.map((o) => (
            <label
              key={o.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                background: selected.has(o.id) ? "var(--brass-tint)" : "transparent",
                border: "1px solid",
                borderColor: selected.has(o.id) ? "var(--brass)" : "transparent",
              }}
            >
              <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggle(o.id)} />
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span className="cell-primary">{o.label}</span>
                {o.sublabel && (
                  <span className="cell-muted" style={{ fontSize: 12 }}>
                    {o.sublabel}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      )}

      <p className="cell-muted" style={{ marginTop: 12, marginBottom: 0 }}>
        {selected.size} selected
      </p>
    </Modal>
  );
}
