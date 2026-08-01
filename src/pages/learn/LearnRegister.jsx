import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../../services/api";
import { registerStudent } from "../../services/authService";

export default function LearnRegister() {
  const location = useLocation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await API.get("/trainings/public");
        if (res.data?.success) {
          setAvailableCourses(res.data.trainings || []);
        }
      } catch (err) {
        console.error("Failed to load available courses:", err);
      }
    }
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setApiError("");
  };

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords don't match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await registerStudent({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        department: form.department,
        password: form.password,
        courseIds: selectedCourses,
      });
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl border transition text-sm focus:outline-none focus:ring-2 focus:ring-[#52B5BD]/20 ${
      errors[name]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#52B5BD]"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
            ⏳
          </div>
          <h1 className="text-2xl font-bold text-[#0D1B3E] mb-2">Registration Submitted!</h1>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Thank you <strong>{form.fullName}</strong>! Your account and course enrollment request have been submitted successfully.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left mb-6 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">📋 Next Steps:</p>
            <p>1. An administrator will review your registration and course selection.</p>
            <p>2. Once approved, you will receive an email confirmation.</p>
            <p>3. You can then log in to start learning!</p>
          </div>
          <Link
            to="/learn/login"
            className="w-full inline-block bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-bold py-3 rounded-xl transition shadow-md text-sm"
          >
            ← Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <img
              src="/Assests/WHY_logo.png"
              alt="Logo"
              className="w-12 mx-auto mb-4"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <h1 className="text-2xl font-bold text-[#0D1B3E]">Create Student Account</h1>
            <p className="text-gray-500 text-sm mt-1">Register and select your desired training course</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {apiError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="name"
                className={inputClass("fullName")}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  autoComplete="tel"
                  className={inputClass("phone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department / Field</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="e.g. Healthcare, IT"
                  className={inputClass("department")}
                />
              </div>
            </div>

            {/* Course Selection Section */}
            {availableCourses.length > 0 && (
              <div className="pt-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Select Course(s) to Enroll:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {availableCourses.map((course) => {
                    const isSelected = selectedCourses.includes(course.id);
                    return (
                      <label
                        key={course.id}
                        onClick={() => handleCourseToggle(course.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition ${
                          isSelected
                            ? "border-[#0D1B3E] bg-[#0D1B3E]/5 text-[#0D1B3E] font-semibold"
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-gray-300 text-[#0D1B3E] focus:ring-[#0D1B3E]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold line-clamp-1">{course.title}</p>
                          {course.category && (
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{course.category}</p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className={inputClass("password")}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClass("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-md"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Submitting Registration…
                </>
              ) : (
                "Submit Registration for Approval"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              Already registered?{" "}
              <Link
                to="/learn/login"
                state={location.state}
                className="text-[#0D1B3E] font-semibold hover:text-[#52B5BD] transition"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}