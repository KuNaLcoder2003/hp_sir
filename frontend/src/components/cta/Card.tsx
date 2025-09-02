import { useState } from "react";
import { obj } from "../../data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



export function Card() {
    const [hover, setHover] = useState(false);
    return (
        <>
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                className=" w-[100%] md:w-[415px] h-[383px] rounded-3xl my-6 bg-white shadow-2xl">

                <div className="p-8">

                    <h1 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-3xl w-full md:w-full font-bold bg-clip-text text-transparent">
                        Quality Teaching
                    </h1>
                    <p className="font-md text-gray-600">Each topic gets full focus, ensuring easy understanding of topic.</p>

                </div>

                <div className="h-[230px] relative overflow-hidden rounded-2xl  -b-2">

                    <img src="https://framerusercontent.com/images/cXzwpw5Q6RifzMHYPiS1mkb2Uo.png?scale-down-to=1024" className={`absolute rounded-2xl z-10 translate-x-45 translate-y-10 ${hover ? "rotate-5 transition-all duration-200" : ""}`} />
                    <img src="https://framerusercontent.com/images/juwi5EGOJg1CxFi3IwD1TGuENU.png?scale-down-to=1024" className={`rounded-2xl z-0 translate-y-18 ${hover ? "-rotate-5 transition-all duration-200" : ""}`} />


                </div>

            </div>
        </>
    );
}

export function Card2() {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()
    return (

        <div
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            className="w-[100%] md:w-[415px] h-[383px] rounded-3xl bg-white shadow-2xl relative overflow-hidden flex">



            <div className="bg-white rounded-full shadow-[inset_0_0_20px_rgba(79,70,229,0.2)] opacity-100 absolute w-[312px] h-[312px] left-1/2 top-[-135px] translate-x-[-50%]">

            </div>

            <motion.div
                animate={hover ? { rotate: 360 } : { rotate: 0 }} // Animate rotation to 360 degrees
                transition={hover ? {
                    repeat: Infinity,  // Make it repeat forever
                    duration: 3,       // Duration of one full rotation
                    ease: "linear",
                } : {
                    duration: 0
                }}
                className=" absolute  w-[312px] h-[312px] left-1/2 top-[-120px] translate-x-[-50%] rounded-full border-t-2 border-b-2 border-blue-500"></motion.div>


            <div onClick={() => navigate('/slot')} className="w-[50%] absolute top-[32px] left-1/2 translate-x-[-50%] p-2 bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-[0_130px_35px_rgba(79,70,229,0.01),0_75px_36px_rgba(79,70,229,0.03),0_42px_30px_rgba(79,70,229,0.08),0_18px_22px_rgba(79,70,229,0.14),0_4px_12px_rgba(79,70,229,0.16)] opacity-100 will-change-transform">
                <div className=" p-2 cursor-pointer font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] border-[1.37px] border-solid border-[rgba(255,255,255,0.04)] opacity-100 text-white">
                    Doubt?
                </div>
            </div>

            <div className="p-8 self-end">

                <h1 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-3xl w-full md:w-full font-bold bg-clip-text text-transparent">
                    Book Doubt Session
                </h1>
                <p className="font-md text-gray-600">Each student gets every doubt cleared.</p>

            </div>

        </div>
    )
}

export function Card3() {
    const [hover, setHover] = useState(false)
    return (

        <div

            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            className="w-[100%] md:w-[415px] h-[383px] rounded-3xl bg-white shadow-2xl relative overflow-hidden flex">



            <div className="w-[20%] h-[20%] absolute top-[279px] rounded-lg left-1/2 translate-x-[-50%] p-2 bg-gradient-to-b from-indigo-500 to-indigo-900  shadow-[0_130px_35px_rgba(79,70,229,0.01),0_75px_36px_rgba(79,70,229,0.03),0_42px_30px_rgba(79,70,229,0.08),0_18px_22px_rgba(79,70,229,0.14),0_4px_12px_rgba(79,70,229,0.16)] opacity-100 will-change-transform">
                <div className=" p-2 h-[100%] font-bold text-lg text-center rounded-lg flex justify-center items-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)]  border-[1.37px] border-solid border-[rgba(255,255,255,0.04)] opacity-100 text-white">
                    <img src={obj.logo} className="max-w-[144px]" />
                </div>
            </div>

            <div className="p-8 self-start">

                <h1 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-3xl w-full md:w-full font-bold bg-clip-text text-transparent">
                    Easy Comms
                </h1>
                <p className="font-md text-gray-600">Stay in touch through Slack, Telegram, WhatsApp or our platform</p>

            </div>


            <motion.div
                animate={{ y: [0, 10, 0] }} // moves from 0 → 10 → back to 0
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute left-[160px] bottom-[140px] z-20"
            >
                <img src={obj.whatsapp_icon} className="w-16" />
            </motion.div>

            <div className="absolute left-[24px] bottom-[60px] z-20">
                <img src={obj.slack_icon} className="w-16" />
            </div>

            <div className="absolute left-[300px] bottom-[60px] z-20">
                <img src={obj.telegram_icon} className="w-16" />
            </div>


            <motion.div
                animate={hover ? { rotate: 360 } : { rotate: 0 }} // Animate rotation to 360 degrees
                transition={hover ? {
                    repeat: Infinity,  // Make it repeat forever
                    duration: 1.3,       // Duration of one full rotation
                    ease: "linear",
                } : {
                    duration: 0
                }}
                className=" absolute  w-[312px] h-[312px] left-1/2 top-[200px] translate-x-[-50%] rounded-full border-l-2 border-r-2 border-blue-500"></motion.div>



        </div>
    )
}