
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

import Services from '../components/Services'
import Footer from '../components/Footer'
import TopperList from '../components/TopperList'
import Teacher from '../components/Teacher'
import FlipLink from '../components/FlipLink'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <TopperList />
      <div className='w-[85%] lg:w-[70%] h-auto p-2 m-auto rounded-lg'>

        <img src='/Toppers_class_10_Maths.jpeg' alt='topper photo' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-[85%] lg:w-[70%] h-auto p-2 m-auto rounded-lg'>

        <img src='/Toppers_class_10_science.jpeg' alt='topper photo' className='w-full h-full object-cover rounded-lg' />
      </div>

      <Teacher />
      <div className='flex flex-col items-center mt-10 gap-2'>
        <div className='w-[80%] m-auto flex justify-center items-center'>
          <FlipLink href="#">Learn</FlipLink>
        </div>
        <div className='w-[80%] m-auto flex justify-center items-center'>
          <FlipLink href="#">Grow</FlipLink>
        </div>
        <div className='w-[80%] m-auto flex justify-center items-center'>
          <FlipLink href="#">Succeed</FlipLink>
        </div>
      </div>
      <div className='w-screen mt-20 flex items-center justify-center'>
        <Footer />
      </div>

    </>
  )
}

export default LandingPage
