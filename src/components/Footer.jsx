import { Link } from "react-router-dom";

export default function Footer() {
  const navMap = {
    'About Us': '/about',
    'How it Works': '/how-it-works',
    'Safety & Trust': '/safety',
    'Careers': '/careers',
    'Press': '/press',
  };
  return (
    <footer id="footer-section" className="bg-gradient-to-b from-blue-950 to-blue-700 text-white pt-20 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <img src="/Assests/WHY_logo.png" alt="WHY Logo" className="w-16 mb-6" />

          <p className="text-base text-blue-100 leading-relaxed mb-6">
            Connecting people with verified, trusted PRO for entertainment,
            social outings, and daily activities. Because every moment deserves
            to be shared.
          </p>

          <div className="space-y-5 text-blue-100 text-base">

            {/* Phone */}
            <div className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-teal-500/20">
                <span className="text-xl transition duration-300 group-hover:text-teal-400">
                  <img src="/Assests/icons/phone.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 group-hover:text-teal-400">+91 9148329385</span>
            </div>

            {/* Email */}
            <div className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-teal-500/20">
                <span className="text-xl transition duration-300 group-hover:text-teal-400">
                  <img src="/Assests/icons/mail.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 text-sm group-hover:text-teal-400">
                techadmin@thewhyservices.com
              </span>
            </div>

            {/* Location */}
            <div className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-teal-500/20">
                <span className="text-xl transition duration-300 group-hover:text-teal-400">
                  <img src="/Assests/icons/location.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 group-hover:text-teal-400">
                Available in 120+ cities
              </span>
            </div>

          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Services</h4>
          <ul className="space-y-4 text-blue-100 text-base">
            {['Entertainment Companions', 'Social Outings', 'Shopping & Errands', 'Event Attendance', 'Daily Companionship'].map((s) => (
              <li key={s} className="flex items-start gap-3 hover:text-teal-400 transition">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}


        <div>
          <h4 className="text-xl font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-blue-100 text-base">
            {['About Us', 'How it Works', 'Safety & Trust', 'Careers', 'Press'].map((s) => (
              <li key={s} className="flex items-start gap-3 hover:text-teal-400 transition">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
                <Link to={navMap[s]} className="hover:text-teal-400 transition">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-blue-100 text-base">
            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <a href="https://static.zdassets.com/ekr/snippet.js?key=452548ba-3a98-4a87-9c38-eec085354c0d" className="hover:text-teal-400 transition">Help Center</a>
            </li>
            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/terms-pro" >
                PRO Terms & Conditions
              </Link>
            </li>

            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/terms-user" >
                Terms & Conditions
              </Link>
            </li>

            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/privacy-policy-pro">
                Privacy Policy - PRO
              </Link>
            </li>

            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/privacy-policy-user" >
                Privacy Policy - USER
              </Link>
            </li>

            <li className="flex items-start gap-3 hover:text-teal-400 transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#6ED3C8]"></span>
              <Link to="/data-deletion" >
                Data Deletion Policy
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-blue-500/30 mt-14 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Text */}
          <p className="text-blue-200 text-sm text-center md:text-left">
            © 2026 WHY – We Help You. All rights reserved.
            Made with{' '}
            <img src="/Assests/icons/heart.svg" width="20" height="20" className="inline white-icon" alt="heart" />{' '}
            for everyone.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">

            <a
              href="https://www.facebook.com/share/1Dij6aGamA/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://x.com/thewhyservices"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>

            <a
              href="https://www.instagram.com/why.services?igsh=czR0eDViMnhtN2dw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://www.linkedin.com/company/why-companion-services/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

          </div>

        </div>
      </div>

    </footer>
  )
}
