import { useSectionFade } from '../hooks/useSectionFade'

export default function CTA() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      style={{
        background: 'linear-gradient(180deg, #cfd8dc 0%, #d7e0e3 100%)',
        padding: '120px 20px',
        textAlign: 'center',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900">
          Companion for elders <br />
          should feel <span className="text-teal-600">safe</span>
        </h2>

        {/* Buttons */}
        <div className="fade-inner flex flex-wrap justify-center items-center gap-6 mt-10">

          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#2F4A7D] to-[#2DD4BF] text-white font-semibold shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src="/Assests/icons/download.svg" className="white-icon" width="20" alt="" />
            Download the App
          </button>

          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-800 font-semibold shadow-md transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src="/Assests/icons/msg.svg" width="20" alt="" />
            Talk to WHY Support
          </button>

          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-800 font-semibold shadow-md transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src="/Assests/icons/user_Plus.svg" width="20" alt="" />
            Join as a PRO
          </button>

        </div>

        {/* Subtext */}
        <div className="fade-inner mt-10 text-gray-600 text-sm">
          Available on iOS and Android
        </div>

      </div>
    </section>
  )
}
