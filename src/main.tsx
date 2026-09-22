import { createRoot } from 'react-dom/client'
import './style.css'

const divisions = ['Creative', 'Tech']

function App() {
  return (
    <>
      <nav className="navbar">
        <a className="logo" href="#home">Crivea</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#talent">Talent</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact us</a>
        </div>
      </nav>

      <main>
        <section id="home" className="section hero">
          <div className="placeholder-block">Hero / Logo animation</div>
        </section>

        <section id="about" className="section">
          <SectionLabel text="About us" />
          <div className="placeholder-block large">About us content</div>
        </section>

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

        <section id="work" className="section">
          <SectionLabel text="Work" />
          <div className="placeholder-grid">
            <PlaceholderCard text="Project" />
            <PlaceholderCard text="Project" />
          </div>
          <div className="placeholder-block testimonial-placeholder">Testimonial carousel</div>
        </section>
      </main>

      <footer id="contact" className="section">
        <SectionLabel text="Contact us" />
        <div className="contact-placeholders">
          <a href="mailto:">Email</a>
          <a href="#contact">Instagram</a>
          <a href="#contact">Tiktok</a>
        </div>
      </footer>
    </>
  )
}

function SectionLabel({ text }: { text: string }) {
  return <p className="section-label">{text}</p>
}

function PlaceholderCard({ text }: { text: string }) {
  return <article className="placeholder-card">{text}</article>
}

createRoot(document.getElementById('root')!).render(<App />)
