import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../services/jobService"; // Update the path if needed

const deptColor = {
  Engineering: "bg-blue-50 text-blue-600",
  Design: "bg-purple-50 text-purple-600",
  Marketing: "bg-orange-50 text-orange-600",
  Operational: "bg-teal-50 text-[#52B5BD]",
  Operations: "bg-teal-50 text-[#52B5BD]",
};

export default function OpenPositionsPreview() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();

      if (response.success) {
        setJobs(response.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#52B5BD] text-sm font-semibold tracking-widest uppercase">
            Now Hiring
          </span>

          <h2 className="text-[#2F4A7D] font-bold mt-3 mb-4 text-3xl md:text-4xl">
            Current Open Positions
          </h2>

          <p className="text-gray-500 max-w-lg mx-auto">
            Explore roles across engineering, design, marketing, and operations
            — and find where you fit in the WHY story.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading open positions...
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No open positions available.
          </div>
        ) : (
          <>
            {/* Job List */}
            <div className="flex flex-col gap-4">
              {jobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-2xl p-6 hover:border-[#52B5BD]/50 hover:shadow-md transition-all duration-300"
                >
                  {/* Left */}
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Department Badge */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                        deptColor[job.department] ||
                        "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {job.department}
                    </span>

                    {/* Job Details */}
                    <div>
                      <h3 className="text-[#2F4A7D] font-semibold text-base group-hover:text-[#52B5BD] transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap gap-3 mt-2 text-gray-400 text-xs">
                        {/* Location */}
                        <span className="flex items-center gap-1">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>

                          {job.location}
                        </span>

                        {/* Employment Type */}
                        <span>{job.employment_type}</span>

                        {/* Experience */}
                        <span>{job.experience}</span>

                        {/* Salary */}
                        {job.salary && (
                          <span className="font-semibold text-[#52B5BD]">
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <button
                    onClick={() => navigate(`/careers/jobs/${job.id}`)}
                    className="shrink-0 border border-[#52B5BD] text-[#52B5BD] hover:bg-[#52B5BD] hover:text-white font-medium text-sm px-5 py-2 rounded-full transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* View All */}
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/careers/jobs")}
                className="inline-flex items-center gap-2 text-[#2F4A7D] font-semibold hover:text-[#52B5BD] transition-colors group"
              >
                View All Jobs

                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}