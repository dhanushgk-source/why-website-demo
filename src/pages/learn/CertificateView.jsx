import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCertificateById } from "../../services/certificateService";

export default function CertificateView() {
  const { certificateId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getCertificateById(certificateId);
        if (res.data?.success) {
          setCert(res.data.certificate);
        } else {
          setError("Certificate not found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load certificate details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2F4A7D] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading certificate…</p>
        </div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Certificate Unavailable</h2>
          <p className="text-gray-500 text-sm mb-6">{error || "Certificate record not found."}</p>
          <Link
            to="/learn"
            className="inline-block bg-[#2F4A7D] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#52B5BD] transition"
          >
            ← Return to Learning Portal
          </Link>
        </div>
      </div>
    );
  }

  const issueDate = cert.issued_at
    ? new Date(cert.issued_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Top Action Bar (Hidden during print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#2F4A7D] text-sm font-medium transition"
        >
          ← Back to My Learning
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-[#2F4A7D] hover:bg-[#52B5BD] text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-slate-200 transition flex items-center gap-2 text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save as PDF
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-2xl shadow-xl print:shadow-none print:max-w-none print:w-full print:rounded-none relative overflow-hidden border-8 border-slate-200 border-double">
        {/* Decorative Inner Border */}
        <div className="border-2 border-amber-300/80 p-8 md:p-12 relative bg-[#FAF9F6]">
          {/* Corner Flourishes */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <span className="text-3xl">🏆</span>
            </div>
            <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-1">
              Official Certificate of Completion
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2F4A7D] tracking-wide">
              WHY We Help
            </h1>
          </div>

          {/* Recipient Line */}
          <div className="text-center my-8">
            <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">This is to certify that</p>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 italic border-b-2 border-slate-300 inline-block pb-2 px-8">
              {cert.student_name}
            </h2>
          </div>

          {/* Achievement Description */}
          <div className="text-center max-w-xl mx-auto my-8 space-y-2">
            <p className="text-slate-600 text-base leading-relaxed">
              has successfully completed all required modules, assessments, and lessons for the professional training course
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-[#2F4A7D] uppercase tracking-wide pt-2">
              {cert.course_title}
            </h3>
          </div>

          {/* Footer Details & Signature */}
          <div className="grid grid-cols-2 gap-8 pt-10 mt-12 border-t border-slate-200 items-end">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider">Date Issued</p>
              <p className="text-slate-800 font-semibold text-sm mt-0.5">{issueDate}</p>
              <p className="text-slate-400 text-xs uppercase tracking-wider mt-3">Certificate Code</p>
              <p className="text-amber-900 font-mono font-bold text-xs mt-0.5">{cert.certificate_number}</p>
            </div>
            <div className="text-right">
              <div className="inline-block text-center">
                <p className="font-serif italic text-lg text-[#2F4A7D] font-bold mb-1 border-b border-slate-400 px-6 pb-1">
                  WHY Training Board
                </p>
                <p className="text-slate-400 text-xs uppercase tracking-wider">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
