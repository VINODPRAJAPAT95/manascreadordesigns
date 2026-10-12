import Hero from '../components/Hero'
import About from '../components/About'
import Industries from '../components/Industries'
import PopularProducts from '../components/PopularProducts'
import LeadersMessage from '../components/LeadersMessage'
import Technology from '../components/Technology'
import Solutions from '../components/Solutions'
import QuoteSection from '../components/QuoteSection'
import Customers from '../components/Customers'
import Investors from '../components/Investors'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import News from '../components/News'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Industries />
      <PopularProducts />
      <LeadersMessage />
      <Technology />
      <Solutions />
      <QuoteSection />
      <Customers />
      <Investors />
      <FAQ />
      <Testimonials />
      <News />
    </>
  )
}
