

const Hero = () => {
    return (
        <div className="w-full relative min-h-[80vh] flex flex-col justify-start items-center mt-46 -mb-25 gap-4">
            <div className='absolute -top-[40px] flex items-center p-2 gap-2 rounded-full shadow-lg bg-gray-200'>
                <div className='w-[8px] h-[8px] rounded-full' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}></div>
                <p className='text-black font-semibold'>Seats are Availbale</p>
            </div>
            <h1 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-3xl px-2 w-full md:w-full lg:w-[65%] md:text-7xl font-bold text-center bg-clip-text text-transparent">
                Focused Coaching for Maths & Science Champions
            </h1>

            <p className='w-[80%] px-2  xl:w-[30%]  text-center text-gray-800 font-semibold'>Fueling Young Minds, Shaping Bright Futures</p>
            <div className="lg:w-[30%] xl:w-[20%] p-2 bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-[0_130px_35px_rgba(79,70,229,0.01),0_75px_36px_rgba(79,70,229,0.03),0_42px_30px_rgba(79,70,229,0.08),0_18px_22px_rgba(79,70,229,0.14),0_4px_12px_rgba(79,70,229,0.16)] opacity-100 will-change-transform">
                <div className=" p-2 font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] border-[1.37px] border-solid border-[rgba(255,255,255,0.04)] opacity-100 text-white">
                    Book a free intro call
                </div>
            </div>

        </div>
    )
}

export default Hero
