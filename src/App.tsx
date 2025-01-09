import { Header } from '@/components/header'
import { MainContent } from '@/components/main-content'
import { ThemeProvider } from '@/components/ui/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <MainContent />
      </div>
    </ThemeProvider>
  )
}

export default App
