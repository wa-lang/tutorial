import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { DocsPane } from './docs/docs-pane'
import { EditorPane } from './editor/editor-pane'
import { PreviewPane } from './preview/preview-pane'

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={5}>
          <DocsPane />
        </ResizablePanel>
        <ResizableHandle className="hover:after:bg-foreground/5 after:w-3 z-10" />
        <ResizablePanel defaultSize={50} minSize={5}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={5}>
              <EditorPane />
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
