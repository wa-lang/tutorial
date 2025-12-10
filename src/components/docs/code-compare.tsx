import { getShiki } from '@/monaco/shiki'
import { useConfigStore } from '@/stores/config'
import { useEffect, useState } from 'react'
import { SkeletonCode } from '../skeleton-code'

interface CodeCompareProps {
  waCode?: string
  goCode?: string
  jsCode?: string
}

export function CodeCompare({ waCode = '', goCode = '', jsCode = '' }: CodeCompareProps) {
  const { theme } = useConfigStore()

  const getInitialTab = (): 'wa' | 'go' | 'js' => {
    if (waCode)
      return 'wa'
    if (goCode)
      return 'go'
    if (jsCode)
      return 'js'
    return 'wa'
  }

  const [activeTab, setActiveTab] = useState<'wa' | 'go' | 'js'>(getInitialTab())
  const [highlightedCode, setHighlightedCode] = useState({
    wa: '',
    go: '',
    js: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const highlight = async () => {
      try {
        const shikiTheme = theme === 'dark' ? 'vitesse-dark' : 'vitesse-light'
        const shiki = await getShiki(theme)

        if (cancelled)
          return

        const highlighted = {
          wa: waCode ? shiki.codeToHtml(waCode, { lang: 'go', theme: shikiTheme }) : '',
          go: goCode ? shiki.codeToHtml(goCode, { lang: 'go', theme: shikiTheme }) : '',
          js: jsCode ? shiki.codeToHtml(jsCode, { lang: 'javascript', theme: shikiTheme }) : '',
        }

        setHighlightedCode(highlighted)
        setIsLoading(false)
      }
      catch (error) {
        console.error('Failed to highlight code:', error)
        setHighlightedCode({
          wa: waCode ? `<pre><code>${waCode}</code></pre>` : '',
          go: goCode ? `<pre><code>${goCode}</code></pre>` : '',
          js: jsCode ? `<pre><code>${jsCode}</code></pre>` : '',
        })
        setIsLoading(false)
      }
    }

    highlight()

    return () => {
      cancelled = true
    }
  }, [waCode, goCode, jsCode, theme])

  const tabs = [
    { key: 'wa' as const, label: '凹语言', code: highlightedCode.wa, show: !!waCode },
    { key: 'go' as const, label: 'Go', code: highlightedCode.go, show: !!goCode },
    { key: 'js' as const, label: 'JavaScript', code: highlightedCode.js, show: !!jsCode },
  ].filter(tab => tab.show)

  if (tabs.length === 0) {
    return null
  }

  return (
    <div className="code-compare my-4 overflow-hidden border border-foreground/10">
      <div className="flex border-b border-foreground/10 bg-muted/50">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex-1 px-4 py-2 text-sm font-medium transition-colors border-b-1 border-transparent
              ${activeTab === tab.key
            ? 'bg-theme-foreground text-theme border-b-2 !border-theme'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
          }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative bg-white dark:bg-[#121212]">
        {isLoading
          ? (
              <div className="p-8 text-center text-muted-foreground">
                <SkeletonCode />
              </div>
            )
          : (
              tabs.map(tab => (
                <div
                  key={tab.key}
                  className={`${activeTab === tab.key ? 'block' : 'hidden'}`}
                >
                  <div
                    className="code-compare-content"
                    dangerouslySetInnerHTML={{ __html: tab.code }}
                  />
                </div>
              ))
            )}
      </div>
    </div>
  )
}
