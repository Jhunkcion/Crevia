type SectionLabelProps = { text: string }

export function SectionLabel({ text }: SectionLabelProps) {
  return <p className="section-label">{text}</p>
}
