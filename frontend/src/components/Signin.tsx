import React, { useState, type FormEvent } from 'react'
import { BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
interface Prop {
    setIsLOggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Signin: React.FC<Prop> = ({ setIsLOggedIn }) => {
    const [cred, setCred] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            fetch('https://hp-sir.onrender.com/api/v1/student/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cred: {
                        email: cred.email,
                        password: cred.password
                    }
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.token) {
                    toast.success(data.message)
                    setIsLOggedIn(true)
                    navigate("/dashboard")
                    localStorage.setItem('token', `Bearer ${data.token}`)
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
        <div className='p-4 '>
            <Toaster />

            <div className='max-w-7xl m-auto h-screen flex flex-col justify-center items-center gap-4'>

                <div className='p-4  flex flex-col justify-center items-center'>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className='text-5xl font-bold'>Sign in to your account</h1>
                    <p className='text-5xl font-bold text-gray-300'>Get access to your courses</p>
                </div>

                <h2 className='text-center text-3xl font-bold'>Enter Your credentials here</h2>

                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-center items-center lg:w-[30%] gap-2 shadow-xl p-4 py-8 rounded-lg'>

                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Email : </p>
                        <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Password</p>
                        <input placeholder='enter your password...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <button type="submit" className='bg-black text-white font-bold lg:w-[90%] p-1 rounded-lg'>Login</button>
                        <p className='text-center'>New User? <span className='text-blue-500 underline cursor-pointer mt-4' onClick={() => navigate('/register')}>Signup</span> </p>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Signin
