import { useEffect, useState } from "react";
import {
  getApplications,
  updateApplicationStatus,
} from "../../services/adminService";
import { FiChevronRight } from "react-icons/fi";

const statusConfig = {
  Pending:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  Shortlisted:
    "bg-blue-50 text-blue-700 border-blue-200",
  Selected:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected:
    "bg-red-50 text-red-700 border-red-200",
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openJob, setOpenJob] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data.applications || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      await updateApplicationStatus(
        applicationId,
        status
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const groupedApplications =
    applications.reduce((acc, app) => {
      const jobTitle =
        app.title || "Untitled Job";

      if (!acc[jobTitle]) {
        acc[jobTitle] = [];
      }

      acc[jobTitle].push(app);

      return acc;
    }, {});

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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            Applications
          </h1>

          <p className="text-white/70 mt-2">
            {applications.length} total
            application
            {applications.length !== 1
              ? "s"
              : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
            <div className="text-4xl mb-4">
              📭
            </div>

            <p className="text-gray-500 font-medium">
              No applications found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(
              groupedApplications
            ).map(([jobTitle, apps]) => {
              const isOpen =
                openJob === jobTitle;

              const pending =
                apps.filter(
                  (a) =>
                    a.status === "Pending"
                ).length;

              const shortlisted =
                apps.filter(
                  (a) =>
                    a.status ===
                    "Shortlisted"
                ).length;

              const selected =
                apps.filter(
                  (a) =>
                    a.status === "Selected"
                ).length;

              const rejected =
                apps.filter(
                  (a) =>
                    a.status === "Rejected"
                ).length;

              return (
                <div
                  key={jobTitle}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() =>
                      setOpenJob(
                        isOpen
                          ? null
                          : jobTitle
                      )
                    }
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-[#2F4A7D]">
                        {jobTitle}
                      </h2>

                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                        <span>
                          Total: {apps.length}
                        </span>

                        <span>
                          Pending: {pending}
                        </span>

                        <span>
                          Shortlisted:{" "}
                          {shortlisted}
                        </span>

                        <span>
                          Selected:{" "}
                          {selected}
                        </span>

                        <span>
                          Rejected:{" "}
                          {rejected}
                        </span>
                      </div>
                    </div>

                    <FiChevronRight
                      size={22}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                        }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="border-t overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Name
                            </th>

                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Email
                            </th>

                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Resume
                            </th>

                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {apps.map((app) => (
                            <tr
                              key={app.id}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="px-4 py-4">
                                {
                                  app.full_name
                                }
                              </td>

                              <td className="px-4 py-4">
                                {app.email}
                              </td>

                              <td className="px-4 py-4">
                                <a
                                  href={
                                    app.resume_url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#52B5BD] hover:underline"
                                >
                                  View Resume
                                </a>
                              </td>

                              <td className="px-4 py-4">
                                <select
                                  value={
                                    app.status
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    handleStatusChange(
                                      app.id,
                                      e.target
                                        .value
                                    )
                                  }
                                  className={`px-3 py-2 rounded-lg border text-sm font-medium ${statusConfig[app.status]}`}
                                >
                                  <option value="Pending">
                                    Pending
                                  </option>

                                  <option value="Shortlisted">
                                    Shortlisted
                                  </option>

                                  <option value="Selected">
                                    Selected
                                  </option>

                                  <option value="Rejected">
                                    Rejected
                                  </option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}