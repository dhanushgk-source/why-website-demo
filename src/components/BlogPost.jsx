import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { ALL_POSTS } from './BlogData'

export default function BlogPost() {
  const { slug } = useParams()
  const post = ALL_POSTS.find((p) => p.slug === slug)

  // If someone hits a URL that doesn't match any post, send them back to the blog list
  if (!post) {
    return <Navigate to="/blog" replace />
  }

  // Simple "related posts" — same category, excluding the current post
  const relatedPosts = ALL_POSTS
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <article className="w-full bg-[#F7F3EA] py-12 sm:py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A4A]/60 hover:text-[#F2711F] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Category + meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-white text-[#0D9488] font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2A4A] leading-tight mb-5">
          {post.title}
        </h1>

        {/* Author / date / read time */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-[#1B2A4A]/50 mb-8 pb-8 border-b border-[#1B2A4A]/10">
          <span className="font-semibold text-[#1B2A4A]/70">{post.author}</span>
          <span className="w-1 h-1 rounded-full bg-[#1B2A4A]/20" />
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#1B2A4A]/20" />
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Featured image */}
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg mb-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        </div>

        {/* Body content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-[#1B2A4A]/80 text-base sm:text-lg leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#1B2A4A]/10">
            <h3 className="font-display text-2xl font-bold text-[#1B2A4A] mb-6">
              More in {post.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${rp.image}')` }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-[#1B2A4A] group-hover:text-[#F2711F] transition-colors duration-300 leading-snug">
                      {rp.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  )
}