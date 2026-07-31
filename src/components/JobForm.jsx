import { useState } from "react";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time","Internship", "Contract", "Temporary"];

export default function JobForm({ initial, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    department: initial?.department || "",
    location: initial?.location || "",
    employment_type: initial?.employment_type || EMPLOYMENT_TYPES[0],
    experience: initial?.experience || "",
    salary: initial?.salary || "",
    description: initial?.description || "",
    requirements: initial?.requirements || "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form id="job-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="job-title">Job title</label>
        <input
          id="job-title"
          type="text"
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Home Health Aide"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="job-department">Department</label>
          <input
            id="job-department"
            type="text"
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            placeholder="Home Care Services"
          />
        </div>
        <div className="field">
          <label htmlFor="job-location">Location</label>
          <input
            id="job-location"
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Madurai, TN"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="job-type">Employment type</label>
          <select id="job-type" value={form.employment_type} onChange={(e) => update("employment_type", e.target.value)}>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="job-experience">Experience</label>
          <input
            id="job-experience"
            type="text"
            value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
            placeholder="2+ years"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="job-salary">Salary</label>
        <input
          id="job-salary"
          type="text"
          value={form.salary}
          onChange={(e) => update("salary", e.target.value)}
          placeholder="₹18,000 – ₹25,000 / month"
        />
      </div>

      <div className="field">
        <label htmlFor="job-description">Description</label>
        <textarea
          id="job-description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What this role covers day to day…"
        />
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="job-requirements">Requirements</label>
        <textarea
          id="job-requirements"
          value={form.requirements}
          onChange={(e) => update("requirements", e.target.value)}
          placeholder="Certifications, skills, and qualities needed…"
        />
      </div>

      {onCancel && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : initial ? "Save changes" : "Create job"}
          </button>
        </div>
      )}
    </form>
  );
}
