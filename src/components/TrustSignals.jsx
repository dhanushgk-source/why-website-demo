import { useSectionFade } from '../hooks/useSectionFade'

const signals = [
  {
    color: 'text-blue-600',
    label: 'Admin Verified',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8"
        stroke="currentColor" className="w-8 h-8 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
      </svg>
    ),
  },
  {
    color: 'text-indigo-600',
    label: 'Background Checked',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8"
        stroke="currentColor" className="w-8 h-8 text-indigo-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    color: 'text-teal-600',
    label: 'Emergency Ready',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8"
        stroke="currentColor" className="w-8 h-8 text-teal-600">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    color: 'text-purple-600',
    label: 'On-Ground Only',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8"
        stroke="currentColor" className="w-8 h-8 text-purple-600">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
]

export default function TrustSignals() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="trust-section" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {signals.map((s) => (
            <div key={s.label} className="feature flex flex-col items-center transition duration-300 hover:-translate-y-2">
              <div className="fade-inner icon-box w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-md mb-5">
                {s.icon}
              </div>
              <p className="text-base font-medium text-gray-700">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
