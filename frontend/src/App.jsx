import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

function App() {

  const [activePage, setActivePage] = useState("Home");

  return (
    <>
      <header>
        <Navbar activePage={activePage} onNavigate={setActivePage} />
      </header>

      <main>
        <section>
          <HeroSection onNavigate={setActivePage} />
        </section>
      </main>
    </>
  )
}

export default App
