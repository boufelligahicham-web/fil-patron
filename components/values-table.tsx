import { fmt, type ComputedValue } from '@/lib/patterns/types'

export function ValuesTable({
  values,
  caption,
  headings,
}: {
  values: ComputedValue[]
  caption: string
  headings: { mark: string; formula: string; value: string }
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-start text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-4 py-2.5 text-start font-medium">
              {headings.mark}
            </th>
            <th scope="col" className="px-4 py-2.5 text-start font-medium">
              {headings.formula}
            </th>
            <th scope="col" className="px-4 py-2.5 text-end font-medium">
              {headings.value}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {values.map((v) => (
            <tr key={v.key}>
              <th scope="row" className="px-4 py-2.5 text-start font-medium">
                {v.label}
              </th>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground" dir="ltr">
                {v.formula}
              </td>
              <td className="px-4 py-2.5 text-end font-semibold tabular-nums" dir="ltr">{`${fmt(v.value)} cm`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
