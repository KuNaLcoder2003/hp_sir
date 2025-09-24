// import React, { useState } from 'react';
// import { FiX, FiMenu } from 'react-icons/fi';
// import { motion } from "framer-motion"
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';


// const StudentNavbar: React.FC = ({ }) => {
//     const navigate = useNavigate()
//     const { user, logout, batch_id } = useAuth()
//     const [isOpen, setIsOpen] = useState(false)
//     const data = [
//         { content: 'Notes' },
//         { content: 'Tests' },
//     ]
//     return (
//         <div className="rounded:sm w-[90%] rounded-xl lg:m-0 lg:w-full max-w-[1000px] mx-auto flex flex-wrap items-center lg:items-center justify-around lg:justify-around lg:rounded-full p-4 bg-white fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg z-50" >


//             <div className="flex md:justify-start lg:justify-center gap-2 self-center md:self-start lg:p-2">

//                 <p style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-lg font-bold bg-clip-text flex items-center justify-center text-transparent">
//                     Welcome back, {user}
//                 </p>
//             </div>

//             <div className='hidden lg:flex items-center gap-4 p-1'>

//                 {
//                     data.map((data, index) => {

//                         return (
//                             <p onClick={() => {
//                                 if (index == 1) {
//                                     navigate(`/tests/${batch_id}`)
//                                 } else {
//                                     navigate('/dashboard')
//                                 }
//                             }} className='text-gray-400 text-lg font-semibold hover:text-black transition-text duration-400 cursor-pointer' key={`${data.content}_${index}`}>{data.content}</p>
//                         )
//                     })
//                 }


//             </div>

//             {/* Hamburger for small screens */}
//             <div className="flex items-center lg:hidden">
//                 <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 focus:outline-none">
//                     {isOpen ? <FiX /> : <FiMenu />}
//                 </button>
//             </div>



//             {/* Links - shown always on md+, toggle on small */}
//             {
//                 isOpen && (<motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 1 }}
//                     transition={{ duration: 0.6, ease: 'easeInOut' }}
//                     className={`w-full lg:hidden`}>


//                     {
//                         <motion.div
//                             initial={false}
//                             animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//                             transition={{ duration: 0.5, ease: 'easeInOut' }}
//                             className="overflow-hidden w-full lg:flex lg:items-center lg:w-auto lg:gap-6 lg:opacity-100 lg:h-auto"
//                         >

//                             <motion.div
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.3, duration: 0.5 }}
//                                 className="flex flex-col lg:flex-row items-center gap-4 mt-4 md:mt-0"
//                             >
//                                 {data.map((item, index) => (
//                                     <p
//                                         onClick={() => {
//                                             if (index == 1) {
//                                                 navigate('/tests')
//                                             }
//                                         }}
//                                         className="text-gray-500 text-base md:text-lg cursor-pointer hover:text-black transition-colors duration-300"
//                                         key={`${item.content}_${index}`}
//                                     >
//                                         {item.content}
//                                     </p>
//                                 ))}

//                                 <button
//                                     onClick={() => {
//                                         logout()
//                                     }}
//                                     className="lg:hidden w-[90%] p-2  bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-[0_130px_35px_rgba(79,70,229,0.01),0_75px_36px_rgba(79,70,229,0.03),0_42px_30px_rgba(79,70,229,0.08),0_18px_22px_rgba(79,70,229,0.14),0_4px_12px_rgba(79,70,229,0.16)] opacity-100 will-change-transform">
//                                     <div className="p-2 font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] border-[1.37px] border-solid border-[rgba(255,255,255,0.04)] opacity-100 text-white">
//                                         Logout
//                                     </div>
//                                 </button>
//                             </motion.div>

//                         </motion.div>

//                     }
//                 </motion.div>)
//             }
//             <button onClick={() => {
//                 logout()
//             }} className="hidden cursor-pointer lg:block w-[25%] p-1  bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-[0_130px_35px_rgba(79,70,229,0.01),0_75px_36px_rgba(79,70,229,0.03),0_42px_30px_rgba(79,70,229,0.08),0_18px_22px_rgba(79,70,229,0.14),0_4px_12px_rgba(79,70,229,0.16)] opacity-100 will-change-transform">
//                 <div className="p-1 font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] border-[1.37px] border-solid border-[rgba(255,255,255,0.04)] opacity-100 text-white">
//                     Logout
//                 </div>
//             </button>
//         </div>
//     )
// };

// export default StudentNavbar;

import React, { useState } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const StudentNavbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, batch_id } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: 'Notes', onClick: () => navigate('/dashboard') },
        { label: 'Tests', onClick: () => navigate(`/tests/${batch_id}`) },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Brand / Welcome */}
                <p className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    Welcome, {user}
                </p>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={link.onClick}
                            className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-300"
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-2xl text-gray-700 focus:outline-none"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="lg:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4"
                >
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    link.onClick();
                                    setIsOpen(false);
                                }}
                                className="text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300"
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={logout}
                            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default StudentNavbar;
