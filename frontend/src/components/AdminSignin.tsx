import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, KeyRound } from "lucide-react"
import useAdmin from "../hooks/useAdmin"

const AdminSignin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { onAdminLogin } = useAdmin()

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 font-mono">
            <div className="w-full max-w-md">


                <div className="text-center mb-10">
                    <p className="text-sm tracking-widest text-gray-400">
                        ADMIN ACCESS
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-gray-900">
                        Sign in
                    </h1>
                    <p className="mt-4 text-sm text-gray-600">
                        Authorized personnel only. Please enter your credentials.
                    </p>
                </div>

                <div className="space-y-6">


                    <div className="space-y-1">
                        <label className="text-sm text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full border border-gray-300 px-10 py-3 text-sm focus:outline-none focus:border-[#FF6B2C]"
                            />
                        </div>
                    </div>


                    <div className="space-y-1">
                        <label className="text-sm text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full border border-gray-300 px-10 py-3 text-sm focus:outline-none focus:border-[#FF6B2C]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>


                    <div className="space-y-1">
                        <label className="text-sm text-gray-700">
                            Secret Pass Key
                        </label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Enter secret key"
                                className="w-full border border-gray-300 px-10 py-3 text-sm focus:outline-none focus:border-[#FF6B2C]"
                            />
                        </div>
                    </div>


                    <button
                        onClick={() => {

                            onAdminLogin("token")
                        }}
                        className="w-full mt-4 bg-[#FF6B2C] text-white py-3 text-sm hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </div>


                <p className="mt-8 text-xs text-center text-gray-400">
                    This area is restricted to administrators only.
                </p>
            </div>
        </div>
    )
}

export default AdminSignin
