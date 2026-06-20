import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createJob } from "../../services/adminService";

const fields = [
  { name: "title", label: "Job Title", placeholder: "e.g. Frontend Developer", required: true },
  { name: "department", label: "Department", placeholder: "e.g. Engineering" },
  { name: "location", label: "Location", placeholder: "e.g. Chennai / Remote" },
  { name: "experience", label: "Experience", placeholder: "e.g. 2–4 Years" },
  { name: "salary", label: "Salary", placeholder: "e.g. ₹8–12 LPA" },
];

export default function CreateJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", department: "", location: "", employment_type: "", experience: "", salary: "", description: "", requirements: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await createJob(form);
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#52B5BD] focus:ring-2 focus:ring-[#52B5BD]/20 transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9fa] to-white">
      <div className="bg-[#2F4A7D] py-12 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/admin/jobs" className="text-white/60 hover:text-white transition-colors text-sm">← Back</Link>
          <h1 className="text-3xl font-bold text-white">Create Job</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ name, label, placeholder, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
                <input type="text" name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} required={required} className={inputClass} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type</label>
              <select name="employment_type" value={form.employment_type} onChange={handleChange} className={inputClass}>
                <option value="">Select type</option>
                {["Full Time","Part Time","Contract","Internship"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description</label>
              <textarea rows="5" name="description" value={form.description} onChange={handleChange} placeholder="Describe the role, responsibilities…" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements</label>
              <textarea rows="5" name="requirements" value={form.requirements} onChange={handleChange} placeholder="List skills, qualifications…" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#2F4A7D] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (<><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Creating…</>) : "Create Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
