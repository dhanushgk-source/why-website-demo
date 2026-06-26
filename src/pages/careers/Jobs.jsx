import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock3,
  IndianRupee,
  BriefcaseBusiness,
  ArrowRight,
  SearchX,
} from "lucide-react";
import { getAllJobs } from "../../services/jobService";

const typeColors = {
  "Full Time": "bg-emerald-50 text-emerald-700",
  "Part Time": "bg-blue-50 text-blue-700",
  Contract: "bg-orange-50 text-orange-700",
  Internship: "bg-purple-50 text-purple-700",
};

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-[#52B5BD] border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading Jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9fa] to-white">
      {/* Hero */}
      <div className="bg-[#2F4A7D] py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Open Positions
        </h1>

        <p className="text-white/70 text-lg">
          Find your place at WHY
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <SearchX
              size={60}
              className="mx-auto text-gray-300 mb-5"
            />

            <p className="text-2xl font-semibold text-gray-700">
              No open positions right now
            </p>

            <p className="text-gray-500 mt-2">
              Check back soon — we're growing fast!
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#52B5BD]/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#2F4A7D] group-hover:text-[#52B5BD] transition-colors mb-3">
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">

                      <div className="flex items-center gap-1.5">
                        <MapPin
                          size={16}
                          className="text-[#52B5BD]"
                        />
                        {job.location}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock3
                          size={16}
                          className="text-[#52B5BD]"
                        />
                        {job.experience}
                      </div>

                      {job.salary && (
                        <div className="flex items-center gap-1.5">
                          <IndianRupee
                            size={16}
                            className="text-[#52B5BD]"
                          />
                          {job.salary}
                        </div>
                      )}
                    </div>

                    {job.employment_type && (
                      <span
                        className={`inline-flex items-center gap-2 mt-4 text-xs font-semibold px-3 py-1 rounded-full ${
                          typeColors[job.employment_type] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <BriefcaseBusiness size={14} />
                        {job.employment_type}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/careers/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 shrink-0 bg-[#2F4A7D] hover:bg-[#52B5BD] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    View Details

                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}