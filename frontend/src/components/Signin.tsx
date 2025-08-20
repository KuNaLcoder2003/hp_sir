// import React, { useState, type FormEvent } from 'react'
// import { BookOpen } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import toast, { Toaster } from 'react-hot-toast'
// interface Prop {
//     setIsLOggedIn: React.Dispatch<React.SetStateAction<boolean>>
// }

// const Signin: React.FC<Prop> = ({ setIsLOggedIn }) => {
//     const [cred, setCred] = useState({
//         email: "",
//         password: ""
//     })
//     const navigate = useNavigate()
//     function handleSubmit(e: FormEvent) {
//         e.preventDefault()
//         try {
//             fetch('https://hp-sir.onrender.com/api/v1/student/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     cred: {
//                         email: cred.email,
//                         password: cred.password
//                     }
//                 })
//             }).then(async (response: Response) => {
//                 const data = await response.json()
//                 if (data.token) {
//                     toast.success(data.message)
//                     setIsLOggedIn(true)
//                     navigate("/dashboard")
//                     localStorage.setItem('token', `Bearer ${data.token}`)
//                 } else {
//                     toast.error(data.message)
//                 }
//             })
//         } catch (error) {
//             toast.error('Something went wrong')
//         }
//     }
//     return (
//         <div className='p-4 '>
//             <Toaster />

//             <div className='max-w-7xl m-auto h-screen flex flex-col justify-center items-center gap-4'>

//                 <div className='p-4  flex flex-col justify-center items-center'>
//                     <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//                         <BookOpen className="w-5 h-5 text-white" />
//                     </div>
//                     <h1 className='text-5xl font-bold'>Sign in to your account</h1>
//                     <p className='text-5xl font-bold text-gray-300'>Get access to your courses</p>
//                 </div>

//                 <h2 className='text-center text-3xl font-bold'>Enter Your credentials here</h2>

//                 <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-center items-center lg:w-[30%] gap-2 shadow-xl p-4 py-8 rounded-lg'>

//                     <div className='w-full p-1 flex flex-col'>
//                         <p className='text-md font-bold'>Email : </p>
//                         <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} />
//                     </div>
//                     <div className='w-full p-1 flex flex-col'>
//                         <p className='text-md font-bold'>Password</p>
//                         <input placeholder='enter your password...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} />
//                     </div>
//                     <div className='w-full p-1 flex flex-col'>
//                         <button type="submit" className='bg-black text-white font-bold lg:w-[90%] p-1 rounded-lg'>Login</button>
//                         <p className='text-center'>New User? <span className='text-blue-500 underline cursor-pointer mt-4' onClick={() => navigate('/register')}>Signup</span> </p>
//                     </div>
//                 </form>

//             </div>

//         </div>
//     )
// }

// export default Signin


import React, { useState, type FormEvent } from 'react'
import { BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../context/authContext'



const Signin: React.FC = ({ }) => {
    const [cred, setCred] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { login } = useAuth()
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            login(cred)
        } catch {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Toaster />
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h1>
                    <p className="text-gray-500 text-sm">Get access to your courses</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={cred.email}
                            onChange={(e) => setCred({ ...cred, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={cred.password}
                            onChange={(e) => setCred({ ...cred, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    New user?{" "}
                    <span
                        className="text-indigo-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Signin
