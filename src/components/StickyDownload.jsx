import { useRef } from 'react'

export default function StickyDownload() {
  const widgetRef = useRef(null)

  const handleClick = () => {
    if (window.innerWidth < 768) {
      widgetRef.current?.classList.toggle('active')
    }
  }

  return (
    <section className="sticky-download">
      <div ref={widgetRef} className="download-widget" onClick={handleClick}>

        {/* Collapsed Vertical Label */}
        <div className="vertical-label">
          <img src="/Assests/icons/smart-phone.svg" className="white-icon scale-200" width="22" height="22" alt="" />
          <span className="vertical-text text-lg">DOWNLOAD APP</span>
        </div>

        {/* Expanded Content */}
        <div className="expanded-content">

          <div className="widget-header">
            <div className="icon-circle">
              <img src="/Assests/icons/smart-phone.svg" className="white-icon" width="26" alt="" />
            </div>
            <div className="header-text">
              <h4>Get WHY App</h4>
              <span>Available on iOS &amp; Android</span>
            </div>
          </div>

          <button className="download-btn">⬇ Download Now</button>

          <div className="platforms">
            <button>iOS</button>
            <button>Android</button>
          </div>

          <p className="trust-text">Trusted by thousands of families</p>

        </div>
      </div>
    </section>
  )
}
