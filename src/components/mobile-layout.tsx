import { DocsPane } from './docs/docs-pane'
import { EditorPane } from './editor/editor-pane'
import { PreviewPane } from './preview/preview-pane'

interface MobileLayoutProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function MobileLayout({ activeView, setActiveView }: MobileLayoutProps) {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div
        className="flex-1 transition-transform duration-300 h-[calc(100vh-64px)] overflow-hidden"
        style={{
          transform: `translateX(${activeView === 'tutorial' ? '0%' : '-50%'})`,
          width: '200%',
          display: 'flex',
        }}
      >
        <div className="w-full h-full overflow-y-auto">
          <DocsPane />
        </div>
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0 overflow-auto">
            <EditorPane />
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            <PreviewPane />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-12 border-t bg-background/20 backdrop-blur-sm backdrop-filter">
        <div className="flex h-full *:flex-1 *:text-center *:border">
          <button
            onClick={() => setActiveView('tutorial')}
            className={`${
              activeView === 'tutorial' ? 'bg-theme-foreground border-theme text-foreground' : 'border-transparent'
            }`}
          >
            Tutorial
          </button>
          <button
            onClick={() => setActiveView('editor')}
            className={` ${
              activeView === 'editor' ? 'bg-theme-foreground border-theme text-foreground' : 'border-transparent'
            }`}
          >
            Editor
          </button>
        </div>
      </div>
    </div>
  )
}
