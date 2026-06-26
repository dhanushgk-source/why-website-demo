import { Link } from "react-router-dom";
import { Briefcase, FileText } from "lucide-react";

const cards = [
  { to: "/admin/jobs", icon: Briefcase, title: "Manage Jobs", desc: "Create, edit and delete job postings." },
  { to: "/admin/applications", icon: FileText, title: "Applications", desc: "View and manage candidate applications." },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9fa] to-white">
      <div className="bg-[#2F4A7D] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#52B5BD] text-sm font-semibold tracking-widest uppercase mb-2">Admin Panel</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-white/70 mt-2">Manage jobs, applications and career portal activities.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:border-[#52B5BD]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#52B5BD]/15 to-[#2F4A7D]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-[#52B5BD]" strokeWidth={1.8} />
                </div>
                <h2 className="text-xl font-bold text-[#2F4A7D] group-hover:text-[#52B5BD] transition-colors mb-2">{c.title}</h2>
                <p className="text-gray-500">{c.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}