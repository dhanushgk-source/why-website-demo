import { useState } from "react";
import Modal from "./Modal";

export default function TempPasswordModal({ studentName, email, tempPassword, promoted, onClose }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(tempPassword).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Modal
      title="Share these login details"
      onClose={onClose}
      width={440}
      footer={
        <button className="btn btn-primary" onClick={onClose}>
          Done
        </button>
      }
    >
      {promoted && (
        <div className="banner banner-success" style={{ marginBottom: 12 }}>
          This email already had an account on the site — it's now linked as a student.
        </div>
      )}

      <p style={{ marginTop: 0, color: "var(--text-muted)" }}>
        Automatic emails aren't set up yet, so send <strong>{studentName}</strong> this password yourself. It won't be
        shown again.
      </p>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "12px 14px",
          marginTop: 14,
        }}
      >
        <p className="cell-muted" style={{ margin: 0, fontSize: 12 }}>
          Email
        </p>
        <p className="cell-primary" style={{ margin: "2px 0 12px" }}>
          {email}
        </p>

        <p className="cell-muted" style={{ margin: 0, fontSize: 12 }}>
          Temporary password
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <code
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 0.5,
              background: "var(--brass-tint)",
              padding: "6px 10px",
              borderRadius: 6,
            }}
          >
            {tempPassword}
          </code>
          <button className="btn btn-outline btn-sm" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
