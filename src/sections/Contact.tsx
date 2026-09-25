import { SectionLabel } from '../components/SectionLabel'

export function Contact() {
  return (
    <footer id="contact" className="section">
      <SectionLabel text="Contact us" />
      <div className="contact-placeholders">
        <a href="mailto:">Email</a>
        <a href="#contact">Instagram</a>
        <a href="#contact">Tiktok</a>
      </div>
    </footer>
  )
}
