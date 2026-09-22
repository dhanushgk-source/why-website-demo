import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, BookOpen, Calendar, Share2, ArrowRight, Play, X, Pause, Send, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { formatGoogleDriveUrl, getYouTubeEmbedUrl } from '../utils/imageUtils'
import { WHATSAPP_BOOKING_URL, WHATSAPP_CHANNEL_URL } from '../config/contact'
import { getAdvertisements } from '../services/advertisementService'
import CustomerFeedback from '../components/CustomerFeedback'
import { useBlogTheme } from '../contexts/BlogThemeContext'
import { InArticleCard, SidebarWidget, CompactCTA } from './promotional/EditorialAd'

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || import.meta?.env?.VITE_API_URL || 'https://why-website-backend.onrender.com/api';

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function readTime(content) {
  if (!content) return '3 min read'
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

// ── REAL WHATSAPP ICON COMPONENT (NO EMOJIS) ─────────────────────────────────
function WhatsAppIcon({ size = 18, color = "#ffffff", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.198 8.198 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.188 8.188 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
    </svg>
  )
}

// ── PERFECTLY ALIGNED WHY ADVERTISEMENT BANNER (ARTICLE PAGE) ────────────────
function WhyAdSection({ adIndex = 0 }) {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
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
        console.warn('Could not fetch active ads:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  const activeAd = ads.length > 0 ? (ads[adIndex % ads.length] || ads[0]) : null

  if (loading) return null

  if (activeAd) {
    const ctaText = activeAd.button_text || "Learn More"
    const ctaLink = activeAd.button_link || "#"
    const formattedImgUrl = formatGoogleDriveUrl(activeAd.image_url)

    return (
      <div style={{
        background: isDark
          ? 'linear-gradient(135deg, #131F37 0%, #182642 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
        borderRadius: 18, border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
        overflow: 'hidden', boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)', marginBottom: 28, width: '100%',
      }}>
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
          background: isDark ? '#0F172A' : '#E2E8F0', padding: '16px 20px', minHeight: 160,
        }}>
          {ctaLink !== "#" ? (
            <a href={ctaLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
              <img
                src={formattedImgUrl}
                alt={activeAd.title || "WHY Services Advertisement"}
                style={{
                  maxWidth: '100%', height: 'auto', maxHeight: 500, objectFit: 'contain', display: 'block',
                  borderRadius: 12, margin: '0 auto',
                }}
              />
            </a>
          ) : (
            <img
              src={formattedImgUrl}
              alt={activeAd.title || "WHY Services Advertisement"}
              style={{
                maxWidth: '100%', height: 'auto', maxHeight: 500, objectFit: 'contain', display: 'block',
                borderRadius: 12, margin: '0 auto',
              }}
            />
          )}
        </div>

        <div style={{
          padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, background: isDark ? '#131F37' : '#FFFFFF', borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A' }}>
              {activeAd.title || "WHY Services Special Notice"}
            </div>
            {activeAd.subtitle && (
              <div style={{ fontSize: 12, color: isDark ? '#cbd5e1' : '#475569', marginTop: 2, fontWeight: 500 }}>
                {activeAd.subtitle}
              </div>
            )}
          </div>

          {ctaLink !== "#" && (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 20px', borderRadius: 25, background: '#52B5BD',
                color: '#0B132B', fontSize: 13, fontWeight: 800, textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(82, 181, 189, 0.3)', whiteSpace: 'nowrap',
              }}
            >
              {ctaText} <ArrowRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <InArticleCard />
  )
}

// ── FULL-SCREEN VIDEO MODAL ──────────────────────────────────────────────────
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

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [relatedPosts, setRelatedPosts] = useState([])
  const [copied, setCopied] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [subName, setSubName] = useState('')
  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState('')

  const { theme } = useBlogTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/blog/${slug}`)
        const data = await res.json()
        if (data.success && data.post) {
          setPost(data.post)
          document.title = `${data.post.seo_title || data.post.title} | WHY Insights`
          const meta = document.querySelector('meta[name="description"]')
          if (meta) meta.content = data.post.seo_description || data.post.excerpt || ''

          const relRes = await fetch(`${API_BASE}/blog?limit=6`).then(r => r.json()).catch(() => ({ posts: [] }))
          if (relRes.posts) {
            setRelatedPosts(relRes.posts.filter(p => p.slug !== slug).slice(0, 4))
          }
        } else {
          setError('Post not found.')
        }
      } catch (err) {
        console.error('Fetch article error', err)
        setError('Failed to load post.')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  async function handleSidebarSubscribe(e) {
    e.preventDefault()
    if (!subEmail.trim() || !subName.trim()) {
      setSubStatus('Please enter both your name and email.')
      return
    }
    try {
      setSubStatus('Subscribing...')
      await fetch(`${API_BASE}/blog/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail.trim(), name: subName.trim() }),
      })
      setSubStatus('Subscribed! Check your inbox.')
      setSubEmail('')
      setSubName('')
    } catch {
      setSubStatus('Subscription failed. Try again.')
    }
  }

  if (loading) {
    return (
      <div style={{ background: isDark ? '#0B132B' : '#F8FAFC', minHeight: '80vh', padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <div style={{ height: 16, width: 140, background: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 6, marginBottom: 24 }} />
          <div style={{ height: 48, width: '85%', background: isDark ? '#1E293B' : '#E2E8F0', borderRadius: 8, marginBottom: 24 }} />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div style={{ background: isDark ? '#0B132B' : '#F8FAFC', minHeight: '80vh', padding: '100px 20px', textAlign: 'center', color: isDark ? '#ffffff' : '#0F172A' }}>
        <BookOpen size={48} color="#52B5BD" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 24, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 12 }}>Article Not Found</h2>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 30, background: '#52B5BD', color: '#0B132B', fontWeight: 700, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>
    )
  }

  const rawImage = post.hero_bg_url || post.featured_image_url
  const formattedHeroImg = formatGoogleDriveUrl(rawImage)
  const formattedFeaturedImg = formatGoogleDriveUrl(post.featured_image_url)
  const hasVideo = Boolean(post.video_url && post.video_url.trim() !== '')

  return (
    <article style={{
      background: isDark ? '#0B132B' : '#F8FAFC',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      paddingBottom: 80,
      color: isDark ? '#ffffff' : '#0F172A',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      {/* Scroll Progress Indicator Bar */}
      <div style={{
        position: 'fixed', top: 80, left: 0, right: 0, height: 3,
        background: 'transparent', zIndex: 9998,
      }}>
        <div style={{
          height: '100%', width: `${scrollProgress}%`,
          background: '#52B5BD', transition: 'width 0.1s linear',
        }} />
      </div>

      <style>{`
        .widescreen-3col-layout {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr) 340px;
          gap: 32px;
          align-items: flex-start;
        }
        @media (max-width: 1280px) {
          .widescreen-3col-layout {
            grid-template-columns: minmax(0, 1fr) 340px !important;
          }
          .left-sidebar-col {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .widescreen-3col-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        /* Hide decorative hero background image on mobile */
        .hero-bg-deco {
          display: block;
        }
        @media (max-width: 767px) {
          .hero-bg-deco {
            display: none !important;
          }
          .article-body-card {
            padding: 20px 16px !important;
            font-size: 15px !important;
          }
          .article-featured-img {
            border-radius: 12px !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>

      {showVideoModal && (
        <VideoModal
          videoUrl={post.video_url}
          title={post.title}
          onClose={() => setShowVideoModal(false)}
        />
      )}

      {/* ── CORPORATE HERO HEADER ──────────── */}
      <section style={{
        background: isDark
          ? 'linear-gradient(135deg, #0B132B 0%, #152238 60%, #1E293B 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
        color: isDark ? '#ffffff' : '#0F172A',
        paddingTop: 36,
        paddingBottom: 48,
        paddingLeft: 'clamp(20px, 4vw, 60px)',
        paddingRight: 'clamp(20px, 4vw, 60px)',
        position: 'relative',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
      }}>
        {formattedHeroImg && (
          <img
            src={formattedHeroImg}
            alt=""
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            className="hero-bg-deco"
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', height: '100%', objectFit: 'cover', opacity: isDark ? 0.2 : 0.08, pointerEvents: 'none' }}
          />
        )}

        <div style={{ maxWidth: 1536, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <Link
              to="/blog"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: isDark ? '#52B5BD' : '#0284C7', textDecoration: 'none',
              }}
            >
              <ArrowLeft size={15} /> Back to Insights & News
            </Link>
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 18px', borderRadius: 30,
                border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid #CBD5E1',
                background: isDark ? '#131F37' : '#FFFFFF',
                fontSize: 12, fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A',
                cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <Share2 size={13} /> {copied ? 'Link Copied!' : 'Share Article'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{
              background: '#52B5BD', color: '#0B132B',
              fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 30, textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>
              {post.category_name || 'Insights'}
            </span>
            <span style={{ fontSize: 13, color: isDark ? '#cbd5e1' : '#64748B', fontWeight: 500 }}>
              <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} /> {formatDate(post.published_at)}
            </span>
            <span style={{ fontSize: 13, color: isDark ? '#cbd5e1' : '#64748B', fontWeight: 500 }}>
              <Clock size={13} style={{ display: 'inline', marginRight: 4 }} /> {readTime(post.content)}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800,
            color: isDark ? '#ffffff' : '#0F172A', lineHeight: 1.28, marginBottom: 14, maxWidth: 1040, letterSpacing: '-0.4px',
          }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, marginBottom: 20, maxWidth: 960, fontWeight: 500 }}>
              {post.excerpt}
            </p>
          )}

          {hasVideo && (
            <button
              onClick={() => setShowVideoModal(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 30, background: '#52B5BD',
                color: '#0B132B', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)',
              }}
            >
              <Play size={16} fill="#0B132B" /> Watch the video
            </button>
          )}
        </div>
      </section>

      {/* ── 3-COLUMN WIDESCREEN LAYOUT ──── */}
      <div style={{ maxWidth: 1536, margin: '0 auto', padding: '36px clamp(20px, 3vw, 40px)' }}>
        <div className="widescreen-3col-layout">

          {/* LEFT SIDEBAR */}
          <aside className="left-sidebar-col" style={{ display: 'grid', gap: 20, position: 'sticky', top: 100 }}>
            <div style={{
              background: isDark ? '#131F37' : '#FFFFFF',
              border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
              borderRadius: 16, padding: 18,
              boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.2)' : '0 4px 12px rgba(15,23,42,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 14, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 12 }}>
                <ShieldCheck size={18} color="#00D2B8" /> WHY Care Assurance
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 12, color: isDark ? '#cbd5e1' : '#475569', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#00D2B8" /> 100% Verified PROs
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#00D2B8" /> Doorstep Assistance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#00D2B8" /> Hospital Visit Escort
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#00D2B8" /> Senior Travel Companion
                </li>
              </ul>
            </div>

            <WhyAdSection adIndex={0} />
          </aside>

          {/* CENTER MAIN ARTICLE CONTENT COLUMN */}
          <main style={{ minWidth: 0 }}>
            {formattedFeaturedImg && (
              <div
                className="article-featured-img"
                style={{
                  borderRadius: 20, overflow: 'hidden', marginBottom: 28,
                  border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
                  boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 6px 20px rgba(15,23,42,0.06)',
                  aspectRatio: '16/9', background: isDark ? '#131F37' : '#F1F5F9',
                  width: '100%',
                }}
              >
                <img
                  src={formattedFeaturedImg}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Article Body */}
            <div
              className="article-body-card"
              style={{
                color: isDark ? '#e2e8f0' : '#334155',
                fontSize: 17, lineHeight: 1.85, marginBottom: 32,
                background: isDark ? '#131F37' : '#FFFFFF',
                padding: '32px 36px', borderRadius: 20,
                border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
                boxShadow: isDark ? 'none' : '0 2px 12px rgba(15,23,42,0.03)',
              }}
            >
              {post.content && post.content.includes('<') ? (
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{ fontSize: 17, lineHeight: 1.85, color: isDark ? '#e2e8f0' : '#334155' }}
                />
              ) : (
                (post.content || '').split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: 20, fontSize: 17, lineHeight: 1.85, color: isDark ? '#e2e8f0' : '#334155' }}>
                    {paragraph}
                  </p>
                ))
              )}
            </div>

            {/* IN-ARTICLE WHY SERVICE CARD */}
            <InArticleCard />

            {/* CTA BOOK NOW BANNER */}
            <div style={{
              background: isDark
                ? 'linear-gradient(135deg, #182642 0%, #1E293B 100%)'
                : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
              borderRadius: 18, padding: '24px 28px', color: isDark ? '#ffffff' : '#0F172A', marginBottom: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
              border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.25)' : '0 4px 16px rgba(15,23,42,0.06)',
            }}>
              <div>
                <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 4px 0', color: isDark ? '#ffffff' : '#0F172A' }}>
                  Need Trusted Companion Care for Hospital or Travel?
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: isDark ? '#cbd5e1' : '#475569' }}>
                  Our verified WHY PRO companions accompany your family members with complete care.
                </p>
              </div>
              <a
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 26px', borderRadius: 30, background: '#25D366',
                  color: '#ffffff', fontWeight: 800, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                }}
              >
                <WhatsAppIcon size={16} /> Book via WhatsApp
              </a>
            </div>

            {/* RELATED ARTICLES CARDS */}
            {relatedPosts.length > 0 && (
              <section style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0', paddingTop: 36, marginBottom: 48 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BookOpen size={22} color="#52B5BD" /> Continue Reading Articles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                  {relatedPosts.map((rp) => {
                    const rpImg = formatGoogleDriveUrl(rp.featured_image_url)
                    return (
                      <Link key={rp.id} to={`/blog/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                          background: isDark ? '#131F37' : '#FFFFFF',
                          borderRadius: 16, border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
                          overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
                          boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.2)' : '0 4px 12px rgba(15,23,42,0.04)',
                        }}>
                          {rpImg && (
                            <div style={{ height: 140, overflow: 'hidden', background: isDark ? '#1E293B' : '#F1F5F9' }}>
                              <img src={rpImg} alt={rp.title} referrerPolicy="no-referrer" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#52B5BD', textTransform: 'uppercase', marginBottom: 6 }}>{rp.category_name || 'Insights'}</span>
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A', lineHeight: 1.35, margin: '0 0 10px 0' }}>{rp.title}</h4>
                            <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: isDark ? '#52B5BD' : '#0284C7' }}>
                              Discover story <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* CUSTOMER FEEDBACK SECTION */}
            <div style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0', paddingTop: 36 }}>
              <CustomerFeedback variant={isDark ? "dark" : "light"} />
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside style={{ display: 'grid', gap: 24, position: 'sticky', top: 100 }}>
            {/* Newsletter Widget */}
            <div style={{
              background: isDark ? '#131F37' : '#FFFFFF',
              border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
              borderRadius: 18, padding: 22,
              boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.2)' : '0 4px 12px rgba(15,23,42,0.04)'
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', margin: '0 0 6px 0' }}>Subscribe to WHY Insights</h4>
              <p style={{ fontSize: 13, color: isDark ? '#cbd5e1' : '#475569', margin: '0 0 14px 0', lineHeight: 1.5, fontWeight: 500 }}>
                Get healthcare companion advice and company updates delivered to your inbox.
              </p>
              <form onSubmit={handleSidebarSubscribe} style={{ display: 'grid', gap: 10 }}>
                <input
                  type="text"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="Your Name *"
                  required
                  style={{
                    border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                    borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none',
                    background: isDark ? '#182642' : '#F8FAFC',
                    color: isDark ? '#ffffff' : '#0F172A'
                  }}
                />
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Enter your email address *"
                  required
                  style={{
                    border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                    borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none',
                    background: isDark ? '#182642' : '#F8FAFC',
                    color: isDark ? '#ffffff' : '#0F172A'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 18px', borderRadius: 8, border: 'none',
                    background: '#52B5BD', color: '#0B132B', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <Send size={14} /> Subscribe Now
                </button>
              </form>
              {subStatus && <div style={{ fontSize: 12, fontWeight: 600, color: '#00D2B8', marginTop: 8 }}>{subStatus}</div>}
            </div>

            <SidebarWidget />
          </aside>
        </div>
      </div>
    </article>
  )
}