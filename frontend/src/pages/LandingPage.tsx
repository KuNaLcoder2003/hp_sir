
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

import Services from '../components/Services'
import Footer from '../components/Footer'
import TopperList from '../components/TopperList'
import Teacher from '../components/Teacher'

const LandingPage = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <Services/>
        <TopperList/>
        <Teacher/>
        <div className='w-screen mt-20 flex items-center justify-center'>
            <Footer/>
        </div>
        
    </>
  )
}

export default LandingPage
