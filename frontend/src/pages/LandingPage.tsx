
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

import Services from '../components/Services'
import Footer from '../components/Footer'
import TopperList from '../components/TopperList'
import Teacher from '../components/Teacher'
import FlipLink from '../components/FlipLink'
import { HeroParallax } from '../components/HeroParallax'
import { motion } from "framer-motion"
import { Card, Card2, Card3 } from '../components/cta/Card'
import PricingComponent from '../components/cta/Pricing'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />

      <TopperList />
      <div className="w-[85%] lg:w-[70%] m-auto flex flex-wrap justify-center gap-4">
        <div className="flex-1 min-w-[45%] max-w-[48%] rounded-lg">
          <img
            src="/Toppers_class_10_Maths.jpeg"
            alt="topper photo"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-[45%] max-w-[48%] rounded-lg">
          <img
            src="/Toppers_class_10_science.jpeg"
            alt="topper photo"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-[45%] max-w-[48%] rounded-lg">
          <img
            src="/WhatsApp Image 2025-08-27 at 5.52.34 PM.jpeg"
            alt="topper photo"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-[45%] max-w-[48%] rounded-lg">
          <img
            src="/WhatsApp Image 2025-08-27 at 5.52.34 PM.jpeg"
            alt="topper photo"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      <div className='w-[100%] p-2 lg:w-[90%] m-auto flex flex-col gap-[1.5rem] items-center'>

        <h1 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-3xl px-2 w-[80%] lg:w-full  md:text-6xl font-bold text-center bg-clip-text text-transparent">
          Why Student Choose Us
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.1 }}
          className='flex flex-col justify-center lg:flex-row lg:flex-wrap xl:flex-row xl:flex-nowrap w-[100%] m-auto items-center mb-4 gap-8 '>
          <Card2 />
          <Card3 />
          <Card />
        </motion.div>



      </div>

      {/* <ComparisonGrid /> */}
      <PricingComponent />


      <Teacher />
      <HeroParallax />


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
        <div className='w-[80%] m-auto flex justify-center items-center'>
          <FlipLink href="#">With</FlipLink>
        </div>
        <div className='w-[80%] m-auto flex justify-center items-center'>
          <FlipLink href="#">Abhyasa</FlipLink>
        </div>
      </div>

      <div className='w-screen mt-20 flex items-center justify-center'>
        <Footer />
      </div>

    </>
  )
}

export default LandingPage
