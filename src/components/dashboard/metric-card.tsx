import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  /** Pre-formatted value for display (e.g. "42" or "$1,250"). */
  value: string
  icon: ComponentType<{ className?: string }>
  /**
   * Delta-mode secondary row: arrow + delta text. Omit when the metric
   * doesn't have a sensible comparison (e.g. total pipeline value).
   */
  delta?: {
    /** Positive / negative / zero drives arrow + color. */
    sign: number
    /** Pre-formatted delta, e.g. "+3 vs yesterday". */
    label: string
  }
  /** Used instead of `delta` when the metric has a static subtitle. */
  subtitle?: string
  color?: 'blue' | 'red' | 'purple' | 'orange' | 'green'
}

const colorVariants = {
  blue: 'border-t-blue-500 shadow-[0_-5px_15px_-5px_rgba(59,130,246,0.3)]',
  red: 'border-t-red-500 shadow-[0_-5px_15px_-5px_rgba(239,68,68,0.3)]',
  purple: 'border-t-purple-500 shadow-[0_-5px_15px_-5px_rgba(168,85,247,0.3)]',
  orange: 'border-t-orange-500 shadow-[0_-5px_15px_-5px_rgba(249,115,22,0.3)]',
  green: 'border-t-green-500 shadow-[0_-5px_15px_-5px_rgba(34,197,94,0.3)]',
  default: 'border-t-border'
}

export function MetricCard({ title, value, icon: Icon, delta, subtitle, color }: MetricCardProps) {
  const topBorderClass = color ? colorVariants[color] : colorVariants.default

  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 border-t-4 transition-all duration-300 hover:scale-[1.02]", topBorderClass)}>
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-4xl leading-none font-bold tabular-nums text-foreground">
        {value}
      </p>
      {delta ? <DeltaRow sign={delta.sign} label={delta.label} /> : subtitle ? (
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}

function DeltaRow({ sign, label }: { sign: number; label: string }) {
  const tone =
    sign > 0
      ? 'text-primary'
      : sign < 0
      ? 'text-red-400'
      : 'text-muted-foreground'
  const Arrow = sign > 0 ? ArrowUp : sign < 0 ? ArrowDown : Minus
  return (
    <div className={cn('mt-2 flex items-center gap-1 text-sm', tone)}>
      <Arrow className="h-4 w-4" aria-hidden />
      <span className="tabular-nums">{label}</span>
    </div>
  )
}
