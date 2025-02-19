import Logo from '@/assets/logo.svg?react'
import { ModeToggle } from './ui/mode-toggle'
import { LangToggle } from './lang-toggle'

export function Header() {
  return (
    <header className="h-14 border-b flex items-center px-6 flex-shrink-0">
      <Logo className="w-6 h-6 mr-2" />
      <h1 className="text-lg font-semibold mr-auto">WA Tutorial</h1>
      <LangToggle />
      <ModeToggle />
    </header>
  )
}
