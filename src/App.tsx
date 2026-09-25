import { Navbar } from './components/Navbar'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Talent } from './sections/Talent'
import { Work } from './sections/Work'

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Talent />
        <Work />
      </main>
      <Contact />
    </>
  )
}
