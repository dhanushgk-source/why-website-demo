import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cookieChoice = localStorage.getItem('cookiesAccepted')
    if (!cookieChoice) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setVisible(false)
  }

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div id="cookieBanner" className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Text */}
        <div className="text-sm text-gray-700">
          <strong className="block mb-1">Cookie Preferences</strong>
          We use cookies to improve functionality, personalization, analytics, and marketing.{' '}
          <a href="cookie-notice.html" className="text-blue-600 underline ml-1">Cookie Notice</a>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
          >
            Reject All
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:opacity-90 transition"
          >
            Accept All Cookies
          </button>
        </div>

      </div>
    </div>
  )
}
