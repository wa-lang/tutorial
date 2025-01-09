interface INavItem {
  label: string
  value: string
}

interface IProps {
  prev: INavItem | null
  next: INavItem | null
  onPrev: () => void
  onNext: () => void
  curIdx: number
  total: number
}

export default function Pag({ prev, next, onPrev, onNext, curIdx, total }: IProps) {
  return (
    <div className="flex justify-between items-center mt-8 mb-10 gap-4">
      <div
        className="w-1/2 p-6 border rounded-md hover:border-theme cursor-pointer"
        onClick={onPrev}
        style={{ opacity: curIdx === 0 ? 0 : 1 }}
      >
        {prev && (
          <div className="flex flex-col items-start">
            <span>←</span>
            <span>{prev.label}</span>
          </div>
        )}
      </div>
      <div
        className="w-1/2 p-6 border rounded-md hover:border-theme cursor-pointer"
        onClick={onNext}
        style={{ opacity: curIdx >= total - 1 ? 0 : 1 }}
      >
        {next && (
          <div className="flex flex-col items-end">
            <span>→</span>
            <span>{next.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
