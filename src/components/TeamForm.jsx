import { useRef, useState } from "react";

export default function TeamForm({ initial, busy, onSubmit }) {
  const [name, setName] = useState(initial?.name || "");
  const [designation, setDesignation] = useState(initial?.designation || "");
  const [department, setDepartment] = useState(initial?.department || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [biography, setBiography] = useState(initial?.biography || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image_url || "");

  const fileInput = useRef(null);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("department", department);
    formData.append("location", location);
    formData.append("biography", biography);

    if (file) {
      formData.append("image", file);
    }

    onSubmit(formData, !initial && !file);
  }

  return (
    <form id="team-form" onSubmit={handleSubmit}>
      {/* Profile Photo */}
      <div className="field">
        <label>
          Photo{" "}
          {!initial && (
            <span style={{ color: "var(--clay)" }}>*</span>
          )}
        </label>

        <div className="flex items-center gap-12">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="avatar"
              style={{
                width: 56,
                height: 56,
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              className="avatar"
              style={{
                width: 56,
                height: 56,
              }}
            />
          )}

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => fileInput.current?.click()}
          >
            {preview ? "Change Photo" : "Upload Photo"}
          </button>

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </div>

        {!initial && (
          <div
            className="hint"
            style={{ marginTop: 6 }}
          >
            A profile photo is required for new team members.
          </div>
        )}
      </div>

      {/* Name */}
      <div className="field">
        <label htmlFor="team-name">
          Full Name
        </label>

        <input
          id="team-name"
          type="text"
          required
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Dr. John Doe"
        />
      </div>

      {/* Designation & Department */}
      <div className="field-row">
        <div className="field">
          <label htmlFor="team-designation">
            Designation
          </label>

          <input
            id="team-designation"
            type="text"
            required
            value={designation}
            onChange={(e) =>
              setDesignation(e.target.value)
            }
            placeholder="Senior Cardiologist"
          />
        </div>

        <div className="field">
          <label htmlFor="team-department">
            Department
          </label>

          <input
            id="team-department"
            type="text"
            required
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            placeholder="Cardiology"
          />
        </div>
      </div>

      {/* Location */}
      <div className="field">
        <label htmlFor="team-location">
          Location
        </label>

        <input
          id="team-location"
          type="text"
          required
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="Bengaluru"
        />
      </div>

      {/* Biography */}
      <div
        className="field"
        style={{ marginBottom: 0 }}
      >
        <label htmlFor="team-biography">
          Biography
        </label>

        <textarea
          id="team-biography"
          required
          rows={6}
          value={biography}
          onChange={(e) =>
            setBiography(e.target.value)
          }
          placeholder="Write a short biography about the team member..."
        />
      </div>

      {/* Submit */}
      <div
        className="flex justify-end"
        style={{ marginTop: "24px" }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          disabled={busy}
        >
          {busy
            ? "Saving..."
            : initial
            ? "Update Team Member"
            : "Add Team Member"}
        </button>
      </div>
    </form>
  );
}