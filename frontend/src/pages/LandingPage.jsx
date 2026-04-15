import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection';
import AboutUsSection from '../components/AboutUsSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactUsSection from '../components/ContactUsSection';
import FooterSection from '../components/FooterSection';


function LandingPage() {
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
        <section>
          <ServicesSection onNavigate={setActivePage} />
        </section>
        <section>
          <AboutUsSection onNavigate={setActivePage} />
        </section>
        <section>
          <PortfolioSection onNavigate={setActivePage} />
        </section>
        <section>
          <ContactUsSection />
        </section>
        <section>
          <FooterSection onNavigate={setActivePage} />
        </section>
      </main>
    </>
  )
}

export default LandingPage;