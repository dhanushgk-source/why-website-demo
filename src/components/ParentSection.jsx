import { useSectionFade } from '../hooks/useSectionFade'

const problems = [
  'Hospital visits without support',
  'Emergencies at night',
  'No trusted local help',
  'Living far from parents',
]

export default function ParentSection() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="parent-section" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Heading */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-10 sm:mb-14 lg:mb-16">
          When parents need help –{' '}
          <br className="hidden sm:block" />
          <span className="text-blue-700">families need certainty</span>
        </h2>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {problems.map((problem, i) => (
            <div key={i} className="fade-inner bg-white rounded-2xl shadow-md hover:shadow-2xl
                p-4 sm:p-6 flex items-center gap-3 sm:gap-4
                transition-all duration-300 hover:-translate-y-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 twist-pop
                  rounded-full bg-slate-300 text-sky-800
                  flex items-center justify-center font-semibold text-sm sm:text-base">
                {i + 1}
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">{problem}</p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight Box */}
        <div className="fade-inner bg-white shadow-lg rounded-2xl py-4 sm:py-6 px-6 sm:px-8 inline-block">
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            WHY exists to remove <span className="text-blue-600">uncertainty</span> from care
          </p>
        </div>

      </div>
    </section>
  )
}
