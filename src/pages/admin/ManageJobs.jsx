import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteJob } from "../../services/adminService";
import { getAllJobs } from "../../services/jobService";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setDeletingId(jobId);
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

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
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Jobs</h1>
            <p className="text-white/70 mt-1">{jobs.length} position{jobs.length !== 1 ? "s" : ""} listed</p>
          </div>
          <Link to="/admin/jobs/create" className="bg-[#52B5BD] hover:bg-[#2DD4BF] text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg">
            + Create Job
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">No jobs yet. Create your first posting!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#2F4A7D]">{job.title}</h2>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                      {job.location && <span>📍 {job.location}</span>}
                      {job.employment_type && <span>💼 {job.employment_type}</span>}
                      {job.experience && <span>🧑‍💻 {job.experience}</span>}
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Link to={`/admin/jobs/edit/${job.id}`} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-200 text-sm">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={deletingId === job.id}
                      className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-200 text-sm"
                    >
                      {deletingId === job.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
