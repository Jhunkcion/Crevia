type PlaceholderCardProps = { text: string }

export function PlaceholderCard({ text }: PlaceholderCardProps) {
  return <article className="placeholder-card">{text}</article>
}
