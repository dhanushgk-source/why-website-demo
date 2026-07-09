import { BookOpen, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_POSTS, PER_PAGE } from './BlogData'

function PostCard({ post, elevated }) {
  return (
    <article
      className={`group bg-white rounded-3xl shadow-lg overflow-hidden text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5
        ${elevated ? 'md:-translate-y-6 md:hover:-translate-y-8' : ''}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0D9488] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="px-6 py-7">
        <h3 className="font-display text-lg font-bold text-[#1B2A4A] mb-2 group-hover:text-[#F2711F] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-[#1B2A4A]/60 leading-relaxed mb-4 max-w-[26ch] mx-auto">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-center gap-3 text-xs text-[#1B2A4A]/40 mb-5">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#1B2A4A]/20" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-block px-5 py-2.5 rounded-full bg-[#F2711F] text-white text-sm font-semibold hover:bg-[#D9600F] transition-colors duration-300 shadow-md shadow-orange-900/10"
        >
          Read More
        </Link>
      </div>
    </article>
  )
}

export default function BlogSimple() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(ALL_POSTS.length / PER_PAGE)
  const visiblePosts = ALL_POSTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1))
  const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1))

  return (
    <section className="relative w-full bg-[#F7F3EA] py-16 sm:py-20 md:py-24 overflow-hidden">

      {/* ===== Decorative background, consistent with TrustSignals ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-[#F7F3EA] to-orange-50/30 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      <svg className="absolute -top-6 -left-6 w-36 h-36 text-emerald-300/60 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z" fill="currentColor" opacity="0.5" />
        <path d="M70,10 C50,30 40,55 50,70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <div className="hidden sm:grid absolute top-8 right-10 grid-cols-5 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#F2711F]" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* ===== Header ===== */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-[#0D9488] font-semibold text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <BookOpen className="w-4 h-4" />
            The WHY Resource Center
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2A4A] mb-4">
            Our Blog
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#F2711F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
            <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#0D9488]" />
          </div>
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:items-start">
          {visiblePosts.map((post, idx) => (
            <PostCard key={post.id} post={post} elevated={idx === 1} />
          ))}
        </div>

        {/* ===== Navigation: left / right ===== */}
        <div className="flex items-center justify-center gap-6 mt-14 sm:mt-16">
          <button
            onClick={goPrev}
            aria-label="Previous posts"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#0D9488]/30 text-[#0D9488] flex items-center justify-center hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 h-2.5 bg-[#F2711F]' : 'w-2.5 h-2.5 bg-[#1B2A4A]/20 hover:bg-[#1B2A4A]/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next posts"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#0D9488]/30 text-[#0D9488] flex items-center justify-center hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  )
}