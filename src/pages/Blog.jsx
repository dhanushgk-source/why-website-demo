import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, ChevronRight, BookOpen, ArrowRight, Play, Sparkles, X, Pause, Mail, CheckCircle2, Send } from 'lucide-react'
import { formatGoogleDriveUrl, getYouTubeEmbedUrl } from '../utils/imageUtils'
import { WHATSAPP_BOOKING_URL } from '../config/contact'
import { getAdvertisements } from '../services/advertisementService'
import CustomerFeedback from '../components/CustomerFeedback'
import { useBlogTheme } from '../contexts/BlogThemeContext'
import { FullWidthBanner, SplitBanner } from '../components/promotional/EditorialAd'

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || import.meta?.env?.VITE_API_URL || 'https://why-website-backend.onrender.com/api';

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function readTime(content) {
  if (!content) return '3 min read'
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function WhatsAppIcon({ size = 18, color = "#ffffff", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.198 8.198 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.188 8.188 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
    </svg>
  )
}

// ── SINGLE AD CARD COMPONENT ──────────────────────────────────────────────────
function SingleAdCard({ ad, isDark }) {
  if (!ad) return null
  const ctaText = ad.button_text || "Learn More"
  const ctaLink = ad.button_link || "#"
  const formattedImgUrl = formatGoogleDriveUrl(ad.image_url)

  return (
    <div style={{
      background: isDark
        ? 'linear-gradient(135deg, #131F37 0%, #182642 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
      borderRadius: 18, border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
      overflow: 'hidden', boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column', height: '100%', flex: 1,
    }}>
      <div style={{
        width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: isDark ? '#0F172A' : '#E2E8F0', padding: '12px 16px', minHeight: 180,
      }}>
        {ctaLink !== "#" ? (
          <a href={ctaLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <img
              src={formattedImgUrl}
              alt={ad.title || "WHY Services Advertisement"}
              style={{
                maxWidth: '100%', height: 'auto', maxHeight: 360, objectFit: 'contain', display: 'block',
                borderRadius: 10, margin: '0 auto',
              }}
            />
          </a>
        ) : (
          <img
            src={formattedImgUrl}
            alt={ad.title || "WHY Services Advertisement"}
            style={{
              maxWidth: '100%', height: 'auto', maxHeight: 360, objectFit: 'contain', display: 'block',
              borderRadius: 10, margin: '0 auto',
            }}
          />
        )}
      </div>

      <div style={{
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 10, background: isDark ? '#131F37' : '#FFFFFF',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
      }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A' }}>
            {ad.title || "WHY Services Special Opportunity"}
          </div>
          {ad.subtitle && (
            <div style={{ fontSize: 12, color: isDark ? '#cbd5e1' : '#475569', marginTop: 2, fontWeight: 500 }}>
              {ad.subtitle}
            </div>
          )}
        </div>

        {ctaLink !== "#" && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 20px', borderRadius: 30, background: '#52B5BD',
              color: '#0B132B', fontSize: 12, fontWeight: 800, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)', whiteSpace: 'nowrap',
            }}
          >
            {ctaText} <ArrowRight size={13} />
          </a>
        )}
      </div>
    </div>
  )
}

// ── PERFECTLY ALIGNED WHY ADVERTISEMENT BANNER ──────────────────────────────
function WhyAdBanner({ adIndex = 0 }) {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileIndex, setMobileIndex] = useState(0)
  const { theme } = useBlogTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    async function fetchAds() {
      try {
        const result = await getAdvertisements()
        if (Array.isArray(result) && result.length > 0) {
          setAds(result.filter(a => a.image_url))
        }
      } catch (err) {
        console.warn('Could not fetch ads:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  // Auto-roll mobile carousel every 5 seconds (reading timing)
  useEffect(() => {
    if (ads.length <= 1) return
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % ads.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [ads.length])

  if (loading) return null

  if (ads.length > 0) {
    const desktopAd1 = ads[adIndex % ads.length]
    const desktopAd2 = ads.length > 1 ? ads[(adIndex + 1) % ads.length] : desktopAd1
    const activeMobileAd = ads[mobileIndex % ads.length]

    return (
      <div style={{ marginTop: 40, marginBottom: 40, width: '100%' }}>
        {/* Desktop View: 2 Ads Side by Side (large screens md+) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          <SingleAdCard ad={desktopAd1} isDark={isDark} />
          <SingleAdCard ad={desktopAd2} isDark={isDark} />
        </div>

        {/* Mobile View: Single Rolling Ad (1 back to 1 with 5s reading timing) */}
        <div className="md:hidden flex flex-col gap-3">
          <SingleAdCard ad={activeMobileAd} isDark={isDark} />

          {ads.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 4 }}>
              {ads.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  style={{
                    width: idx === (mobileIndex % ads.length) ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: idx === (mobileIndex % ads.length) ? '#52B5BD' : (isDark ? 'rgba(255,255,255,0.2)' : '#CBD5E1'),
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <FullWidthBanner />
  )
}

// ── FULL-SCREEN VIDEO OVERLAY MODAL ──────────────────────────────────────────
function VideoModal({ videoUrl, title, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true)

  if (!videoUrl) return null

  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(7,14,30,0.96)', backdropFilter: 'blur(12px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', top: 24, left: 32, right: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10,
      }}>
        <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 18 }}>
          {title || "Featured Video"}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', borderRadius: '50%', width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={{
        width: '90%', maxWidth: 1040, aspectRatio: '16/9',
        borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
        background: '#000000', position: 'relative',
      }}>
        {embedUrl.includes('youtube.com/embed') ? (
          <iframe
            src={embedUrl}
            title={title || "WHY Services Video"}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={videoUrl}
            autoPlay
            controls
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          position: 'absolute', bottom: 32, right: 32,
          background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)',
          color: '#ffffff', borderRadius: '50%', width: 48, height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
        title={isPlaying ? "Pause Video" : "Play Video"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  )
}

// ── SKELETON CARD ──────────────────────────────────────────────────────────
function SkeletonCard({ isDark }) {
  return (
    <div style={{
      background: isDark ? '#131F37' : '#FFFFFF',
      borderRadius: 16,
      overflow: 'hidden',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
    }}>
      <div style={{ height: 220, background: isDark ? '#1E293B' : '#E2E8F0', animation: 'pulse 1.5s infinite' }} />
      <div style={{ padding: '24px' }}>
        <div style={{ height: 14, background: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 6, width: '35%', marginBottom: 16 }} />
        <div style={{ height: 24, background: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 6, marginBottom: 12 }} />
      </div>
    </div>
  )
}

// ── ARTICLE CARD ───────────────────────────────────────────────────────────
function CapgeminiCard({ post, onWatchVideo, isDark }) {
  const imgUrl = formatGoogleDriveUrl(post.featured_image_url)
  const hasVideo = Boolean(post.video_url && post.video_url.trim() !== '')

  return (
    <article
      style={{
        background: isDark ? '#131F37' : '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 16px rgba(15,23,42,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = isDark ? '0 20px 45px rgba(0,0,0,0.4)' : '0 16px 36px rgba(15,23,42,0.1)'
        e.currentTarget.style.borderColor = '#52B5BD'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 16px rgba(15,23,42,0.05)'
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: isDark ? '#1E293B' : '#F1F5F9' }}>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={post.title}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            onError={(e) => {
              const step = Number(e.target.dataset.fallbackStep || 0);
              const match = imgUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/) || imgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
              const fileId = match && match[1];

              if (fileId && step === 0) {
                e.target.dataset.fallbackStep = '1';
                e.target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                return;
              }
              if (fileId && step === 1) {
                e.target.dataset.fallbackStep = '2';
                e.target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                return;
              }

              e.target.parentElement.style.background = isDark ? 'linear-gradient(135deg, #0b1329 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isDark ? 'linear-gradient(135deg, #131F37 0%, #1E293B 100%)' : 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
          }}>
            <BookOpen size={40} color="#52B5BD" />
          </div>
        )}
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <span style={{
            background: '#52B5BD',
            color: '#0B132B', fontSize: 11, fontWeight: 800,
            padding: '4px 12px', borderRadius: 30, textTransform: 'uppercase', letterSpacing: '0.8px',
          }}>
            {post.category_name || 'Insights'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: isDark ? '#cbd5e1' : '#64748B' }}>
            <span>{formatDate(post.published_at)}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {readTime(post.content)}
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: 19, fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 12, lineHeight: 1.38 }}>
          <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p style={{ fontSize: 14, color: isDark ? '#cbd5e1' : '#475569', marginBottom: 24, lineHeight: 1.6, flex: 1 }}>
            {post.excerpt}
          </p>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link
            to={`/blog/${post.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', borderRadius: 30, border: '1.5px solid #52B5BD',
              color: isDark ? '#52B5BD' : '#0284C7', fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}
          >
            Discover story <ArrowRight size={14} />
          </Link>

          {hasVideo && (
            <button
              onClick={() => onWatchVideo(post.video_url, post.title)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 30, background: '#52B5BD',
                color: '#0B132B', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
              }}
            >
              <Play size={13} fill="#0B132B" /> Watch video
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

// ── MAIN BLOG / INSIGHTS PAGE ──────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [dbCategories, setDbCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All Insights')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeVideo, setActiveVideo] = useState({ url: null, title: '' })

  const { theme } = useBlogTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    document.title = 'Insights & News | WHY Services'
    fetch(`${API_BASE}/blog/categories`)
      .then(r => r.json())
      .then(data => {
        const cats = data.categories || (Array.isArray(data) ? data : [])
        if (Array.isArray(cats) && cats.length > 0) {
          setDbCategories(cats.map(c => c.name))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: 50 })
        if (activeCategory !== 'All Insights') params.set('category', activeCategory)
        if (searchQuery) params.set('search', searchQuery)

        const res = await fetch(`${API_BASE}/blog?${params.toString()}`).then(r => r.json()).catch(() => ({ posts: [] }))
        setPosts(res.posts || [])
      } catch {
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [activeCategory, searchQuery])

  const categoryList = ['All Insights', ...dbCategories.filter(c => c !== 'All Insights')]
  const currentHeroPost = posts[0]
  const heroImg = currentHeroPost ? formatGoogleDriveUrl(currentHeroPost.hero_bg_url || currentHeroPost.featured_image_url) : ''
  const heroHasVideo = Boolean(currentHeroPost && currentHeroPost.video_url && currentHeroPost.video_url.trim() !== '')

  return (
    <div style={{
      background: isDark ? '#0B132B' : '#F8FAFC',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: isDark ? '#ffffff' : '#0F172A',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      {activeVideo.url && (
        <VideoModal
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo({ url: null, title: '' })}
        />
      )}

      {/* ── CORPORATE HERO HEADER SECTION ────────── */}
      <section style={{
        background: isDark
          ? 'linear-gradient(135deg, #0B132B 0%, #152238 60%, #1E293B 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
        color: isDark ? '#ffffff' : '#0F172A',
        paddingTop: 44,
        paddingBottom: 56,
        paddingLeft: 'clamp(20px, 4vw, 60px)',
        paddingRight: 'clamp(20px, 4vw, 60px)',
        position: 'relative',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
      }}>
        <div style={{ maxWidth: 1536, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: isDark ? '#cbd5e1' : '#64748B', marginBottom: 20 }}>
            <Link to="/" style={{ color: isDark ? '#52B5BD' : '#0284C7', textDecoration: 'none', fontWeight: 700 }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 600, color: isDark ? '#ffffff' : '#0F172A' }}>Insights & News</span>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, marginBottom: 12, color: isDark ? '#ffffff' : '#0F172A', letterSpacing: '-0.5px' }}>
              WHY Insights & Publications
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: isDark ? '#cbd5e1' : '#475569', maxWidth: 760, lineHeight: 1.6, fontWeight: 500 }}>
              Discover how WHY Services provides trusted non-medical companion assistance, hospital navigation support, and safe travel escort services across Bengaluru.
            </p>
          </div>

          {currentHeroPost && (
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              background: isDark ? '#131F37' : '#FFFFFF',
              border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
              boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.3)' : '0 10px 30px rgba(15,23,42,0.06)',
            }} className="flex flex-col-reverse lg:flex-row lg:items-stretch">
              <div style={{ padding: 'clamp(24px, 4vw, 44px)', flex: '1 1 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#52B5BD', color: '#0B132B', fontSize: 11, fontWeight: 800, padding: '5px 14px', borderRadius: 30, textTransform: 'uppercase', marginBottom: 14, width: 'fit-content' }}>
                  <Sparkles size={12} color="#0B132B" /> Featured Insights
                </span>
                <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', lineHeight: 1.3, marginBottom: 12 }}>
                  {currentHeroPost.title}
                </h2>
                {currentHeroPost.excerpt && (
                  <p style={{ fontSize: 15, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, marginBottom: 24, fontWeight: 500 }}>
                    {currentHeroPost.excerpt}
                  </p>
                )}

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link
                    to={`/blog/${currentHeroPost.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 24px', borderRadius: 30, background: '#52B5BD',
                      color: '#0B132B', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                    }}
                  >
                    Discover story <ArrowRight size={16} />
                  </Link>

                  {heroHasVideo && (
                    <button
                      onClick={() => setActiveVideo({
                        url: currentHeroPost.video_url,
                        title: currentHeroPost.title
                      })}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 24px', borderRadius: 30,
                        background: isDark ? '#182642' : '#F1F5F9',
                        color: isDark ? '#ffffff' : '#0F172A',
                        fontWeight: 700, fontSize: 14,
                        border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid #CBD5E1',
                        cursor: 'pointer',
                      }}
                    >
                      <Play size={16} fill={isDark ? "#ffffff" : "#0F172A"} /> Watch the video
                    </button>
                  )}
                </div>
              </div>

              {heroImg && (
                <div className="w-full lg:w-[45%] min-h-[220px] lg:min-h-[360px] relative overflow-hidden" style={{ background: isDark ? '#1E293B' : '#F1F5F9' }}>
                  <img
                    src={heroImg}
                    alt={currentHeroPost.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ──────── */}
      <main style={{ maxWidth: 1536, margin: '0 auto', padding: '40px clamp(20px, 3vw, 40px)' }}>

        {/* Dynamic Category Filter Tabs & Search */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 32,
          background: isDark ? '#131F37' : '#FFFFFF',
          padding: '16px 20px', borderRadius: 16,
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
          boxShadow: isDark ? 'none' : '0 2px 10px rgba(15,23,42,0.03)',
        }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', maxWidth: '100%', paddingBottom: 4 }} className="no-scrollbar">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px', borderRadius: 30, whiteSpace: 'nowrap', flexShrink: 0,
                  border: activeCategory === cat ? 'none' : (isDark ? 'none' : '1px solid #CBD5E1'),
                  background: activeCategory === cat ? '#52B5BD' : (isDark ? '#182642' : '#F1F5F9'),
                  color: activeCategory === cat ? '#0B132B' : (isDark ? '#cbd5e1' : '#475569'),
                  fontWeight: 800, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 320 }} className="mt-2 sm:mt-0">
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#94a3b8' : '#64748B' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search corporate insights..."
              style={{
                width: '100%', paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                borderRadius: 30, border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                fontSize: 13, outline: 'none',
                background: isDark ? '#182642' : '#F8FAFC',
                color: isDark ? '#ffffff' : '#0F172A'
              }}
            />
          </div>
        </div>

        {/* Multi-column Grid Layout for Widescreen Articles */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            <SkeletonCard isDark={isDark} /> <SkeletonCard isDark={isDark} /> <SkeletonCard isDark={isDark} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            background: isDark ? '#131F37' : '#FFFFFF',
            borderRadius: 20, border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
            padding: '70px 20px', textAlign: 'center'
          }}>
            <BookOpen size={48} color="#52B5BD" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 8 }}>No Articles Found</h3>
            <p style={{ color: isDark ? '#cbd5e1' : '#475569', fontSize: 14, margin: 0 }}>There are currently no published articles in this category.</p>
          </div>
        ) : (
          <div>
            {/* First Batch of Articles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
              {posts.slice(0, 3).map((post) => (
                <CapgeminiCard
                  key={post.id}
                  post={post}
                  onWatchVideo={(url, title) => setActiveVideo({ url, title })}
                  isDark={isDark}
                />
              ))}
            </div>

            {/* ── IN-FEED AD BANNER 1 ── */}
            <WhyAdBanner adIndex={0} />

            {/* Second Batch of Articles */}
            {posts.length > 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
                {posts.slice(3).map((post) => (
                  <CapgeminiCard
                    key={post.id}
                    post={post}
                    onWatchVideo={(url, title) => setActiveVideo({ url, title })}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SPLIT PROMOTIONAL BANNER ── */}
        <SplitBanner />

        {/* ── CORPORATE NEWSLETTER SECTION ────────────────── */}
        <CorporateNewsletterSection isDark={isDark} />

        {/* ── CUSTOMER FEEDBACK & REVIEWS SECTION ───────────────────────── */}
        <div style={{ marginTop: 60 }} id="feedback-section">
          <CustomerFeedback variant={isDark ? "dark" : "light"} />
        </div>

      </main>
    </div>
  )
}

// ── CORPORATE NEWSLETTER SUBSCRIPTION SECTION ────────────────────────────────
function CorporateNewsletterSection({ isDark }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email.trim() || !name.trim()) {
      setErrorMsg('Please provide both your full name and email address.')
      return
    }
    setSubscribing(true)
    setErrorMsg('')
    try {
      const res = await fetch(`${API_BASE}/blog/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      }).then(r => r.json())

      if (res.success) {
        setSubscribed(true)
        setEmail('')
        setName('')
      } else {
        setErrorMsg(res.message || 'Failed to subscribe. Please try again.')
      }
    } catch {
      setErrorMsg('Something went wrong. Please check your network.')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <div style={{
      position: 'relative',
      borderRadius: 24,
      overflow: 'hidden',
      background: isDark
        ? 'linear-gradient(135deg, #131F37 0%, #182642 50%, #1E293B 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
      color: isDark ? '#ffffff' : '#0F172A',
      padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 48px)',
      boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(15,23,42,0.06)',
      border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
      marginTop: 60,
      marginBottom: 30,
    }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(82, 181, 189, 0.15)', color: isDark ? '#52B5BD' : '#0284C7',
          border: '1px solid rgba(82, 181, 189, 0.3)',
          padding: '6px 18px', borderRadius: 30,
          fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          <Mail size={14} color={isDark ? "#52B5BD" : "#0284C7"} /> Stay Informed & Care Connected
        </span>

        <h2 style={{
          fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800,
          lineHeight: 1.25, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 14, letterSpacing: '-0.3px'
        }}>
          Subscribe to WHY Insights & Healthcare Digest
        </h2>

        <p style={{
          fontSize: 'clamp(14px, 1.6vw, 16px)', color: isDark ? '#cbd5e1' : '#475569',
          lineHeight: 1.6, marginBottom: 32, maxWidth: 700, margin: '0 auto 32px', fontWeight: 500
        }}>
          Join thousands of families, care recipients, and professionals receiving curated updates on healthcare assistance, hospital navigation tips, senior travel support, and company news.
        </p>

        {subscribed ? (
          <div style={{
            background: 'rgba(0, 210, 184, 0.15)', border: '1.5px solid #00D2B8',
            borderRadius: 16, padding: '24px clamp(20px, 3vw, 40px)', color: '#00D2B8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            maxWidth: 600, margin: '0 auto',
          }}>
            <CheckCircle2 size={28} color="#00D2B8" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 2 }}>Subscription Confirmed!</div>
              <div style={{ fontSize: 13, color: isDark ? '#cbd5e1' : '#475569' }}>Thank you for joining. Check your inbox for our latest newsletter and welcome guide.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ maxWidth: 660, margin: '0 auto' }}>
            {errorMsg && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#dc2626', padding: '10px 16px', borderRadius: 10, fontSize: 13,
                marginBottom: 16, textAlign: 'center', fontWeight: 600
              }}>
                {errorMsg}
              </div>
            )}

            <div style={{
              display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap',
              background: isDark ? '#0B132B' : '#FFFFFF',
              border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid #CBD5E1',
              borderRadius: 16,
              padding: 8, boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15,23,42,0.06)',
            }}>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name *"
                style={{
                  flex: '1 1 180px', background: 'transparent', border: 'none',
                  outline: 'none', color: isDark ? '#ffffff' : '#0F172A', padding: '12px 16px',
                  fontSize: 14, minWidth: 140, fontWeight: 500
                }}
              />
              <div style={{ width: 1, background: isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0', alignSelf: 'stretch', display: 'block' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address *"
                style={{
                  flex: '2 1 240px', background: 'transparent', border: 'none',
                  outline: 'none', color: isDark ? '#ffffff' : '#0F172A', padding: '12px 16px',
                  fontSize: 14, minWidth: 200, fontWeight: 500
                }}
              />
              <button
                type="submit"
                disabled={subscribing}
                style={{
                  padding: '12px 28px', borderRadius: 12, border: 'none',
                  background: '#52B5BD',
                  color: '#0B132B', fontWeight: 800, fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)',
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                }}
              >
                {subscribing ? 'Subscribing...' : 'Subscribe Now'} <Send size={15} />
              </button>
            </div>
          </form>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(16px, 3vw, 32px)', marginTop: 24, flexWrap: 'wrap',
          fontSize: 13, color: isDark ? '#cbd5e1' : '#64748B', fontWeight: 600,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} color="#00D2B8" /> Weekly Care Insights
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} color="#00D2B8" /> Exclusive Updates
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} color="#00D2B8" /> No Spam, Unsubscribe Anytime
          </span>
        </div>
      </div>
    </div>
  )
}
