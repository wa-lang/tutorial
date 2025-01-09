import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export function MainContent() {
  return (
    <div className="flex-1">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={5}>
          <div className="h-full p-4">
            Docs
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={5}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={5}>
              <div className="h-full p-4">
                Code
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={5}>
              <div className="h-full p-4">
                Preview
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
