import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <img src="/Assests/WHY_logo.png" alt="WHY Logo" className="w-12 mx-auto mb-4" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <h1 className="text-2xl font-bold text-[#2F4A7D]">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your WHY account</p>
          </div>
          <LoginForm />
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/careers" className="hover:text-[#52B5BD] transition-colors duration-200">← Back to Careers</Link>
        </p>
      </div>
    </div>
  );
}
