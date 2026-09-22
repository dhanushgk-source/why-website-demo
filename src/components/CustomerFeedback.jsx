import { useEffect, useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, MessageSquarePlus, X, Send, CheckCircle2, ExternalLink } from 'lucide-react'
import { useSectionFade } from '../hooks/useSectionFade'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://why-backend-demo.vercel.app/api'

const DEFAULT_GOOGLE_REVIEW_URL = "https://www.google.com/search?q=WHY+SERVICES+INDIA+PRIVATE+LIMITED#lrd=0x3bae1768b32b2e83:0x3c1de72d6ced074b,1,,,,";

// Initial seed testimonials used as fallback if backend DB is empty
const INITIAL_TESTIMONIALS = [
  {
    id: 'g_rev_saritha_madhuri',
    name: 'Saritha Madhuri',
    role_or_title: 'Google Reviewer',
    service_type: 'Google Review',
    feedback_text:
      'A very practical and much-needed initiative. Professional, kind, and handles elder assistance with the patience it actually requires.',
    rating: 5,
    source: 'google',
    review_url: DEFAULT_GOOGLE_REVIEW_URL,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g_rev_rakesh_gowda',
    name: 'Rakesh Gowda',
    role_or_title: 'Google Reviewer',
    service_type: 'Google Review',
    feedback_text:
      "This is a very helpful program for people. Love the idea and initiative, it's something new and needed.",
    rating: 5,
    source: 'google',
    review_url: DEFAULT_GOOGLE_REVIEW_URL,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g_rev_shriya_a',
    name: 'Shriya A',
    role_or_title: 'Google Reviewer',
    service_type: 'Google Review',
    feedback_text:
      "Excellent service from WHY – We Help You. Their background-verified WHY PRO was caring, professional, and supportive during my family's hospital visit.",
    rating: 5,
    source: 'google',
    review_url: DEFAULT_GOOGLE_REVIEW_URL,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g_rev_devavirudan',
    name: 'DEVAVIRUDAN',
    role_or_title: 'Google Reviewer',
    service_type: 'Google Review',
    feedback_text: 'Good servic3',
    rating: 5,
    source: 'google',
    review_url: DEFAULT_GOOGLE_REVIEW_URL,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g_rev_sneha_kondli',
    name: 'Sneha Kondli',
    role_or_title: 'Google Reviewer',
    service_type: 'Google Review',
    feedback_text:
      'Why Services is a thoughtful initiative that addresses a real need by providing reliable assistance, especially for families managing elder care.',
    rating: 5,
    source: 'google',
    review_url: DEFAULT_GOOGLE_REVIEW_URL,
    created_at: new Date().toISOString(),
  },
]

function getInitials(name) {
  if (!name || typeof name !== 'string') return 'C'
  const cleanName = name.trim().replace(/[^a-zA-Z0-9\s]/g, '')
  const words = cleanName.split(/\s+/).filter(Boolean)
  if (words.length === 0) return 'C'
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

function InitialsAvatar({ name, photoUrl, className = '', isLight = false, fontSize = 'text-sm' }) {
  const [imgError, setImgError] = useState(false)
  const initials = getInitials(name)

  const isValidPhoto = Boolean(
    !imgError &&
    photoUrl &&
    typeof photoUrl === 'string' &&
    photoUrl.trim() !== '' &&
    !photoUrl.includes('dicebear') &&
    !photoUrl.includes('personas') &&
    !photoUrl.includes('undefined') &&
    (photoUrl.startsWith('http://') || photoUrl.startsWith('https://') || photoUrl.startsWith('data:'))
  )

  if (isValidPhoto) {
    return (
      <img
        src={photoUrl}
        alt={name || 'Customer'}
        className={`${className} object-cover`}
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div
      className={`${className} flex items-center justify-center font-bold font-sans select-none ${fontSize} ${
        isLight
          ? 'bg-[#1B2A4A] text-[#52B5BD]'
          : 'bg-[#182642] text-[#52B5BD] border border-[#52B5BD]/30'
      }`}
      aria-label={name || 'Customer avatar'}
    >
      {initials}
    </div>
  )
}

function Stars({ count = 5, className = 'w-4 h-4' }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < count ? 'text-[#F59E0B]' : 'text-gray-300'}`}
          fill={i < count ? '#F59E0B' : 'none'}
          strokeWidth={i < count ? 0 : 1.5}
        />
      ))}
    </div>
  )
}

function getCandidateApiUrls() {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL
  const configured = envUrl ? (envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/+$/, '')}/api`) : null
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

  const urls = []
  if (isLocal) urls.push('http://localhost:5000/api')
  if (configured) urls.push(configured)
  urls.push('https://why-backend-demo.vercel.app/api')

  return [...new Set(urls)]
}

let activeWorkingApiUrl = null

async function postWithFallback(endpoint, payload) {
  const candidates = activeWorkingApiUrl ? [activeWorkingApiUrl, ...getCandidateApiUrls()] : getCandidateApiUrls()
  let lastError = null

  for (const baseUrl of [...new Set(candidates)]) {
    try {
      const url = `${baseUrl.replace(/\/+$/, '')}${endpoint}`
      const res = await axios.post(url, payload)
      activeWorkingApiUrl = baseUrl
      return res.data
    } catch (err) {
      lastError = err
      if (err.response?.status === 404 || !err.response) {
        continue
      }
      throw err
    }
  }
  throw lastError
}

async function getWithFallback(endpoint) {
  const candidates = activeWorkingApiUrl ? [activeWorkingApiUrl, ...getCandidateApiUrls()] : getCandidateApiUrls()

  for (const baseUrl of [...new Set(candidates)]) {
    try {
      const url = `${baseUrl.replace(/\/+$/, '')}${endpoint}`
      const res = await axios.get(url)
      activeWorkingApiUrl = baseUrl
      return res.data
    } catch (err) {
      if (err.response?.status === 404 || !err.response) {
        continue
      }
      throw err
    }
  }
  return null
}

export default function CustomerFeedback({ variant = "dark" }) {
  const isLight = variant === "light";
  const sectionRef = useSectionFade()
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role_or_title: '',
    service_type: 'Hospital Assistance',
    rating: 5,
    feedback_text: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  const [maxWordLimit, setMaxWordLimit] = useState(60)

  // Fetch approved public testimonials & site word limit setting from backend API
  useEffect(() => {
    async function fetchPublicFeedback() {
      try {
        const data = await getWithFallback('/testimonials')
        if (data?.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials)
        }
      } catch (err) {
        console.warn('Could not fetch live testimonials, using fallbacks:', err.message)
      }
    }
    async function fetchSettings() {
      try {
        const data = await getWithFallback('/settings/public')
        if (data?.success && data?.settings?.testimonial_word_limit) {
          setMaxWordLimit(parseInt(data.settings.testimonial_word_limit, 10))
        }
      } catch (err) {
        console.warn('Could not fetch public settings, using default limit 60:', err)
      }
    }
    fetchPublicFeedback()
    fetchSettings()
  }, [])

  const count = testimonials.length

  const goTo = (index) => {
    setActive(((index % count) + count) % count)
  }

  const next = () => goTo(active + 1)
  const prev = () => goTo(active - 1)

  useEffect(() => {
    if (paused || count <= 1 || modalOpen) return
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % count)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused, count, modalOpen])

  const featured = testimonials[active] || testimonials[0]
  const previewIndexes = count > 1 ? [1, 2].map((offset) => (active + offset) % count) : []

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    else if (delta < -50) next()
    touchStartX.current = null
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault()
    if (!formState.name.trim()) {
      setFormError('Please enter your name.')
      return
    }
    if (!formState.feedback_text.trim()) {
      setFormError('Please share your feedback or experience.')
      return
    }
    const wordCount = formState.feedback_text.trim().split(/\s+/).filter(Boolean).length
    if (wordCount > maxWordLimit) {
      setFormError(`Feedback text must not exceed ${maxWordLimit} words (currently ${wordCount} words).`)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      const data = await postWithFallback('/testimonials', formState)
      if (data?.success) {
        setSubmittedSuccess(true)
      } else {
        setFormError(data?.message || 'Failed to submit feedback. Please try again.')
      }
    } catch (err) {
      console.error('Feedback submit error:', err)
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? 'Backend endpoint /api/testimonials was not found.'
          : 'Network error connecting to backend. Please check your backend server.')
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  function resetAndCloseModal() {
    setModalOpen(false)
    setSubmittedSuccess(false)
    setFormError('')
    setFormState({
      name: '',
      email: '',
      role_or_title: '',
      service_type: 'Hospital Assistance',
      rating: 5,
      feedback_text: '',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="feedback-section"
      className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden ${isLight ? 'bg-[#F7F3EA]' : 'bg-[#0B132B]'}`}
      style={!isLight ? { background: 'linear-gradient(180deg, #0B132B 0%, #0F172A 100%)' } : {}}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft decorative background accents */}
      {isLight ? (
        <>
          <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#F2C89F]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#52B5BD]/20 blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#52B5BD]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#00D2B8]/10 blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-10">

        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-16">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-md ${
            isLight
              ? 'bg-white text-[#2F4A7D] border border-[#52B5BD]/20 shadow-sm'
              : 'bg-[#182642] text-[#52B5BD] border border-[#52B5BD]/30'
          }`}>
            <Quote className="w-4 h-4 text-[#52B5BD]" />
            REAL STORIES, REAL SUPPORT
          </div>

          <h2 className={`font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-[#1B2A4A]' : 'text-white'
          }`}>
            Trusted by Families <span className="text-[#52B5BD]">& Clients</span>
          </h2>

          <p className={`max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed font-normal ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Read authentic reviews from families and clients who rely on WHY Services for trusted companionship and assistance.
          </p>

          {/* Action Bar: Aggregate Rating & "Share Your Experience" Button */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className={`flex items-center gap-2.5 px-6 py-3 rounded-full shadow-lg border ${
              isLight
                ? 'bg-white border-slate-200 text-[#1B2A4A]'
                : 'bg-[#131F37] border-slate-700/60 text-white'
            }`}>
              <Stars count={5} className="w-4 h-4" />
              <span className="font-bold text-sm">4.9 / 5.0</span>
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Verified Client Rating</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2.5 px-7 py-3 rounded-full text-white font-bold text-sm shadow-xl hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ background: isLight ? 'linear-gradient(135deg, #52B5BD, #2F4A7D)' : 'linear-gradient(135deg, #00D2B8, #52B5BD)' }}
            >
              <MessageSquarePlus className="w-4 h-4" />
              Share Your Feedback
            </button>
          </div>
        </div>

        {/* Main Testimonials Section */}
        {featured && (
          <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >

            {/* Featured Main Card (Full width on Mobile, 3 cols on Desktop) */}
            <div className="lg:col-span-3 relative flex flex-col justify-between">
              <div
                key={featured.id || active}
                className={`relative rounded-[2rem] p-6 sm:p-10 lg:p-12 h-full flex flex-col justify-between overflow-hidden border ${
                  isLight
                    ? 'bg-white shadow-xl border-slate-100'
                    : 'bg-[#131F37] shadow-2xl border-slate-700/60'
                }`}
              >
                {/* Watermark quote glyph */}
                <Quote
                  className={`absolute -top-4 -right-2 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none ${
                    isLight ? 'text-[#52B5BD]/[0.08]' : 'text-[#52B5BD]/[0.06]'
                  }`}
                  fill="currentColor"
                  strokeWidth={0}
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <Stars count={featured.rating || 5} className="w-5 h-5" />
                    {featured.source === 'google' || featured.google_review_id ? (
                      <a
                        href={
                          featured.review_url ||
                          featured.google_review_url ||
                          (typeof featured.google_review_id === 'string' && featured.google_review_id.startsWith('http') ? featured.google_review_id : null) ||
                          DEFAULT_GOOGLE_REVIEW_URL
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#4285F4]/15 text-[#4285F4] hover:bg-[#4285F4]/25 hover:scale-105 transition-all duration-200 border border-[#4285F4]/30 flex items-center gap-1.5 cursor-pointer no-underline group/glink"
                        title="Click to view authentic Google Review"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>Google Review</span>
                        <ExternalLink className="w-3 h-3 opacity-70 group-hover/glink:opacity-100" />
                      </a>
                    ) : (
                      featured.service_type && (
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                          isLight
                            ? 'bg-[#52B5BD]/10 text-[#2F4A7D]'
                            : 'bg-[#52B5BD]/15 text-[#52B5BD] border border-[#52B5BD]/30'
                        }`}>
                          {featured.service_type}
                        </span>
                      )
                    )}
                  </div>

                  <p className={`mt-2 text-base sm:text-xl md:text-2xl leading-relaxed font-sans font-normal tracking-normal ${
                    isLight ? 'text-[#1B2A4A]' : 'text-slate-100'
                  }`}>
                    “{featured.feedback_text}”
                  </p>
                </div>

                <div className={`relative mt-6 sm:mt-8 flex items-center justify-between gap-4 pt-6 border-t ${
                  isLight ? 'border-slate-100' : 'border-slate-700/60'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                      <InitialsAvatar
                        name={featured.name}
                        photoUrl={featured.profile_photo_url || featured.photo_url || featured.avatar_url}
                        isLight={isLight}
                        fontSize="text-base sm:text-lg"
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md ring-4 ${
                          isLight ? 'ring-[#F7F3EA]' : 'ring-[#182642]'
                        }`}
                      />
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center ring-2 ${
                        isLight ? 'ring-white' : 'ring-[#131F37]'
                      }`} title="Verified Customer">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      </span>
                    </div>
                    <div>
                      <p className={`font-bold text-base sm:text-lg font-sans ${isLight ? 'text-[#1B2A4A]' : 'text-white'}`}>
                        {featured.name}
                      </p>
                      <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-500' : 'text-[#52B5BD]'}`}>
                        {featured.role_or_title || (featured.source === 'google' || featured.google_review_id ? 'Google Reviewer' : 'Valued Client')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE ONLY: Slider Dots & Arrow Controls directly underneath single card */}
              <div className="flex lg:hidden items-center justify-between px-2 pt-4">
                <div className="flex items-center gap-1.5">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id || i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active
                          ? 'w-7 bg-[#52B5BD]'
                          : isLight
                          ? 'w-2 bg-[#1B2A4A]/20 hover:bg-[#1B2A4A]/40'
                          : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                      isLight
                        ? 'bg-white shadow-sm hover:bg-[#52B5BD] hover:text-white text-[#1B2A4A] border border-slate-200/60'
                        : 'bg-[#182642] border border-slate-700/60 shadow-md hover:bg-[#52B5BD] hover:text-white text-slate-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                      isLight
                        ? 'bg-white shadow-sm hover:bg-[#52B5BD] hover:text-white text-[#1B2A4A] border border-slate-200/60'
                        : 'bg-[#182642] border border-slate-700/60 shadow-md hover:bg-[#52B5BD] hover:text-white text-slate-200'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* DESKTOP ONLY: Preview Side List + Controls (hidden on mobile, flex on desktop) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-5">
              {previewIndexes.map((idx) => {
                const item = testimonials[idx]
                if (!item) return null
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => goTo(idx)}
                    className={`group text-left rounded-2xl p-5 flex-1 flex flex-col justify-between transition-all duration-300 border cursor-pointer ${
                      isLight
                        ? 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md border-slate-200/60 hover:border-[#52B5BD]/30'
                        : 'bg-[#182642]/80 hover:bg-[#1E293B] shadow-lg border-slate-700/50 hover:border-[#52B5BD]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Stars count={item.rating || 5} className="w-3.5 h-3.5" />
                        {item.source === 'google' || item.google_review_id ? (
                          <span className="text-[11px] font-bold text-[#4285F4] flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            Google Review
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-[#52B5BD]">
                            {item.service_type || 'Care Service'}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed font-sans line-clamp-2 font-normal ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        “{item.feedback_text}”
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <InitialsAvatar
                        name={item.name}
                        photoUrl={item.profile_photo_url || item.photo_url || item.avatar_url}
                        isLight={isLight}
                        fontSize="text-xs"
                        className={`w-9 h-9 rounded-full shadow-sm flex-shrink-0 ${!isLight ? 'ring-2 ring-slate-700' : ''}`}
                      />
                      <div>
                        <p className={`font-bold text-xs font-sans ${isLight ? 'text-[#1B2A4A]' : 'text-white'}`}>
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">{item.role_or_title || (item.source === 'google' || item.google_review_id ? 'Google Reviewer' : 'Client')}</p>
                      </div>
                      <span className="ml-auto text-[#52B5BD] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                )
              })}

              {/* Desktop Slider Controls */}
              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex items-center gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id || i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active
                          ? 'w-7 bg-[#52B5BD]'
                          : isLight
                          ? 'w-2 bg-[#1B2A4A]/20 hover:bg-[#1B2A4A]/40'
                          : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                      isLight
                        ? 'bg-white shadow-sm hover:bg-[#52B5BD] hover:text-white text-[#1B2A4A] border border-slate-200/60'
                        : 'bg-[#182642] border border-slate-700/60 shadow-md hover:bg-[#52B5BD] hover:text-white text-slate-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                      isLight
                        ? 'bg-white shadow-sm hover:bg-[#52B5BD] hover:text-white text-[#1B2A4A] border border-slate-200/60'
                        : 'bg-[#182642] border border-slate-700/60 shadow-md hover:bg-[#52B5BD] hover:text-white text-slate-200'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SUBMIT FEEDBACK MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border border-slate-100">

            <button
              onClick={resetAndCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submittedSuccess ? (
              <>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#52B5BD]/10 text-[#2F4A7D] mb-2">
                    WE VALUE YOUR VOICE
                  </span>
                  <h3 className="text-2xl font-bold text-[#1B2A4A]">Share Your Experience</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Your story helps other families trust WHY Services for dependable companion care.
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#52B5BD] text-sm text-[#1B2A4A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="priya@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#52B5BD] text-sm text-[#1B2A4A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Role / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Daughter · London"
                        value={formState.role_or_title}
                        onChange={(e) => setFormState({ ...formState, role_or_title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#52B5BD] text-sm text-[#1B2A4A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Service Used
                      </label>
                      <select
                        value={formState.service_type}
                        onChange={(e) => setFormState({ ...formState, service_type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#52B5BD] text-sm text-[#1B2A4A]"
                      >
                        <option value="Hospital Assistance">Hospital Assistance</option>
                        <option value="Travel Assistance">Travel Assistance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Rating (1 to 5 Stars)
                      </label>
                      <div className="flex items-center gap-1.5 pt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFormState({ ...formState, rating: star })}
                            className="focus:outline-none cursor-pointer transform hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formState.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Feedback / Story *
                      </label>
                      <span className={`text-xs font-semibold ${
                        formState.feedback_text.trim().split(/\s+/).filter(Boolean).length > maxWordLimit
                          ? 'text-red-500 font-bold'
                          : 'text-slate-400'
                      }`}>
                        {formState.feedback_text.trim().split(/\s+/).filter(Boolean).length} / {maxWordLimit} words
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder={`Tell us about your experience with WHY Services companion care (max ${maxWordLimit} words)...`}
                      value={formState.feedback_text}
                      onChange={(e) => setFormState({ ...formState, feedback_text: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        formState.feedback_text.trim().split(/\s+/).filter(Boolean).length > maxWordLimit
                          ? 'border-red-400 ring-2 ring-red-200'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#52B5BD]'
                      } focus:outline-none text-sm text-[#1B2A4A]`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
                    >
                      {submitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Feedback for Verification</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">Thank You!</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Your feedback has been submitted successfully and is pending review by our team. Once approved, it will be published to inspire other families.
                </p>
                <button
                  onClick={resetAndCloseModal}
                  className="px-6 py-2.5 rounded-full bg-[#52B5BD] text-white font-semibold text-sm hover:bg-[#3ea0a8] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
