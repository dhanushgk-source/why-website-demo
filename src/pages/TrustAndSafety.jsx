import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionFade } from '../hooks/useSectionFade'

import TrustSafety from '../components/TrustSafety'
import TrustSignals from '../components/TrustSignals'
import TrustedBy from '../components/TrustedBy'

function Section({ children, className = '', id }) {
    const ref = useSectionFade()
    return (
        <section ref={ref} id={id} className={`relative ${className}`}>
            {children}
        </section>
    )
}
export default function PricingSection() {
    return (<>
    <TrustSafety/>
    {/*<TrustedBy/>*/}
    <TrustSignals/>
    </>
    )
}