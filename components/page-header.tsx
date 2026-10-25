import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b pb-8">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {children && (
        <div className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{children}</div>
      )}
    </div>
  )
}
