import { useEffect, useState } from 'react'
import { MobileLayout } from './mobile-layout'
import { PcLayout } from './pc-layout'

export function MainContent() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeView, setActiveView] = useState('tutorial')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <MobileLayout activeView={activeView} setActiveView={setActiveView} />
  }

  return <PcLayout />
}
