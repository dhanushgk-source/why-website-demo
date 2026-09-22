import { useEffect, useState } from 'react'
import { ShieldCheck, MapPin, Info, X, Star, Languages, Award, Briefcase, CheckCircle } from 'lucide-react'
import { useSectionFade } from '../hooks/useSectionFade'

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://why-website-backend.onrender.com/api';

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

function ProAvatar({ pro, fieldVisibility, showImageSetting, className }) {
  const [imgSrc, setImgSrc] = useState(pro.image_url || null)
  const [failed, setFailed] = useState(false)

  const isPhotoEnabled = fieldVisibility?.photo !== false && showImageSetting !== false
  const hasPhoto = isPhotoEnabled && Boolean(imgSrc) && !failed

  if (!hasPhoto) {
    return (
      <div
        className={`flex items-center justify-center text-white font-display font-bold select-none ${className}`}
        style={{ background: 'linear-gradient(135deg, #1B2A4A, #0D9488)' }}
      >
        {getInitials(pro.name)}
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={pro.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}

function ProCard({ pro, settings, onOpenModal }) {
  const vis = typeof pro.field_visibility === 'object' && pro.field_visibility ? pro.field_visibility : {}

  const servicesList = Array.isArray(pro.services)
    ? pro.services
    : typeof pro.services === 'string'
    ? JSON.parse(pro.services || '[]')
    : []

  const showName = vis.name !== false
  const showDesignation = vis.designation !== false
  const showBadge = vis.verification_badge !== false && settings.show_verification_badge !== false && pro.is_verified
  const showCity = vis.city !== false && settings.show_location !== false && Boolean(pro.city)
  const showServices = vis.services !== false && settings.show_services !== false && servicesList.length > 0
  const showBio = vis.bio !== false && settings.show_description !== false && Boolean(pro.bio)
  const showButton = vis.view_profile_button !== false && settings.show_view_profile !== false

  return (
    <div
      className={`group relative flex flex-col h-full bg-white rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border ${
        pro.is_featured ? 'border-[#0D9488]/40 shadow-md' : 'border-black/5 shadow-sm'
      }`}
    >
      {/* Featured Badge */}
      {pro.is_featured && (
        <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#F2711F]/10 text-[#F2711F] border border-[#F2711F]/20">
          <Star className="w-3 h-3 fill-current" />
          Featured PRO
        </div>
      )}

      {/* Photo Frame */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[#F7F3EA] shadow-inner">
        <ProAvatar
          pro={pro}
          fieldVisibility={vis}
          showImageSetting={settings.show_profile_image}
          className="w-full h-full text-4xl"
        />

        {showButton && (
          <button
            type="button"
            onClick={() => onOpenModal(pro)}
            aria-label={`View ${pro.name}'s professional profile`}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
            style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(4px)' }}
          >
            <Info className="w-5 h-5" style={{ color: '#1B2A4A' }} strokeWidth={2.25} />
          </button>
        )}
      </div>

      {/* Profile Details */}
      {showName && (
        <h3 className="font-display font-bold text-lg leading-tight" style={{ color: '#1B2A4A' }}>
          {pro.name}
        </h3>
      )}

      {showDesignation && (
        <p className="text-sm font-semibold mt-0.5" style={{ color: '#0D9488' }}>
          {pro.designation || 'WHY PRO'}
        </p>
      )}

      {/* Verification Indicator */}
      {showBadge && (
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-1 rounded-md w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Professional
        </div>
      )}

      {/* Service Tags */}
      {showServices && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {servicesList.map((svc) => (
            <span
              key={svc}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F7F3EA]"
              style={{ color: '#1B2A4A' }}
            >
              {svc}
            </span>
          ))}
        </div>
      )}

      {/* Location */}
      {showCity && (
        <p className="text-xs font-medium flex items-center gap-1 mt-3" style={{ color: '#64748b' }}>
          <MapPin className="w-3.5 h-3.5" style={{ color: '#0D9488' }} />
          {pro.city}
          {vis.service_area !== false && pro.service_area ? ` • ${pro.service_area}` : ''}
        </p>
      )}

      {/* Short Bio */}
      {showBio && (
        <p className="text-xs leading-relaxed mt-3 line-clamp-3" style={{ color: '#5a6b83' }}>
          {pro.bio}
        </p>
      )}

      {/* Bottom Profile Button Action */}
      {showButton && (
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onOpenModal(pro)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center transition-colors duration-200 border border-[#1B2A4A]/15 hover:bg-[#1B2A4A] hover:text-white cursor-pointer"
            style={{ color: '#1B2A4A', background: '#F7F3EA' }}
          >
            View Full Profile
          </button>
        </div>
      )}
    </div>
  )
}

function ProProfileModal({ pro, settings, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!pro) return null

  const vis = typeof pro.field_visibility === 'object' && pro.field_visibility ? pro.field_visibility : {}

  const servicesList = Array.isArray(pro.services)
    ? pro.services
    : typeof pro.services === 'string'
    ? JSON.parse(pro.services || '[]')
    : []

  const languagesList = Array.isArray(pro.languages)
    ? pro.languages
    : typeof pro.languages === 'string'
    ? JSON.parse(pro.languages || '[]')
    : []

  const showName = vis.name !== false
  const showDesignation = vis.designation !== false
  const showBadge = vis.verification_badge !== false && settings.show_verification_badge !== false && pro.is_verified
  const showCity = vis.city !== false && settings.show_location !== false && Boolean(pro.city)
  const showServiceArea = vis.service_area !== false && Boolean(pro.service_area)
  const showServices = vis.services !== false && settings.show_services !== false && servicesList.length > 0
  const showLanguages = vis.languages !== false && languagesList.length > 0
  const showBio = vis.bio !== false && settings.show_description !== false && Boolean(pro.bio)
  const showExperience = vis.experience !== false && Boolean(pro.experience_years)
  const showServicesCompleted = vis.services_completed !== false && Boolean(pro.services_completed)
  const showRating = vis.customer_rating !== false && Boolean(pro.rating)
  const showTraining = vis.training_status !== false && Boolean(pro.training_status)

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(27,42,74,0.76)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-[modalIn_0.18s_ease-out] border border-white/20 my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/10 active:scale-95 z-20 cursor-pointer shadow-sm"
          style={{ background: '#F7F3EA' }}
        >
          <X className="w-5 h-5" style={{ color: '#1B2A4A' }} strokeWidth={2.5} />
        </button>

        <div className="pt-8 px-7 pb-4 flex flex-col items-center text-center border-b border-gray-100">
          <ProAvatar
            pro={pro}
            fieldVisibility={vis}
            showImageSetting={settings.show_profile_image}
            className="w-28 h-28 rounded-full text-3xl shadow-md mb-4"
          />

          {showName && (
            <h2 className="font-display font-bold text-2xl" style={{ color: '#1B2A4A' }}>
              {pro.name}
            </h2>
          )}

          {showDesignation && (
            <p className="text-sm font-semibold mt-1" style={{ color: '#0D9488' }}>
              {pro.designation || 'WHY PRO'}
            </p>
          )}

          {showBadge && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2.5 text-[#0D9488] bg-[#0D9488]/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              Verified Professional
            </div>
          )}

          {/* Quick Info Badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {showCity && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F3EA]" style={{ color: '#1B2A4A' }}>
                <MapPin className="w-3.5 h-3.5" />
                {pro.city} {showServiceArea ? `(${pro.service_area})` : ''}
              </span>
            )}

            {showExperience && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F3EA]" style={{ color: '#1B2A4A' }}>
                <Briefcase className="w-3.5 h-3.5" />
                {pro.experience_years} Experience
              </span>
            )}

            {showServicesCompleted && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F3EA]" style={{ color: '#1B2A4A' }}>
                <CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" />
                {pro.services_completed}+ Visits Completed
              </span>
            )}

            {showRating && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">
                <Star className="w-3.5 h-3.5 fill-current" />
                {pro.rating} Customer Rating
              </span>
            )}
          </div>
        </div>

        <div className="px-7 py-6 space-y-5">
          {/* Training Status */}
          {showTraining && (
            <div className="p-3.5 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#0D9488] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">WHY Verification & Training</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: '#1B2A4A' }}>{pro.training_status}</p>
              </div>
            </div>
          )}

          {/* Supported Services */}
          {showServices && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#64748b' }}>
                Supported Care Services
              </p>
              <div className="flex flex-wrap gap-2">
                {servicesList.map((svc) => (
                  <span key={svc} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F3EA]" style={{ color: '#1B2A4A' }}>
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {showLanguages && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1" style={{ color: '#64748b' }}>
                <Languages className="w-3.5 h-3.5" />
                Languages Spoken
              </p>
              <p className="text-sm font-medium" style={{ color: '#1B2A4A' }}>
                {languagesList.join(', ')}
              </p>
            </div>
          )}

          {/* Biography */}
          {showBio && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#64748b' }}>
                About the PRO
              </p>
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: '#5a6b83' }}>
                {pro.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
      <div className="w-full aspect-square rounded-2xl mb-4 bg-[#F7F3EA]" />
      <div className="h-5 w-3/4 rounded bg-[#F7F3EA] mb-2" />
      <div className="h-4 w-1/2 rounded bg-[#F7F3EA] mb-4" />
      <div className="h-8 w-full rounded-xl bg-[#F7F3EA]" />
    </div>
  )
}

export default function MeetOurPROs() {
  const [pros, setPros] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedPro, setSelectedPro] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadPublicPros() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/pros`)
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Failed to load PRO directory.')
        if (!cancelled) {
          setSettings(data.settings || {})
          setPros(data.pros || [])
        }
      } catch (err) {
        if (!cancelled) setError("Couldn't load our PRO profiles right now. Please try again shortly.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPublicPros()
    return () => {
      cancelled = true
    }
  }, [])

  // If section is globally disabled by Super Admin, return null
  if (!loading && settings.show_section === false) {
    return null
  }

  // Calculate available dynamic filter options
  const filterOptions = ['All']

  if (settings.enable_filters !== false) {
    if (settings.filter_hospital_assistance !== false) {
      filterOptions.push('Hospital Assistance')
    }
    if (settings.filter_travel_assistance !== false) {
      filterOptions.push('Travel Assistance')
    }

    // Collect additional service categories or cities if configured
    const allServices = pros.flatMap((p) => {
      const list = Array.isArray(p.services) ? p.services : typeof p.services === 'string' ? JSON.parse(p.services || '[]') : []
      return list
    })
    allServices.forEach((s) => {
      if (s && !filterOptions.includes(s) && s !== 'Hospital Assistance' && s !== 'Travel Assistance') {
        filterOptions.push(s)
      }
    })
  }

  // Filter logic
  const filteredPros = activeFilter === 'All'
    ? pros
    : pros.filter((p) => {
        const list = Array.isArray(p.services) ? p.services : typeof p.services === 'string' ? JSON.parse(p.services || '[]') : []
        return list.includes(activeFilter) || p.city === activeFilter
      })

  // Dynamic Grid Class based on settings.cards_per_row
  const cardsPerRow = settings.cards_per_row || 3
  let gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (cardsPerRow === 4) gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  if (cardsPerRow === 2) gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'

  return (
    <Section id="about-pros" className="py-16 lg:py-24 bg-[#F7F3EA]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <span className="fade-inner inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white shadow-sm" style={{ color: '#0D9488' }}>
            <ShieldCheck className="w-4 h-4" />
            Verified & Dedicated Support
          </span>

          <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: '#1B2A4A' }}>
            {settings.section_heading || 'Meet Our PROs'}
          </h2>

          <p className="fade-inner text-base sm:text-lg leading-relaxed" style={{ color: '#5a6b83' }}>
            {settings.section_description ||
              'Meet the trained professionals who are here to make every journey easier, safer, and more comfortable.'}
          </p>
        </div>

        {/* Public Filters Bar */}
        {!loading && !error && settings.enable_filters !== false && filterOptions.length > 1 && (
          <div className="fade-inner flex flex-wrap gap-2 mb-10">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer"
                style={
                  activeFilter === filter
                    ? { background: '#1B2A4A', color: '#ffffff', borderColor: '#1B2A4A' }
                    : { background: '#ffffff', color: '#5a6b83', borderColor: 'rgba(0,0,0,0.08)' }
                }
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Grid & States */}
        {loading ? (
          <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
            {Array.from({ length: cardsPerRow * 2 }).map((_, i) => (
              <ProCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            <p className="text-base font-medium" style={{ color: '#5a6b83' }}>{error}</p>
          </div>
        ) : filteredPros.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl p-8 border border-black/5 shadow-sm max-w-lg mx-auto">
            <p className="text-base font-medium" style={{ color: '#5a6b83' }}>
              {activeFilter === 'All'
                ? 'PRO profiles will appear here soon.'
                : 'No PROs match your current filter selection.'}
            </p>
          </div>
        ) : (
          <div className={`fade-inner grid ${gridColsClass} gap-6 sm:gap-8`}>
            {filteredPros.map((pro) => (
              <ProCard
                key={pro.id}
                pro={pro}
                settings={settings}
                onOpenModal={setSelectedPro}
              />
            ))}
          </div>
        )}

      </div>

      {/* PRO Profile Modal */}
      {selectedPro && (
        <ProProfileModal
          pro={selectedPro}
          settings={settings}
          onClose={() => setSelectedPro(null)}
        />
      )}
    </Section>
  )
}
