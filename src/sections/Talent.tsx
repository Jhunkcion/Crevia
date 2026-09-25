import { PlaceholderCard } from '../components/PlaceholderCard'
import { SectionLabel } from '../components/SectionLabel'

const divisions = ['Creative', 'Tech']

export function Talent() {
  return (
    <section id="talent" className="section">
      <SectionLabel text="Talent" />
      <div className="tabs">
        {divisions.map((division) => <button key={division}>{division}</button>)}
      </div>
      <div className="placeholder-grid">
        <PlaceholderCard text="Talent profile" />
        <PlaceholderCard text="Talent profile" />
        <PlaceholderCard text="Talent profile" />
      </div>
    </section>
  )
}
