import { PlaceholderCard } from '../components/PlaceholderCard'
import { SectionLabel } from '../components/SectionLabel'

export function Work() {
  return (
    <section id="work" className="section">
      <SectionLabel text="Work" />
      <div className="placeholder-grid">
        <PlaceholderCard text="Project" />
        <PlaceholderCard text="Project" />
      </div>
      <div className="placeholder-block testimonial-placeholder">Testimonial carousel</div>
    </section>
  )
}
