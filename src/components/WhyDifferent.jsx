import { useState } from 'react'
import { useSectionFade } from '../hooks/useSectionFade'

const comparisonRows = [
  'Verified PRO',
  'Admin oversight',
  'Emergency handling',
  'Relationship-based care',
  'Background checks',
  '24/7 Support',
]

const whyItems = comparisonRows.map((label) => ({
  label,
  value: '✓',
  isCheck: true,
}))

const othersItems = [
  { label: 'Verified PRO', value: '✕', isCheck: false },
  { label: 'Admin oversight', value: '✕', isCheck: false },
  { label: 'Emergency handling', value: '✕', isCheck: false },
  { label: 'Relationship-based care', value: '✕', isCheck: false },
  { label: 'Background checks', value: 'Sometimes', isCheck: null },
  { label: '24/7 Support', value: '✕', isCheck: false },
]

export default function WhyDifferent() {
  const [activeTab, setActiveTab] = useState('why')
  const sectionRef = useSectionFade()

  const activeTabClass =
    'bg-gradient-to-r from-[#2F4A7D] to-[#2DD4BF] text-white shadow-lg'
  const inactiveTabClass = 'text-gray-600'

  const currentItems = activeTab === 'why' ? whyItems : othersItems

  return (
    <section
      ref={sectionRef}
      id="why-section"
      className="py-24 px-6 text-center"
    >
      {/* Title */}
      <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
        WHY is{' '}
        <span className="bg-gradient-to-r from-[#2F4A7D] to-[#2DD4BF] bg-clip-text text-transparent">
          different
        </span>
      </h2>

      <p className="fade-inner text-gray-500 text-xl mb-16">
        Not another marketplace
      </p>

      {/* Toggle */}
      <div className="fade-inner inline-flex bg-gray-200 p-2 rounded-full shadow-inner mb-20">
        <button
          onClick={() => setActiveTab('why')}
          className={`px-10 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
            activeTab === 'why' ? activeTabClass : inactiveTabClass
          }`}
        >
          WHY
        </button>

        <button
          onClick={() => setActiveTab('others')}
          className={`px-10 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
            activeTab === 'others' ? activeTabClass : inactiveTabClass
          }`}
        >
          Others
        </button>
      </div>

      {/* Card Container */}
      <div className="fade-inner max-w-4xl mx-auto bg-gradient-to-b from-gray-100 to-gray-200 p-12 rounded-[40px] shadow-inner transition-all duration-500">
        <div className="space-y-8">
          {currentItems.map((item) => (
            <div
              key={item.label}
              className="fade-inner flex items-center justify-between bg-white rounded-2xl px-10 py-8 shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition duration-300"
            >
              <span className="text-xl font-medium text-gray-800">
                {item.label}
              </span>

              {/* Check */}
              {item.isCheck === true && (
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2F4A7D] to-[#2DD4BF] text-white text-2xl font-bold shadow-[0_8px_20px_rgba(45,212,191,0.4)]">
                  ✓
                </div>
              )}

              {/* Cross */}
              {item.isCheck === false && (
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300 text-gray-500 text-2xl font-semibold shadow-inner">
                  ✕
                </div>
              )}

              {/* Sometimes Badge */}
              {item.isCheck === null && (
                <div className="px-5 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-sm font-semibold shadow-sm whitespace-nowrap">
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}