

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

const TeacherAuth: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="relative w-full max-w-3xl h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                {/* Left Side Image/Brand */}
                <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-black to-gray-800 text-white p-6">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                        <BookOpen className="text-black w-7 h-7" />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Teacher Portal</h1>
                    <p className="text-gray-300 text-center mt-2 px-4">
                        Manage your classes, students, and resources with ease.
                    </p>
                </div>

                {/* Sliding Form Section */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full flex flex-col items-center p-6"
                            >
                                <h2 className="text-2xl font-bold mb-2">Welcome Back 👋</h2>
                                <p className="text-gray-500 mb-6">
                                    Sign in to continue to your account
                                </p>

                                <form className="w-full max-w-sm flex flex-col gap-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <button className="bg-indigo-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition">
                                        Sign In
                                    </button>
                                </form>

                                <p className="mt-4 text-gray-600">
                                    Don’t have an account?{" "}
                                    <span
                                        onClick={() => setIsLogin(false)}
                                        className="text-indigo-600 font-bold cursor-pointer"
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 200, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full flex flex-col items-center p-6"
                            >
                                <h2 className="text-2xl font-bold mb-2">Create Account 🎉</h2>
                                <p className="text-gray-500 mb-6">
                                    Join the portal and manage your teaching journey
                                </p>

                                <form className="w-full max-w-sm flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <button className="bg-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition">
                                        Sign Up
                                    </button>
                                </form>

                                <p className="mt-4 text-gray-600">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setIsLogin(true)}
                                        className="text-pink-600 font-bold cursor-pointer"
                                    >
                                        Sign In
                                    </span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TeacherAuth;
