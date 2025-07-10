
import Toppers from './Toppers'

const TopperList = () => {
  return (
    <div className='w-[95%] m-auto mt-20 py-10'>
        <h2 className='lg:w-[50%] m-auto text-center text-4xl font-bold  bg-clip-text text-transparent p-2' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Our Toppers</h2>
       <div className='flex flex-col lg:flex-row lg:justify-center flex-nowrap lg:flex-wrap w-[95%]  p-4 lg:w-[85%] m-auto items-center gap-20'>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
        <Toppers/>
       </div>
    </div>
  )
}

export default TopperList
