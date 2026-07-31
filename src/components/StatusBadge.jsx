const TONE_MAP = {
  pending: "badge-brass",
  reviewed: "badge-slate",
  shortlisted: "badge-slate",
  accepted: "badge-sage",
  hired: "badge-sage",
  approved: "badge-sage",
  rejected: "badge-clay",
  declined: "badge-clay",
  active: "badge-sage",
  inactive: "badge-neutral",
  published: "badge-sage",
  draft: "badge-neutral",
};

export default function StatusBadge({ value }) {
  const key = (value || "").toLowerCase();
  const tone = TONE_MAP[key] || "badge-neutral";
  return <span className={`badge ${tone}`}>{value || "unknown"}</span>;
}
