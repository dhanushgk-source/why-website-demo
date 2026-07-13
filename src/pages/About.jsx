import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionFade } from '../hooks/useSectionFade'
import {
  Heart,
  ShieldCheck,
  MapPin,
  Wallet,
  Users,
  Compass,
  Quote,
  Phone,
  Info,
  X,
} from 'lucide-react'
import { PHONE_DISPLAY, PHONE_LINK, getWhatsAppLink, LOCATIONS, LOCATIONS_NOTE } from '../config/contact'

const API_BASE = import.meta.env.VITE_API_URL || 'https://why-website-backend.onrender.com/api'

const VALUES = [
  {
    icon: Compass,
    title: "We're not trying to be everywhere",
    desc: "Hospital visits and travel assistance, done properly, in one city we actually know — instead of spreading ourselves thin across ten.",
  },
  {
    icon: ShieldCheck,
    title: 'Check for yourself',
    desc: "Every companion is issued a verified ID card with a unique QR code you can scan. It'll tell you, right then, whether the person at your door is who we say they are.",
  },
  {
    icon: Wallet,
    title: 'No surprises on the bill',
    desc: "Prices are posted before you book, no subscription tricks. You pay 30% to lock it in, and the rest once the visit's actually done and gone well.",
  },
  {
    icon: Users,
    title: 'One coordinator who gets to know you',
    desc: "Not a call centre. A real person who remembers your father takes his tea at 4, not 4:30, and picks companions who'd treat him the way they'd treat their own.",
  },
]

const STATS = [
  { label: 'Pro Verification Stages', value: '7' },
  { label: 'Insured', value: 'Every visit' },
  { label: 'Subscription required', value: 'None' },
  { label: 'City we call home', value: 'Bengaluru' },
]

function Section({ children, className = '', id }) {
  const ref = useSectionFade()
  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      {children}
    </section>
  )
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function TeamAvatar({ member, className }) {
  const [imgSrc, setImgSrc] = useState(member.image_url || null)
  const [retried, setRetried] = useState(false)
  const [failed, setFailed] = useState(false)

  const hasPhoto = Boolean(imgSrc) && !failed

  function handleError() {
    if (!retried) {
      setRetried(true)
      setTimeout(() => {
        setImgSrc(`${member.image_url}${member.image_url.includes('?') ? '&' : '?'}retry=${Date.now()}`)
      }, 1500)
    } else {
      setFailed(true)
    }
  }

  if (!hasPhoto) {
    return (
      <div
        className={`flex items-center justify-center text-white font-display font-bold ${className}`}
        style={{ background: 'linear-gradient(135deg, #F2711F, #0D9488)' }}
      >
        {getInitials(member.name)}
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={member.name}
      loading="lazy"
      onError={handleError}
      className={`object-cover ${className}`}
    />
  )
}

function TeamCard({ member, onOpen }) {
  return (
    <div className="group">
      {/* Photo, with view-profile icon */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-md bg-white">
        <TeamAvatar member={member} className="w-full h-full text-4xl" />

        <button
          type="button"
          onClick={() => onOpen(member)}
          aria-label={`View ${member.name}'s full profile`}
          className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}
        >
          <Info className="w-[18px] h-[18px]" style={{ color: '#1B2A4A' }} strokeWidth={2.25} />
        </button>
      </div>

      {/* Name / role / department */}
      <p className="font-display font-bold text-base" style={{ color: '#1B2A4A' }}>
        {member.name}
      </p>
      <p className="text-sm mt-0.5" style={{ color: '#5a6b83' }}>
        {member.designation}
      </p>
      {member.department && (
        <p className="text-xs mt-1" style={{ color: '#8a9ab0' }}>
          {member.department}
        </p>
      )}
    </div>
  )
}

function TeamCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-square rounded-2xl mb-4 bg-[#F7F3EA]" />
      <div className="h-4 w-3/4 rounded bg-[#F7F3EA] mb-2" />
      <div className="h-3 w-1/2 rounded bg-[#F7F3EA]" />
    </div>
  )
}

function TeamProfileModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!member) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(27,42,74,0.55)', backdropFilter: 'blur(3px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-[modalIn_0.18s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/5 z-10"
          style={{ background: '#F7F3EA' }}
        >
          <X className="w-[18px] h-[18px]" style={{ color: '#1B2A4A' }} />
        </button>

        <div className="pt-8 px-7 pb-3 flex flex-col items-center text-center">
          <TeamAvatar member={member} className="w-28 h-28 rounded-full text-3xl shadow-md mb-4" />
          <p className="font-display font-bold text-xl" style={{ color: '#1B2A4A' }}>
            {member.name}
          </p>
          <p className="text-sm mt-1" style={{ color: '#F2711F' }}>
            {member.designation}
          </p>
          {member.department && (
            <span
              className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: '#F7F3EA', color: '#5a6b83' }}
            >
              {member.department.trim()}
            </span>
          )}
        </div>

        <div className="px-7 pb-8 pt-4">
          {member.biography ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#8a9ab0' }}>
                About
              </p>
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: '#5a6b83' }}>
                {member.biography}
              </p>
            </>
          ) : (
            <p className="text-sm text-center" style={{ color: '#8a9ab0' }}>
              No biography added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [team, setTeam] = useState([])
  const [teamLoading, setTeamLoading] = useState(true)
  const [teamError, setTeamError] = useState('')
  const [teamFilter, setTeamFilter] = useState('All')
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadTeam() {
      setTeamLoading(true)
      setTeamError('')
      try {
        const res = await fetch(`${API_BASE}/team`)
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Failed to load team')
        if (!cancelled) setTeam(data.team || [])
      } catch (err) {
        if (!cancelled) setTeamError("Couldn't load the team right now — please try again shortly.")
      } finally {
        if (!cancelled) setTeamLoading(false)
      }
    }

    loadTeam()
    return () => {
      cancelled = true
    }
  }, [])

  const teamFilters = ['All', ...Array.from(new Set(team.map((m) => m.department).filter(Boolean)))]

  const filteredTeam = teamFilter === 'All' ? team : team.filter((m) => m.department === teamFilter)

  return (
    <div className="bg-[#F7F3EA]">
      {/* ================= HERO ================= */}
      <Section id="about-hero" className="pt-24 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-10 -left-24 w-96 h-96 rounded-full bg-[#F2C89F]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-24 w-[26rem] h-[26rem] rounded-full bg-[#7FC8C0]/20 blur-3xl pointer-events-none" />

        {/* connecting-distance motif */}
        <svg
          className="hidden md:block absolute top-1/2 right-10 -translate-y-1/2 w-64 h-40 opacity-40 pointer-events-none"
          viewBox="0 0 220 120"
          fill="none"
        >
          <circle cx="20" cy="100" r="7" fill="#F2711F" />
          <circle cx="200" cy="20" r="7" fill="#0D9488" />
          <path
            d="M20 100 C 80 100, 100 20, 200 20"
            stroke="#1B2A4A"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-5 bg-white shadow-sm" style={{ color: '#F2711F' }}>
            <Heart className="w-4 h-4" fill="#F2711F" strokeWidth={0} />
            Our Story
          </span>

          <h1 className="fade-inner font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-5" style={{ color: '#1B2A4A' }}>
            Being far away shouldn't mean{' '}
            <span style={{ color: '#F2711F' }}>being absent.</span>
          </h1>

          <p className="fade-inner text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: '#5a6b83' }}>
            You know the call. It's usually mid-workday, and it starts with "Amma's not
            feeling well" — and then that awful feeling of doing math on flight times when
            what you actually want is to just walk over. We started WHY so someone reliable
            could do that walking-over part for you.
          </p>
        </div>

        {/* stat strip */}
        <div className="fade-inner relative mt-12 max-w-4xl mx-auto px-6 z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#F2711F' }}>{s.value}</p>
                <p className="text-xs sm:text-sm mt-1" style={{ color: '#8a9ab0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= FOUNDER STORY ================= */}
      <Section id="about-founder" className="py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="fade-inner md:col-span-2 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F2C89F] to-[#7FC8C0] opacity-40 blur-xl" />
              <div className="relative w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center">
                <Quote className="w-16 h-16 text-[#F2711F]/25" fill="currentColor" strokeWidth={0} />
              </div>
            </div>
          </div>

          <div className="fade-inner md:col-span-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#0D9488' }}>
              Why we built this
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: '#1B2A4A' }}>
              Honestly, it's a pretty ordinary story
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-3" style={{ color: '#5a6b83' }}>
              Our founder's been living away from home for years now, same as a lot of us on
              the team. One more name in the family group chat asking "did anyone go check on
              Appa today?" It's not a big dramatic worry — it's the quiet kind that just sits
              there in the background of every ordinary day.
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#5a6b83' }}>
              At some point that turned into an actual question: what if there was someone you
              could trust properly — checked, insured, and just genuinely decent — to be your
              hands and your presence on the days you can't be there yourself? That question is
              basically the whole reason WHY exists. Everything else — the verification system,
              the team, the pricing — grew out of trying to answer it properly.
            </p>
          </div>
        </div>
      </Section>

      {/* ================= TEAM ================= */}
      <Section id="about-team" className="py-14 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: '#1B2A4A' }}>
              A team of real people
            </h2>
            <p className="fade-inner text-base sm:text-lg leading-relaxed" style={{ color: '#5a6b83' }}>
              We're building a team that actually understands what families go through.
              Get to know the people finding companions, checking backgrounds, and picking
              up the phone at 2am when something's wrong. Tap the <Info className="inline w-3.5 h-3.5 -mt-0.5" /> icon on a photo for their full story.
            </p>
          </div>

          {/* Filter pills — built from whatever departments come back from the API */}
          {!teamLoading && !teamError && teamFilters.length > 1 && (
            <div className="fade-inner flex flex-wrap gap-2 mb-8">
              {teamFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTeamFilter(filter)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
                  style={
                    teamFilter === filter
                      ? { background: '#1B2A4A', color: '#fff', borderColor: '#1B2A4A' }
                      : { background: '#F7F3EA', color: '#5a6b83', borderColor: 'transparent' }
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {teamLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <TeamCardSkeleton key={i} />
              ))}
            </div>
          ) : teamError ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#5a6b83' }}>{teamError}</p>
            </div>
          ) : filteredTeam.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#5a6b83' }}>No team members to show yet.</p>
            </div>
          ) : (
            <div className="fade-inner grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {filteredTeam.map((member) => (
                <TeamCard key={member.id} member={member} onOpen={setSelectedMember} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {selectedMember && (
        <TeamProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {/* ================= VALUES ================= */}
      <Section id="about-values" className="py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: '#1B2A4A' }}>
              What actually matters to us
            </h2>
            <p className="fade-inner text-base sm:text-lg max-w-xl mx-auto" style={{ color: '#5a6b83' }}>
              Four things we keep coming back to — when we're hiring, pricing, or just deciding how to handle a hard day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="fade-inner group bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#F7F3EA] shadow-sm group-hover:bg-[#F2711F] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#F2711F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#1B2A4A' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5a6b83' }}>{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ================= WHERE WE ARE ================= */}
      <Section id="about-locations" className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-5 bg-white shadow-sm" style={{ color: '#0D9488' }}>
            <MapPin className="w-4 h-4" />
            Where we are
          </span>
          <h2 className="fade-inner font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: '#1B2A4A' }}>
            Launching Soon in {LOCATIONS.join(' and ')} — 
            <span style={{color : ' #52B5BD'}}>Growing with Purpose</span>
             
          </h2>
          <p className="fade-inner text-base sm:text-lg leading-relaxed" style={{ color: '#5a6b83' }}>
           We're focused on delivering exceptional service in Bengaluru and Chennai before expanding to more cities {LOCATIONS_NOTE}
          </p>
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <Section id="about-cta" className="pb-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="fade-inner relative rounded-[2rem] overflow-hidden px-8 py-12 sm:px-14 sm:py-14 text-center" style={{ background: 'linear-gradient(135deg, #1B2A4A, #0D9488)' }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <h2 className="relative font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              One message, and it's off your plate.
            </h2>
            <p className="relative text-white/70 mb-6 max-w-lg mx-auto">
              Tell us who needs help, and when — a verified companion takes it from there.
            </p>

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white font-semibold shadow-md hover:scale-105 transition-transform"
                style={{ color: '#1B2A4A' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.15-4.94-4.34-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.3-.29.47-.15.16-.31.36-.44.48-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.75-.17 1.42z" />
                </svg>
                Book on WhatsApp
              </a>

              <a
                href={PHONE_LINK}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition"
              >
                <Phone className="w-5 h-5" />
                Call 24/7: {PHONE_DISPLAY}
              </a>
            </div>

            <p className="relative mt-5 text-sm text-white/50">
              Just browsing for now?{' '}
              <Link to="/" className="underline underline-offset-4 hover:text-white transition-colors">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}