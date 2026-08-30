import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Conditions from '../components/Conditions'
import WhyHomeopathy from '../components/WhyHomeopathy'
import CTABanner from '../components/CTABanner'
import Products from '../components/Products'
import ProductVideos from '../components/ProductVideos'
import PatientResults from '../components/PatientResults'
import Testimonials from '../components/Testimonials'
import Appointment from '../components/Appointment'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Conditions />
      <WhyHomeopathy />
      <CTABanner />
      <Products />
      <ProductVideos />
      <PatientResults />
      <Testimonials />
      <Appointment />
      <Contact />
      <Footer />
    </>
  )
}
