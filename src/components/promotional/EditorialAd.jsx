import { ShieldCheck, ArrowRight, Building2, Plane, UserCheck, Mail, CheckCircle2, PhoneCall } from 'lucide-react';
import { useBlogTheme } from '../../contexts/BlogThemeContext';
import { WHATSAPP_BOOKING_URL, WHATSAPP_CHANNEL_URL } from '../../config/contact';

function WhatsAppIcon({ size = 18, color = "#ffffff", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.198 8.198 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.188 8.188 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
    </svg>
  );
}

/**
 * 1. Full-Width Editorial Banner
 */
export function FullWidthBanner({ title, subtitle, ctaText = "Book via WhatsApp", ctaUrl = WHATSAPP_BOOKING_URL }) {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark
        ? 'linear-gradient(135deg, #131F37 0%, #182642 100%)'
        : 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
      borderRadius: 20,
      border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
      padding: '32px 36px',
      marginTop: 40,
      marginBottom: 40,
      boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      flexWrap: 'wrap',
      gap: 24,
    }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 800,
          color: isDark ? '#52B5BD' : '#0284C7',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: 8,
        }}>
          <ShieldCheck size={14} /> WHY Trusted Companion Support
        </div>
        <h3 style={{
          fontSize: 22,
          fontWeight: 800,
          color: isDark ? '#FFFFFF' : '#0F172A',
          margin: '0 0 8px 0',
          lineHeight: 1.3,
        }}>
          {title || "Trusted Companion Support When Family Cannot Be There"}
        </h3>
        <p style={{
          fontSize: 14,
          color: isDark ? '#CBD5E1' : '#475569',
          margin: 0,
          lineHeight: 1.6,
        }}>
          {subtitle || "Verified WHY PROs provide trusted companionship and practical assistance during hospital visits, diagnostic appointments, and travel across Bengaluru."}
        </p>
      </div>

      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 28px',
          borderRadius: 30,
          background: '#25D366',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: 14,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
          transition: 'transform 0.2s ease',
        }}
      >
        <WhatsAppIcon size={18} /> {ctaText}
      </a>
    </div>
  );
}

/**
 * 2. Split Image + Content Banner
 */
export function SplitBanner({
  title = "Hospital Visit & Diagnostic Escort Assistance",
  description = "Navigating crowded hospitals, registrations, diagnostic appointments, and long queues can be overwhelming. WHY PROs provide trusted companionship and practical assistance throughout the visit.",
  imageSrc = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  ctaText = "Learn More About Hospital Assistance",
  ctaUrl = "/#Hospital-companion-section",
}) {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark ? '#131F37' : '#FFFFFF',
      borderRadius: 20,
      border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
      overflow: 'hidden',
      marginTop: 40,
      marginBottom: 40,
      boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    }}>
      <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{
          fontSize: 12,
          fontWeight: 800,
          color: isDark ? '#52B5BD' : '#0284C7',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <Building2 size={15} /> Hospital Assistance Focus
        </span>
        <h3 style={{
          fontSize: 22,
          fontWeight: 800,
          color: isDark ? '#FFFFFF' : '#0F172A',
          marginBottom: 12,
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 14,
          color: isDark ? '#CBD5E1' : '#475569',
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          {description}
        </p>

        <div>
          <a
            href={ctaUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              borderRadius: 30,
              background: '#52B5BD',
              color: '#0B132B',
              fontWeight: 800,
              fontSize: 13,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)',
            }}
          >
            {ctaText} <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <div style={{ background: '#1E293B', minHeight: 240, position: 'relative' }}>
        <img
          src={imageSrc}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

/**
 * 3. In-Article Inline Promotional Card
 */
export function InArticleCard({
  title = "Explore WHY Companion & Assistance Services",
  text = "Whether it is an early morning hospital appointment or an airport departure, our verified WHY PROs provide reliable companionship and practical assistance.",
}) {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark
        ? 'linear-gradient(135deg, #182642 0%, #1E293B 100%)'
        : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
      borderRadius: 16,
      padding: '24px 28px',
      margin: '36px 0',
      borderLeft: '4px solid #52B5BD',
      borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #CBD5E1',
      borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #CBD5E1',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #CBD5E1',
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        color: isDark ? '#52B5BD' : '#0284C7',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <Plane size={14} /> Service Spotlight
      </div>
      <h4 style={{
        fontSize: 17,
        fontWeight: 800,
        color: isDark ? '#FFFFFF' : '#0F172A',
        margin: '0 0 8px 0',
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: 14,
        color: isDark ? '#CBD5E1' : '#475569',
        margin: '0 0 16px 0',
        lineHeight: 1.6,
      }}>
        {text}
      </p>

      <a
        href={WHATSAPP_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 800,
          color: '#25D366',
          textDecoration: 'none',
        }}
      >
        <WhatsAppIcon size={16} /> Book a WHY PRO via WhatsApp <ArrowRight size={14} />
      </a>
    </div>
  );
}

/**
 * 4. Sidebar Promotional Widget
 */
export function SidebarWidget() {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark ? '#131F37' : '#FFFFFF',
      borderRadius: 18,
      border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
      padding: 22,
      boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontWeight: 800,
        fontSize: 14,
        color: isDark ? '#FFFFFF' : '#0F172A',
        marginBottom: 14,
      }}>
        <ShieldCheck size={18} color="#00D2B8" /> WHY Assurance
      </div>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 18px 0',
        display: 'grid',
        gap: 10,
        fontSize: 13,
        color: isDark ? '#CBD5E1' : '#475569',
        fontWeight: 500,
      }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={15} color="#00D2B8" /> 100% Background Verified
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={15} color="#00D2B8" /> Hospital Assistance
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={15} color="#00D2B8" /> Travel Assistance
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={15} color="#00D2B8" /> Real-time Family Updates
        </li>
      </ul>

      <a
        href={WHATSAPP_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '11px 16px',
          borderRadius: 30,
          background: '#25D366',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: 13,
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
        }}
      >
        <WhatsAppIcon size={16} /> Book via WhatsApp
      </a>
    </div>
  );
}

/**
 * 5. Compact Horizontal CTA
 */
export function CompactCTA() {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark ? '#182642' : '#F1F5F9',
      borderRadius: 14,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 14,
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #CBD5E1',
      marginTop: 28,
      marginBottom: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <UserCheck size={20} color="#52B5BD" />
        <span style={{
          fontSize: 14,
          fontWeight: 700,
          color: isDark ? '#FFFFFF' : '#0F172A',
        }}>
          Need trusted companion assistance in Bengaluru?
        </span>
      </div>
      <a
        href={WHATSAPP_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 800,
          color: '#52B5BD',
          textDecoration: 'none',
        }}
      >
        Connect Now <ArrowRight size={14} />
      </a>
    </div>
  );
}
