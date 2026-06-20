import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobById, applyJob } from "../../services/jobService";
import { useAuth } from "../../contexts/AuthContext";
import { uploadResume } from "../../services/uploadService";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { fetchJob(); }, []);

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data.job);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/careers/login");
      return;
    }

    if (!resume) {
      setError("Please upload your resume (PDF).");
      return;
    }

    setError("");
    setSuccess("");

    try {
      setApplying(true);

      const uploadResponse = await uploadResume(
        resume,
        job.title,
        job.id
      );

      const resumeUrl = uploadResponse.url;

      const token = localStorage.getItem("token");

      const applyResponse = await applyJob(
        job.id,
        resumeUrl,
        token
      );

      setSuccess(
        applyResponse.message ||
        "Application submitted successfully!"
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Application failed. Please try again."
      );

    } finally {

      setApplying(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-[#52B5BD] border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading job…</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-2xl font-bold text-[#2F4A7D]">Job not found</p>
        <Link to="/careers/jobs" className="text-[#52B5BD] hover:underline">← Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9fa] to-white">
      {/* Header */}
      <div className="bg-[#2F4A7D] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/careers/jobs" className="text-white/60 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors">
            ← Back to Jobs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-3">
            {job.location && <span className="bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm">📍 {job.location}</span>}
            {job.employment_type && <span className="bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm">💼 {job.employment_type}</span>}
            {job.experience && <span className="bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm">🧑‍💻 {job.experience}</span>}
            {job.salary && <span className="bg-[#52B5BD]/40 text-white px-4 py-1.5 rounded-full text-sm font-semibold">💰 {job.salary}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {job.description && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#2F4A7D] mb-4">About the Role</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
          )}
          {job.requirements && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#2F4A7D] mb-4">Requirements</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.requirements}</p>
            </div>
          )}
        </div>

        {/* Apply sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-[#2F4A7D] mb-4">Apply Now</h3>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-4 rounded-xl text-center">
                ✅ {success}
              </div>
            ) : (
              <>
                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => { setResume(e.target.files[0]); setError(""); }}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EAF6F7] file:text-[#2F4A7D] hover:file:bg-[#52B5BD] hover:file:text-white file:transition-colors"
                  />
                  {resume && <p className="text-xs text-emerald-600 mt-2">📄 {resume.name}</p>}
                </div>
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full bg-[#2F4A7D] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {applying ? (<><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Submitting…</>) : "Submit Application"}
                </button>
                {!isAuthenticated && (
                  <p className="text-xs text-gray-400 text-center mt-3">You'll need to <Link to="/careers/login" className="text-[#52B5BD] font-medium hover:underline">sign in</Link> to apply.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
