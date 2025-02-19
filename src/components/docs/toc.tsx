import type { ReactNode } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ITocItem {
  label: string
  value: string
}

interface ITocGroup {
  group: string
  items: ITocItem[]
}

interface ITocProps {
  items: ITocGroup[]
  curPath: string
  onChange: (value: string) => void
  onPrev: () => void
  onNext: () => void
  curIdx: number
}

function NavButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <div
      className="flex items-center gap-2"
      onClick={disabled ? undefined : onClick}
      style={{
        opacity: disabled ? 0.2 : 1,
        cursor: disabled ? '' : 'pointer',
      }}
    >
      {children}
    </div>
  )
}

export default function Toc({
  items,
  curPath,
  onChange,
  onPrev,
  onNext,
  curIdx,
}: ITocProps) {
  const totalItems = items.reduce((acc, group) => acc + group.items.length, 0)
  const isFirstItem = curIdx === 0
  const isLastItem = curIdx >= totalItems - 1

  return (
    <div
      className="flex-shrink-0 px-4 flex items-center gap-2 select-none"
      onCopy={e => e.preventDefault()}
      onCut={e => e.preventDefault()}
    >
      <NavButton disabled={isFirstItem} onClick={onPrev}>
        <span>←</span>
      </NavButton>

      <div className="flex-1 m-2.5 border bg-foreground/5 border-foreground/10 flex gap-2 items-center">
        <Select
          defaultValue={items[0]?.items[0]?.value}
          onValueChange={onChange}
          value={curPath}
        >
          <SelectTrigger className="focus:ring-0 border-none shadow-none [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
            <SelectValue placeholder={items[0]?.items[0]?.label} />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {items.map(group => (
              <SelectGroup key={group.group}>
                <SelectLabel className="ps-2">{group.group}</SelectLabel>
                {group.items.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    <span className="truncate ml-2">{item.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <NavButton disabled={isLastItem} onClick={onNext}>
        <span>→</span>
      </NavButton>
    </div>
  )
}
