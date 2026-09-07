import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PatientResults from '../components/PatientResults'

export default function PatientResultsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <PatientResults mode="full" />
      </main>
      <Footer />
    </>
  )
}
