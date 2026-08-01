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
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0D1B3E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Loading certificate…</p>
        </div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Certificate Unavailable</h2>
          <p className="text-gray-500 text-sm mb-6">{error || "Certificate record not found."}</p>
          <Link
            to="/learn"
            className="inline-block bg-[#0D1B3E] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#D4AF37] hover:text-[#0D1B3E] transition"
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
    <div className="min-h-screen bg-slate-200 py-10 px-4 print:bg-white print:py-0 print:px-0 flex flex-col items-center justify-center">
      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Alex+Brush&family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-script { font-family: 'Alex Brush', cursive; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .cert-container {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border-radius: 0 !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Top Action Bar (Hidden during print) */}
      <div className="max-w-4xl w-full mb-6 flex items-center justify-between no-print">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0D1B3E] text-sm font-semibold transition"
        >
          ← Back to My Learning
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-[#0D1B3E] hover:bg-[#162A5A] text-amber-300 font-bold px-6 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm border border-amber-400/30"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save as PDF
        </button>
      </div>

      {/* Printable Certificate Main Frame */}
      <div className="cert-container max-w-4xl w-full bg-[#FAF9F6] p-4 sm:p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden border-[10px] border-white text-slate-800 font-montserrat">
        
        {/* Top-Left Corner Navy & Gold Swash Decor */}
        <svg
          className="absolute top-0 left-0 w-44 sm:w-60 md:w-72 h-auto pointer-events-none z-10"
          viewBox="0 0 300 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dotPatternTL" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#D4AF37" opacity="0.6" />
            </pattern>
            <linearGradient id="goldGradTL" x1="0" y1="0" x2="260" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" />
              <stop offset="0.5" stopColor="#FFF2B2" />
              <stop offset="1" stopColor="#996515" />
            </linearGradient>
          </defs>
          {/* Gold Dots Pattern Background */}
          <path d="M0 0 H200 L0 180 Z" fill="url(#dotPatternTL)" />
          {/* Navy Base Swash */}
          <path d="M0 0 H260 C170 50 100 120 0 200 Z" fill="#081226" />
          {/* Gold Stripe Line */}
          <path d="M0 0 H240 C155 45 90 110 0 180 Z" fill="url(#goldGradTL)" />
          {/* Dark Navy Top Layer */}
          <path d="M0 0 H220 C140 40 80 100 0 160 Z" fill="#0D1B3E" />
        </svg>

        {/* Bottom-Right Corner Navy & Gold Swash Decor */}
        <svg
          className="absolute bottom-0 right-0 w-44 sm:w-60 md:w-72 h-auto pointer-events-none z-10"
          viewBox="0 0 300 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dotPatternBR" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#D4AF37" opacity="0.6" />
            </pattern>
            <linearGradient id="goldGradBR" x1="300" y1="220" x2="40" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" />
              <stop offset="0.5" stopColor="#FFF2B2" />
              <stop offset="1" stopColor="#996515" />
            </linearGradient>
          </defs>
          {/* Gold Dots Pattern Background */}
          <path d="M300 220 H100 L300 40 Z" fill="url(#dotPatternBR)" />
          {/* Navy Base Swash */}
          <path d="M300 220 H40 C130 170 200 100 300 20 Z" fill="#081226" />
          {/* Gold Stripe Line */}
          <path d="M300 220 H60 C145 175 210 110 300 40 Z" fill="url(#goldGradBR)" />
          {/* Dark Navy Inner Layer */}
          <path d="M300 220 H80 C160 180 220 120 300 60 Z" fill="#0D1B3E" />
        </svg>

        {/* Inner Border with Corner Flourishes */}
        <div className="relative border-2 border-amber-600/70 p-6 sm:p-10 md:p-12 bg-white/70 backdrop-blur-sm z-0">
          
          {/* Corner Flourish Accents */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600"></div>

          {/* Top Seal Badge */}
          <div className="flex flex-col items-center justify-center mb-3 relative z-10">
            <div className="relative flex items-center justify-center">
              {/* Dark Navy Ribbon Tails */}
              <div className="absolute -bottom-4 w-12 flex justify-between">
                <div className="w-4 h-8 bg-[#0D1B3E] transform -rotate-12 origin-top rounded-b shadow"></div>
                <div className="w-4 h-8 bg-[#0D1B3E] transform rotate-12 origin-top rounded-b shadow"></div>
              </div>
              {/* Serrated Gold Trophy Medallion */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#DAA520] p-1.5 shadow-lg flex items-center justify-center relative z-10">
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/50 bg-gradient-to-br from-[#0D1B3E] to-[#1C2541] flex flex-col items-center justify-center text-amber-300">
                  <div className="flex gap-0.5 text-[7px] text-amber-400 mb-0.5">★ ★ ★</div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H8v2h8v-2h-3v-2.1c2.14-.37 3.82-2.03 4.39-4.34C19.08 11.23 21 9.15 21 6.6V5c0-1.1-.9-2-2-2zM5 7.6V7h2v3.82C5.84 10.4 5 9.1 5 7.6zm14 0c0 1.5-.84 2.8-2 3.22V7h2v.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle Header */}
          <div className="text-center my-3">
            <div className="flex items-center justify-center gap-3 text-amber-700 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <span className="h-[1px] w-12 bg-amber-500/80"></span>
              <span>OFFICIAL CERTIFICATE OF COMPLETION</span>
              <span className="h-[1px] w-12 bg-amber-500/80"></span>
            </div>

            {/* Main Organization Title */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D1B3E] tracking-tight mt-1 mb-2">
              We Help You
            </h1>

            {/* Gold Ornamental Divider */}
            <div className="flex items-center justify-center gap-2 text-amber-600 my-1">
              <span className="h-[1px] w-16 bg-amber-400"></span>
              <span className="text-xs">◆ ❖ ◆</span>
              <span className="h-[1px] w-16 bg-amber-400"></span>
            </div>
          </div>

          {/* Recipient Section */}
          <div className="text-center my-4">
            <p className="text-slate-500 text-xs uppercase font-semibold tracking-wider">
              THIS IS TO CERTIFY THAT
            </p>
            
            {/* Student Name */}
            <div className="my-2 inline-block relative">
              <h2 className="font-script text-4xl sm:text-6xl md:text-7xl font-bold text-[#0D1B3E] px-6 py-1 drop-shadow-sm">
                {cert.student_name}
              </h2>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-1">
              has successfully completed all required modules, assessments, and lessons for the professional training course
            </p>

            {/* Course Title Banner */}
            <div className="mt-3 inline-block">
              <div className="bg-[#0D1B3E] text-amber-300 font-bold text-xs sm:text-sm px-6 sm:px-10 py-2 rounded-full border border-amber-400 shadow-md uppercase tracking-wider flex items-center justify-center gap-2">
                <span className="text-amber-400 text-xs">★</span>
                <span>{cert.course_title}</span>
                <span className="text-amber-400 text-xs">★</span>
              </div>
            </div>
          </div>

          {/* Footer Details: Date, Verification, Seal & Signature */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 mt-6 border-t border-amber-200/80 text-center sm:text-left relative z-20">
            
            {/* Left Metadata: Date Issued & Certificate Code */}
            <div className="flex items-center gap-6 justify-center sm:justify-start">
              {/* Date Issued */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center mb-1 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">DATE ISSUED</p>
                <p className="text-xs font-bold text-slate-900">{issueDate}</p>
                <div className="h-[2px] w-12 bg-amber-400/80 mt-1"></div>
              </div>

              {/* Certificate Code */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center mb-1 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">CERTIFICATE CODE</p>
                <p className="text-[11px] font-mono font-bold text-slate-900 tracking-tight">{cert.certificate_number}</p>
                <div className="h-[2px] w-12 bg-amber-400/80 mt-1"></div>
              </div>
            </div>

            {/* Center Circular Gold Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#DAA520] p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/60 bg-[#FAF9F6] p-1.5 flex flex-col items-center justify-center text-center">
                  <div className="flex gap-0.5 text-[7px] text-amber-700">★ ★ ★</div>
                  <p className="text-[7px] font-bold uppercase tracking-tighter text-amber-950 leading-tight my-0.5">
                    COMMITMENT<br />COMPASSION<br />CARE
                  </p>
                  <div className="flex gap-0.5 text-[7px] text-amber-700">★ ★ ★</div>
                </div>
              </div>
            </div>

            {/* Right Signature */}
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end justify-end">
              <div className="inline-block text-center min-w-[170px]">
                <p className="font-script text-2xl text-[#0D1B3E] font-bold mb-0.5 border-b-2 border-slate-400 pb-0.5">
                  We Help You Board
                </p>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                  AUTHORIZED SIGNATURE
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
