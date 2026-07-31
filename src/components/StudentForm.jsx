import { useState } from "react";

export default function StudentForm({ initial, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    full_name: initial?.full_name || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    employee_id: initial?.employee_id || "",
    department: initial?.department || "",
    status: initial?.status || "active",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form id="student-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="student-name">Full name</label>
        <input
          id="student-name"
          type="text"
          required
          value={form.full_name}
          onChange={(e) => update("full_name", e.target.value)}
          placeholder="Priya Ramesh"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="student-email">Email</label>
          <input
            id="student-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="priya@whycare.com"
          />
        </div>
        <div className="field">
          <label htmlFor="student-phone">Phone</label>
          <input
            id="student-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="98765 43210"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="student-employee-id">Employee ID</label>
          <input
            id="student-employee-id"
            type="text"
            value={form.employee_id}
            onChange={(e) => update("employee_id", e.target.value)}
            placeholder="WHY-1042"
          />
        </div>
        <div className="field">
          <label htmlFor="student-department">Department</label>
          <input
            id="student-department"
            type="text"
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            placeholder="Caregiver"
          />
        </div>
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="student-status">Status</label>
        <select id="student-status" value={form.status} onChange={(e) => update("status", e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {!initial && (
        <p className="hint" style={{ marginTop: 10 }}>
          A temporary password will be emailed to this address once added.
        </p>
      )}

      {onCancel && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : initial ? "Save changes" : "Add student"}
          </button>
        </div>
      )}
    </form>
  );
}
