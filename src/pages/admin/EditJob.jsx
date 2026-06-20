import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getJobById } from "../../services/jobService";
import { updateJob } from "../../services/adminService";

const fields = [
  { name: "title", label: "Job Title", placeholder: "e.g. Frontend Developer" },
  { name: "department", label: "Department", placeholder: "e.g. Engineering" },
  { name: "location", label: "Location", placeholder: "e.g. Chennai / Remote" },
  { name: "experience", label: "Experience", placeholder: "e.g. 2–4 Years" },
  { name: "salary", label: "Salary", placeholder: "e.g. ₹8–12 LPA" },
];

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", department: "", location: "", employment_type: "", experience: "", salary: "", description: "", requirements: "" });

  useEffect(() => { loadJob(); }, []);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);
      setForm({ title: data.job.title || "", department: data.job.department || "", location: data.job.location || "", employment_type: data.job.employment_type || "", experience: data.job.experience || "", salary: data.job.salary || "", description: data.job.description || "", requirements: data.job.requirements || "" });
    } catch {
      setError("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      await updateJob(id, form);
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#52B5BD] focus:ring-2 focus:ring-[#52B5BD]/20 transition";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 rounded-full border-4 border-[#52B5BD] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9fa] to-white">
      <div className="bg-[#2F4A7D] py-12 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/admin/jobs" className="text-white/60 hover:text-white transition-colors text-sm">← Back</Link>
          <h1 className="text-3xl font-bold text-white">Edit Job</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input type="text" name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className={inputClass} />
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
              <textarea rows="5" name="description" value={form.description} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements</label>
              <textarea rows="5" name="requirements" value={form.requirements} onChange={handleChange} className={inputClass} />
            </div>
            <button type="submit" disabled={saving} className="w-full bg-[#2F4A7D] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
              {saving ? (<><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Saving…</>) : "Update Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
