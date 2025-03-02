import { useIsMobile } from '@/hooks/useIsMobile'
import { useState } from 'react'
import { MobileLayout } from './mobile-layout'
import { PcLayout } from './pc-layout'

export function MainContent() {
  const isMobile = useIsMobile()
  const [activeView, setActiveView] = useState('tutorial')

  if (isMobile) {
    return <MobileLayout activeView={activeView} setActiveView={setActiveView} />
  }

  return <PcLayout />
}
