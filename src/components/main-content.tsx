import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { CodePane } from './code/code-pane'
import { DocsPane } from './docs/docs-pane'
import { PreviewPane } from './preview/preview-pane'

export function MainContent() {
  return (
    <div className="flex-1">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={5}>
          <DocsPane />
        </ResizablePanel>
        <ResizableHandle className="hover:after:bg-foreground/5 after:w-3" />
        <ResizablePanel defaultSize={50} minSize={5}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={5}>
              <CodePane />
            </ResizablePanel>
            <ResizableHandle className="hover:after:bg-foreground/5 data-[panel-group-direction=vertical]:after:h-3 z-10" />
            <ResizablePanel defaultSize={50} minSize={5}>
              <PreviewPane />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
