import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Send, BookOpen, Sparkles, Calendar, Clock, ArrowRight, ShieldCheck, Search, ChevronRight } from 'lucide-react';
import { useBlogTheme } from '../contexts/BlogThemeContext';
import { FullWidthBanner, SplitBanner, SidebarWidget } from '../components/promotional/EditorialAd';
import CustomerFeedback from '../components/CustomerFeedback';

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || import.meta?.env?.VITE_API_URL || 'https://why-website-backend.onrender.com/api';

const SAMPLE_ARCHIVE_EDITIONS = [
  {
    id: 101,
    issueNumber: "Issue 48",
    title: "Navigating Multi-Specialty Hospital Visits with Confidence: A Family Guide",
    date: "September 2026",
    readTime: "5 min read",
    category: "Hospital Assistance",
    excerpt: "Practical guidance for navigating complex hospital visits, diagnostic schedules, transportation, and family coordination when you cannot be there in person.",
  },
  {
    id: 102,
    issueNumber: "Issue 47",
    title: "Travel Companion Standards: Safe Airport & Inter-City Assistance",
    date: "August 2026",
    readTime: "4 min read",
    category: "Travel Assistance",
    excerpt: "How verified companions can assist with baggage, airport navigation, mobility coordination, and travel transitions.",
  },
  {
    id: 103,
    issueNumber: "Issue 46",
    title: "WHY Services Expands Professional Companion Operations Across Bengaluru",
    date: "July 2026",
    readTime: "4 min read",
    category: "Company News",
    excerpt: "Expanding a network of trained WHY PROs across key areas of Bengaluru, including Whitefield, Indiranagar, Koramangala, and Hebbal.",
  },
  {
    id: 104,
    issueNumber: "Issue 45",
    title: "Understanding Hospital Visit Rights & Escort Safety in India",
    date: "June 2026",
    readTime: "6 min read",
    category: "Companion Insights",
    excerpt: "Key considerations families should understand when arranging non-medical companion assistance for hospital visits and medical appointments.",
  },
];

export default function NewsletterPage() {
  const { theme } = useBlogTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [editions, setEditions] = useState(SAMPLE_ARCHIVE_EDITIONS);

  useEffect(() => {
    document.title = 'WHY Newsletter | Trusted Companion Services | WHY Services';
    async function fetchLivePosts() {
      try {
        const res = await fetch(`${API_BASE}/blog`).then((r) => r.json());
        if (res.success && Array.isArray(res.posts) && res.posts.length > 0) {
          const apiEditions = res.posts.map((post) => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recent Edition',
            readTime: `${Math.max(3, Math.ceil((post.content || '').replace(/<[^>]+>/g, '').split(/\s+/).length / 200))} min read`,
            category: post.category_name || 'Company News',
            excerpt: post.excerpt || post.title,
          }));
          setEditions(apiEditions);
        }
      } catch (err) {
        console.warn('Using default newsletter archive:', err);
      }
    }
    fetchLivePosts();
  }, []);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setErrorMsg('Please enter both your full name and email address.');
      return;
    }
    setSubscribing(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/blog/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      }).then((r) => r.json());

      if (res.success) {
        setSubscribed(true);
        setEmail('');
        setName('');
      } else {
        setErrorMsg(res.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setSubscribing(false);
    }
  }

  const topics = ['All Topics', 'Hospital Assistance', 'Travel Assistance', 'Companion Insights', 'Company News'];

  const filteredEditions = editions.filter((item) => {
    const matchesTopic = selectedTopic === 'All Topics' || item.category.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchesQuery = !searchFilter ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTopic && matchesQuery;
  });

  const featuredIssue = editions[0] || SAMPLE_ARCHIVE_EDITIONS[0];

  return (
    <div style={{
      background: isDark ? '#0B132B' : '#F8FAFC',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: isDark ? '#ffffff' : '#0F172A',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      {/* ── HERO SECTION ── */}
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
            <Link to="/blog" style={{ color: isDark ? '#52B5BD' : '#0284C7', textDecoration: 'none', fontWeight: 700 }}>Insights</Link>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 600, color: isDark ? '#ffffff' : '#0F172A' }}>WHY Newsletter</span>
          </div>

          <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(82, 181, 189, 0.15)',
              color: isDark ? '#52B5BD' : '#0284C7',
              border: '1px solid rgba(82, 181, 189, 0.3)',
              padding: '6px 18px',
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}>
              <Mail size={14} color={isDark ? "#52B5BD" : "#0284C7"} /> WHY Corporate Publication
            </span>

            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 16,
              color: isDark ? '#ffffff' : '#0F172A',
              letterSpacing: '-0.5px',
            }}>
              WHY Newsletter & Companion Updates
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: isDark ? '#cbd5e1' : '#475569',
              lineHeight: 1.65,
              fontWeight: 500,
              margin: '0 auto',
            }}>
              Receive curated company updates, practical hospital visit guidance, travel assistance insights, safety information, and important WHY announcements directly in your inbox.
            </p>
          </div>

          {/* Subscription Form Card */}
          <div style={{
            maxWidth: 720,
            margin: '0 auto',
            background: isDark ? '#131F37' : '#FFFFFF',
            borderRadius: 24,
            padding: '32px clamp(20px, 4vw, 40px)',
            border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
            boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(15,23,42,0.06)',
          }}>
            {subscribed ? (
              <div style={{
                background: 'rgba(0, 210, 184, 0.15)',
                border: '1.5px solid #00D2B8',
                borderRadius: 16,
                padding: '24px',
                color: '#00D2B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}>
                <CheckCircle2 size={28} color="#00D2B8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 2 }}>
                    Welcome to WHY Newsletter!
                  </div>
                  <div style={{ fontSize: 13, color: isDark ? '#cbd5e1' : '#475569' }}>
                    Your subscription is confirmed. You will receive our next edition automatically.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                {errorMsg && (
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '10px 16px',
                    borderRadius: 10,
                    fontSize: 13,
                    marginBottom: 16,
                    textAlign: 'center',
                    fontWeight: 600,
                  }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: isDark ? '#cbd5e1' : '#475569' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name *"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 12,
                          border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                          background: isDark ? '#182642' : '#F8FAFC',
                          color: isDark ? '#ffffff' : '#0F172A',
                          fontSize: 14,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: isDark ? '#cbd5e1' : '#475569' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address *"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 12,
                          border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                          background: isDark ? '#182642' : '#F8FAFC',
                          color: isDark ? '#ffffff' : '#0F172A',
                          fontSize: 14,
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={subscribing}
                    style={{
                      width: '100%',
                      padding: '14px 28px',
                      borderRadius: 12,
                      border: 'none',
                      background: '#52B5BD',
                      color: '#0B132B',
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)',
                      transition: 'transform 0.2s ease',
                      marginTop: 6,
                    }}
                  >
                     {subscribing ? 'Subscribing...' : 'Subscribe to the WHY Newsletter'} <Send size={16} />
                  </button>

                  <p style={{ fontSize: 12, color: isDark ? '#cbd5e1' : '#64748B', margin: '6px 0 0 0', textAlign: 'center' }}>
                    Zero spam. Unsubscribe at any time with a single click.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN NEWSLETTER ARCHIVE & PROMOTIONS ── */}
      <main style={{ maxWidth: 1536, margin: '0 auto', padding: '40px clamp(20px, 3vw, 40px)' }}>

        {/* FEATURED NEWSLETTER ISSUE */}
        <section style={{ marginBottom: 48 }}>
          <div style={{
            background: isDark ? '#131F37' : '#FFFFFF',
            borderRadius: 20,
            border: isDark ? '1.5px solid rgba(82, 181, 189, 0.3)' : '1.5px solid #CBD5E1',
            padding: '32px 36px',
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}>
            <div style={{ flex: '1 1 500px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#52B5BD',
                color: '#0B132B',
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: 30,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                <Sparkles size={12} color="#0B132B" /> Latest Featured Edition
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 8, lineHeight: 1.3 }}>
                {featuredIssue.title}
              </h2>
              <p style={{ fontSize: 14, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                {featuredIssue.excerpt}
              </p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: isDark ? '#cbd5e1' : '#64748B', fontWeight: 600 }}>
                <span><Calendar size={13} style={{ display: 'inline', marginRight: 4 }} /> {featuredIssue.date}</span>
                <span><Clock size={13} style={{ display: 'inline', marginRight: 4 }} /> {featuredIssue.readTime}</span>
              </div>
            </div>

            <Link
              to={featuredIssue.slug ? `/blog/${featuredIssue.slug}` : "/blog"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 30,
                background: '#52B5BD',
                color: '#0B132B',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(82, 181, 189, 0.3)',
              }}
            >
              Read Full Edition <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* IN-HOUSE PROMOTIONAL BANNER */}
        <FullWidthBanner />

        {/* TOPIC FILTER TABS & ARCHIVE SEARCH */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
          background: isDark ? '#131F37' : '#FFFFFF',
          padding: '16px 20px',
          borderRadius: 16,
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 30,
                  border: selectedTopic === t ? 'none' : (isDark ? 'none' : '1px solid #CBD5E1'),
                  background: selectedTopic === t ? '#52B5BD' : (isDark ? '#182642' : '#F1F5F9'),
                  color: selectedTopic === t ? '#0B132B' : (isDark ? '#cbd5e1' : '#475569'),
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 300 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#94a3b8' : '#64748B' }} />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search newsletter archive..."
              style={{
                width: '100%',
                paddingLeft: 38,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 30,
                border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #CBD5E1',
                fontSize: 13,
                outline: 'none',
                background: isDark ? '#182642' : '#F8FAFC',
                color: isDark ? '#ffffff' : '#0F172A',
              }}
            />
          </div>
        </div>

        {/* ARCHIVE GRID */}
        <section style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={22} color="#52B5BD" /> Newsletter Archive & Past Editions
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {filteredEditions.map((ed) => (
              <div
                key={ed.id}
                style={{
                  background: isDark ? '#131F37' : '#FFFFFF',
                  borderRadius: 16,
                  border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E2E8F0',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 12px rgba(15,23,42,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#52B5BD', textTransform: 'uppercase' }}>
                    {ed.category}
                  </span>
                  <span style={{ fontSize: 12, color: isDark ? '#cbd5e1' : '#64748B' }}>
                    {ed.date}
                  </span>
                </div>

                <h4 style={{ fontSize: 18, fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A', marginBottom: 10, lineHeight: 1.35 }}>
                  {ed.title}
                </h4>

                <p style={{ fontSize: 14, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                  {ed.excerpt}
                </p>

                <Link
                  to={ed.slug ? `/blog/${ed.slug}` : '/blog'}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: isDark ? '#52B5BD' : '#0284C7',
                    textDecoration: 'none',
                  }}
                >
                  Read Edition <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SPLIT SERVICE PROMOTION */}
        <SplitBanner />

        {/* CUSTOMER REVIEWS */}
        <div style={{ marginTop: 60 }} id="feedback-section">
          <CustomerFeedback variant={isDark ? "dark" : "light"} />
        </div>
      </main>
    </div>
  );
}
