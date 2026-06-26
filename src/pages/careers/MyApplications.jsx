import { useEffect, useState } from "react";
import { MapPin, Inbox } from "lucide-react";
import API from "../../services/api";

const statusConfig = {
  Pending: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-400" },
  Shortlisted: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  Selected: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Rejected: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
};

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/applications/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

      {/* Header */}
      <div className="bg-[#2F4A7D] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Applications</h1>
          <p className="text-white/70 mt-2">Track the status of your job applications</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {applications.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="flex justify-center mb-4">
              <Inbox size={52} strokeWidth={1.5} className="text-gray-300" />
            </div>
            <p className="text-xl font-medium text-gray-600">No applications yet</p>
            <p className="text-sm mt-2">Start applying to open positions!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const sc = statusConfig[app.status] || statusConfig.Pending;
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2F4A7D]">{app.title}</h2>
                      {app.location && (
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                          <MapPin size={13} /> {app.location}
                        </p>
                      )}
                    </div>
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${sc.bg} ${sc.text}`}>
                      <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}