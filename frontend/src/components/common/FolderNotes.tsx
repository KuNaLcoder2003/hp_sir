import React, { useEffect, useState, type FormEvent } from 'react'
import { BookOpen, Loader, Plus, X } from 'lucide-react'
import { CiFileOn } from "react-icons/ci"
import Modal from './Modal'

import { type Content, type newContent } from '../../types/teacher'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import StudentNavbar from '../students/StudentNavbar'


const FolderNotes: React.FC<{ account: string }> = ({ account }) => {
    const params = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        fetch_content()
    }, [])
    const [content, setContent] = useState<Content[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetch_content = async () => {
        setLoading(true)
        const subjectId = params.pathname.split('/').at(-2)
        const folderId = params.pathname.split('/').at(-1)

        try {
            fetch('http://localhost:3000/api/v1/student/content/' + `${subjectId}` + '/' + `${folderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res: Response) => {
                const data = await res.json()
                if (data.content) {
                    setContent(data.content)
                    setLoading(false)
                    console.log(data.content)
                } else {
                    toast.error(data.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            toast.error('somethig went wrong')
            setLoading(false)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [newContent, setNewContent] = useState<newContent>({
        content_name: "",
        type: "",
        content: []
    })

    function handleFile(e: any) {
        setNewContent({
            ...newContent,
            content: e.target.files
        })
    }

    const addNewContent = (e: FormEvent) => {
        e.preventDefault();
        const subjectId = params.pathname.split('/').at(-2)
        const folderId = params.pathname.split('/').at(-1)
        try {

            const formData = new FormData()
            formData.append('content_name', newContent.content_name)
            formData.append('type', newContent.type)
            formData.append('content', newContent.content[0])
            fetch('http://localhost:3000/api/v1/teacher/content/' + `${subjectId}` + '/' + `${folderId}`, {
                method: 'POST',
                body: formData
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.new_content) {
                    setIsModalOpen(false)

                    toast.success(data.message)
                } else {

                    toast.error(data.message)
                }
            })
        } catch (error) {

            toast.error("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {
                account == "teacher" && isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                            <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                                <form onSubmit={(e) => addNewContent(e)} className='flex flex-col p-4 bg-white w-full gap-4 rounded-lg'>
                                    <div className='flex w-full justify-between items-center'>
                                        <h2 className='text-lg font-bold'>Create new course </h2>
                                        <X onClick={() => setIsModalOpen(false)} className='cursor-pointer' />
                                    </div>
                                    <div className='flex flex-col gap-2 items-baseline w-full'>
                                        <div className='w-full'>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Content Name</label>
                                            <input
                                                value={newContent.content_name}
                                                onChange={(e) => {
                                                    setNewContent({
                                                        ...newContent,
                                                        content_name: e.target.value
                                                    })

                                                }
                                                }
                                                type="text"
                                                placeholder="Enter content name..."
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">File type</label>
                                            <input
                                                value={newContent.type}
                                                onChange={(e) => {
                                                    setNewContent({
                                                        ...newContent,
                                                        type: e.target.value
                                                    })
                                                }}
                                                type="text"
                                                placeholder="Enter type of file..."
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                                            <input
                                                onChange={(e) => { handleFile(e) }}
                                                type="file"
                                                placeholder="Choose a File"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <button type="submit" className='w-full bg-black text-white p-2 rounded-lg'>Add new Content</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                )
            }

            {
                account == "teacher" ? <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Welcome, Mr. Himanshu Parnami</h1>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">
                                Logout
                            </button>
                        </div>
                    </div>
                </header> : <StudentNavbar />
            }


            <main className={`max-w-7xl mx-auto ${account == "teacher" ? "mt-8" : "mt-16"} p-6`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Folder Notes</h1>
                    {
                        account == "teacher" ? <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                        >
                            <Plus className="w-4 h-4" /> Add New Note
                        </button> : null
                    }
                </div>


                {
                    loading ? <div className="flex justify-center items-center h-[50vh]">
                        <Loader className="animate-spin text-indigo-600 w-10 h-10" />
                    </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            content.length > 0 ? content.map((obj) => (
                                <div
                                    key={obj.id}
                                    onClick={() => navigate(`/student/pdf?url=${encodeURIComponent(obj.content_url)}`)}
                                    className="flex flex-col items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                                >
                                    <CiFileOn className="text-4xl text-indigo-500 mb-2" />
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">{obj.content_name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">Uploaded: {obj.uploaded_on}</p>
                                </div>
                            )) : <p>No content uploaded yet</p>
                        }
                    </div>
                }
            </main>
        </div >
    )
}

export default FolderNotes
