import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getCertificateById } from "../../services/certificateService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificateView() {
  const { certificateId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const certRef = useRef(null);

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

  const captureCanvas = async () => {
    const element = certRef.current;
    if (!element) return null;

    // Ensure all web fonts are loaded in memory
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 350));

    return await html2canvas(element, {
      scale: 3, // Ultra HD quality
      useCORS: true,
      backgroundColor: "#FAF8F3",
      logging: false,
      allowTaint: true,
    });
  };

  const handleDownloadPDF = async () => {
    if (!certRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      const filename = `Certificate-${(cert?.student_name || "Student").replace(/\s+/g, "_")}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF Download failed:", err);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (!certRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = `Certificate-${(cert?.student_name || "Student").replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("PNG Download failed:", err);
      alert("Failed to download PNG image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#16233B] border-t-transparent rounded-full animate-spin"></div>
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
            className="inline-block bg-[#16233B] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#C5A059] transition"
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
    <div className="min-h-screen bg-slate-200 py-10 px-4 flex flex-col items-center justify-center">
      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Alex+Brush&family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-script { font-family: 'Alex Brush', cursive; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Top Action Bar — Straight Download Options Only (No Print) */}
      <div className="max-w-[1050px] w-full mb-6 flex items-center justify-between">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-[#16233B] text-sm font-semibold transition"
        >
          ← Back to My Learning
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="bg-white hover:bg-slate-50 text-[#16233B] font-bold px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm border border-slate-300 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Image (PNG)
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="bg-[#16233B] hover:bg-[#203050] text-[#E8C580] font-bold px-6 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm border border-amber-400/30 disabled:opacity-60"
          >
            {downloading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF (A4 Landscape)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Certificate Frame (Fixed A4 Landscape Proportions: 1050px x 742px) */}
      <div
        id="certificate-element"
        ref={certRef}
        className="max-w-[1050px] w-full aspect-[1.414/1] bg-[#FAF8F3] p-4 sm:p-6 md:p-8 rounded-none shadow-2xl relative overflow-hidden border border-[#2C3B59]/30 text-slate-800 font-montserrat flex flex-col justify-between"
        style={{ boxSizing: "border-box" }}
      >
        
        {/* Top-Left Corner SVG Swash */}
        <svg
          className="absolute top-0 left-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 pointer-events-none z-10"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Main Dark Navy Triangle */}
          <polygon points="0,0 200,0 0,200" fill="#16233B" />
          {/* Gold Edge Stripe Line */}
          <polygon points="188,0 200,0 0,200 0,188" fill="#C5A059" />
        </svg>

        {/* Bottom-Right Corner SVG Swash */}
        <svg
          className="absolute bottom-0 right-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 pointer-events-none z-10"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Main Dark Navy Triangle */}
          <polygon points="200,0 200,200 0,200" fill="#16233B" />
          {/* Gold Edge Stripe Line */}
          <polygon points="200,12 200,0 0,200 12,200" fill="#C5A059" />
        </svg>

        {/* Outer Fine Margin Area */}
        <div className="relative border border-slate-300 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between z-0">
          
          {/* Inner Thin Gold Double Border */}
          <div className="absolute inset-2 sm:inset-3 border border-[#C5A059]/70 pointer-events-none z-0"></div>

          {/* Four Sharp L-Shaped Corner Bracket Accents */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-[1.5px] border-l-[1.5px] border-[#C5A059] pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-7 h-7 border-t-[1.5px] border-r-[1.5px] border-[#C5A059] pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-[1.5px] border-l-[1.5px] border-[#C5A059] pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[1.5px] border-r-[1.5px] border-[#C5A059] pointer-events-none"></div>

          {/* Top Wreath & Mortarboard Emblem */}
          <div className="flex flex-col items-center justify-center pt-2 sm:pt-3 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#C5A059]/60 flex items-center justify-center p-1 relative">
              {/* Gold Circular Ring Accent */}
              <svg className="absolute inset-0 w-full h-full text-[#C5A059]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" stroke="#C5A059" strokeWidth="1" />
              </svg>
              {/* Graduation Cap Mortarboard Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F3] border border-[#C5A059] flex items-center justify-center text-[#16233B] shadow-sm relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4.02c0 2.5 3.13 4.8 7 4.8s7-2.3 7-4.8v-4.02l-7 3.82-7-3.82z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subtitle Header & Main Title */}
          <div className="text-center flex flex-col items-center my-1 relative z-10">
            <div className="flex items-center justify-center gap-3 text-slate-600 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em]">
              <span className="h-[1px] w-12 sm:w-16 bg-[#C5A059]/70"></span>
              <span className="flex items-center gap-1.5">
                <span className="text-[8px] text-[#C5A059]">◆</span>
                <span>CERTIFICATE OF COMPLETION</span>
                <span className="text-[8px] text-[#C5A059]">◆</span>
              </span>
              <span className="h-[1px] w-12 sm:w-16 bg-[#C5A059]/70"></span>
            </div>

            {/* Main Organization Title */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-[#16233B] tracking-tight mt-3 mb-2 leading-none">
              We Help You
            </h1>

            {/* Gold Ornamental SVG Line with Center Dot — Guaranteed Zero Overlay */}
            <svg className="w-full max-w-[280px] h-[8px] mx-auto my-2" viewBox="0 0 280 8" fill="none">
              <line x1="0" y1="4" x2="120" y2="4" stroke="#C5A059" strokeWidth="1.5" />
              <circle cx="140" cy="4" r="3.5" fill="#C5A059" />
              <line x1="160" y1="4" x2="280" y2="4" stroke="#C5A059" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Recipient Section */}
          <div className="text-center flex flex-col items-center my-2 relative z-10">
            <p className="text-slate-500 text-[11px] sm:text-xs uppercase font-semibold tracking-[0.2em] mb-1">
              THIS IS TO CERTIFY THAT
            </p>
            
            {/* Student Name & SVG Underline Line — 100% Vector Positioning Below Text */}
            <div className="my-2 flex flex-col items-center">
              <h2 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#16233B] font-normal leading-tight px-6">
                {cert.student_name}
              </h2>
              <svg className="w-full max-w-[340px] h-[3px] mx-auto mt-2" viewBox="0 0 340 3" fill="none">
                <line x1="0" y1="1.5" x2="340" y2="1.5" stroke="#C5A059" strokeWidth="2" />
              </svg>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-2">
              has successfully completed all required modules, assessments, and lessons for the professional training course
            </p>

            {/* Course Title Banner */}
            <div className="mt-3 inline-block">
              <div className="bg-transparent text-[#16233B] font-bold text-xs sm:text-sm px-6 sm:px-8 py-1.5 border border-[#C5A059] uppercase tracking-[0.15em] flex items-center justify-center gap-3">
                <span className="h-[1px] w-4 bg-[#C5A059]"></span>
                <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                <span>{cert.course_title}</span>
                <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                <span className="h-[1px] w-4 bg-[#C5A059]"></span>
              </div>
            </div>
          </div>

          {/* Footer Details: Date, Code, Signature & Circular Seal */}
          <div className="flex items-end justify-between pt-4 mt-2 border-t border-slate-200/80 text-left relative z-20">
            
            {/* Left Metadata: Date Issued & Certificate Code */}
            <div className="flex items-center gap-5 sm:gap-8">
              {/* Date Issued */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F3EFE6] border border-[#C5A059]/50 text-slate-800 flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider">DATE ISSUED</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{issueDate}</p>
                  <svg className="w-12 h-[2px] mt-1.5" viewBox="0 0 48 2" fill="none">
                    <line x1="0" y1="1" x2="48" y2="1" stroke="#C5A059" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Vertical Subtle Divider */}
              <div className="h-9 w-[1px] bg-slate-300/80"></div>

              {/* Certificate Code */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F3EFE6] border border-[#C5A059]/50 text-slate-800 flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider">CERTIFICATE CODE</p>
                  <p className="text-[11px] font-mono font-bold text-slate-900 tracking-tight mt-0.5">{cert.certificate_number}</p>
                  <svg className="w-12 h-[2px] mt-1.5" viewBox="0 0 48 2" fill="none">
                    <line x1="0" y1="1" x2="48" y2="1" stroke="#C5A059" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Signature Area — Explicit SVG Line Below Cursive Text */}
            <div className="flex flex-col items-center text-center min-w-[170px]">
              <p className="font-script text-2xl sm:text-3xl text-[#16233B] font-normal px-4 pb-1">
                We Help You Board
              </p>
              <svg className="w-full max-w-[170px] h-[2px] mt-1" viewBox="0 0 170 2" fill="none">
                <line x1="0" y1="1" x2="170" y2="1" stroke="#94A3B8" strokeWidth="1.5" />
              </svg>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-2">
                AUTHORIZED SIGNATURE
              </p>
            </div>

            {/* Right Circular Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-[#C5A059] p-1 flex items-center justify-center relative">
                <div className="w-full h-full rounded-full border border-dashed border-[#C5A059] p-1.5 flex flex-col items-center justify-center text-center bg-[#FAF8F3]">
                  <div className="text-[7px] font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                    C O M M I T M E N T
                  </div>
                  <div className="text-[9px] text-[#C5A059] my-0.5">★</div>
                  <p className="text-[6.5px] font-bold uppercase tracking-tight text-[#16233B] leading-tight">
                    COMMITMENT<br />COMPASSION<br />CARE
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
