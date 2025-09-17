
import Toppers from './Toppers'

const TopperList = () => {
  return (
    <div className='w-[95%] m-auto mt-20 py-10'>
      <h2 className='lg:w-[50%] m-auto text-center text-4xl font-bold  bg-clip-text text-transparent p-2' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Our Toppers</h2>
      <div className='flex flex-col lg:flex-row lg:justify-center flex-nowrap lg:flex-wrap w-[95%]  p-4 lg:w-[85%] m-auto items-center gap-20'>
        <Toppers url='/topper_1.jpeg' />
        <Toppers url='/WhatsApp Image 2025-08-24 at 4.15.51 PM.jpeg' />
        <Toppers url='/Harsh_NIT_CALICUT.jpeg' />

        <Toppers url='/Riday_NIT_Surat.jpeg' />
        <Toppers url='/Screenshot 2025-08-25 at 12.21.53 AM.png' />
        <Toppers url='/Screenshot 2025-08-25 at 12.23.58 AM.png' />
        <Toppers url='/WhatsApp Image 2025-08-24 at 4.03.04 PM.jpeg' />
        <Toppers url='/WhatsApp Image 2025-08-27 at 6.04.36 PM.jpeg' />
      </div>
    </div>
  )
}

export default TopperList
