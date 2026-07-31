import { useState } from "react";

const POSITIONS = ["left", "center", "right"];

export default function AdvertisementForm({
  initial,
  busy,
  onSubmit,
  onCancel,
}) {
  const [preview, setPreview] = useState(
    initial?.image_url || ""
  );

  const [form, setForm] = useState({
    title: initial?.title || "",
    subtitle: initial?.subtitle || "",
    description: initial?.description || "",
    button_text: initial?.button_text || "Learn More",
    button_link: initial?.button_link || "",
    background_color:
      initial?.background_color || "#ffffff",
    text_color: initial?.text_color || "#000000",
    position: initial?.position || "center",
    priority: initial?.priority || 1,
    is_active:
      initial?.is_active === undefined
        ? true
        : initial.is_active,
    start_date: initial?.start_date
      ? initial.start_date.slice(0, 16)
      : "",
    end_date: initial?.end_date
      ? initial.end_date.slice(0, 16)
      : "",
    image: null,
  });

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    update("image", file);

    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        formData.append(key, value);
      }
    });

    onSubmit(formData);
  }

  return (
    <form id="ad-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Advertisement Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 180,
              objectFit: "cover",
              borderRadius: 10,
              marginTop: 12,
            }}
          />
        )}
      </div>

      <div className="field">
        <label>Title</label>

        <input
          required
          value={form.title}
          onChange={(e) =>
            update("title", e.target.value)
          }
        />
      </div>

      <div className="field">
        <label>Subtitle</label>

        <input
          value={form.subtitle}
          onChange={(e) =>
            update("subtitle", e.target.value)
          }
        />
      </div>

      <div className="field">
        <label>Description</label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            update("description", e.target.value)
          }
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Button Text</label>

          <input
            value={form.button_text}
            onChange={(e) =>
              update(
                "button_text",
                e.target.value
              )
            }
          />
        </div>

        <div className="field">
          <label>Button Link</label>

          <input
            value={form.button_link}
            onChange={(e) =>
              update(
                "button_link",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Background Color</label>

          <input
            type="color"
            value={form.background_color}
            onChange={(e) =>
              update(
                "background_color",
                e.target.value
              )
            }
          />
        </div>

        <div className="field">
          <label>Text Color</label>

          <input
            type="color"
            value={form.text_color}
            onChange={(e) =>
              update(
                "text_color",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Position</label>

          <select
            value={form.position}
            onChange={(e) =>
              update("position", e.target.value)
            }
          >
            {POSITIONS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Priority</label>

          <input
            type="number"
            value={form.priority}
            onChange={(e) =>
              update(
                "priority",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Start Date</label>

          <input
            type="datetime-local"
            value={form.start_date}
            onChange={(e) =>
              update(
                "start_date",
                e.target.value
              )
            }
          />
        </div>

        <div className="field">
          <label>End Date</label>

          <input
            type="datetime-local"
            value={form.end_date}
            onChange={(e) =>
              update(
                "end_date",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div
        className="field"
        style={{ marginBottom: 0 }}
      >
        <label>
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              update(
                "is_active",
                e.target.checked
              )
            }
          />

          {" "}Active Advertisement
        </label>
      </div>

      {onCancel && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 20,
          }}
        >
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={busy}
          >
            {busy
              ? "Saving..."
              : initial
              ? "Save Changes"
              : "Create Advertisement"}
          </button>
        </div>
      )}
    </form>
  );
}