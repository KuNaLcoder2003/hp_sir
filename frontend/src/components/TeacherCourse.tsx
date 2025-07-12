import React, { useState, useEffect, type FormEvent } from 'react'
import { BookOpen, X } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'


interface Prop {
    content_name: string,
    uploaded_on: string,
    type: string,
}

interface Subject {
    id: number,
    subject_name: string,
    batchId: number,
    createdAt: string,
    updatedAt: string
}

interface Content {
    id: number,
    content_name: string,
    subjectId: number,
    content_url: string,
    type: string,
    uploaded_on: string
}

interface cont {
    content_id: number,
    content_url: string,
    content_name: string
}

interface newContent {
    content_name: string,
    type: string,
    content: File[]
}

interface SubjectContents {
    subject_id: number,
    subject_name: string,
    contents: cont[]

}
const ContentCard: React.FC<Prop> = ({ content_name, uploaded_on, type }) => {
    return (
        <div className='w-[300px] h-[100px] p-2 bg-stone-100 flex flex-col items-baseline rounded-lg shadow-lg'>
            <h2 className='text-xl font-bold text-gray-500'>{content_name}</h2>
            <div className='flex w-full items-center gap-4'>
                <p className='text-lg text-semibold'>{uploaded_on}</p>
                <p className='text-lg text-semibold'>{type}</p>
            </div>
        </div>
    )
}

interface NewSubject {
    subject_name : string,
    duration : number
}

const TeacherCourse = () => {
    const [uploadScreen, setUploadScreen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)
    const [subjectUploadId, setSubjectUploadId] = useState<number>(1)
    const [addNewSubject , setAddNewSubject] = useState<boolean>(false)
    const [newSubject , setNewSubject] = useState<NewSubject>({
        subject_name : "",
        duration : 0
    })
    const [newContent, setNewContent] = useState<newContent>({
        content_name: "",
        type: "",
        content: []
    })
    
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [subjectContents, setSubjectContents] = useState<SubjectContents[]>([])
    const params = useLocation()
    useEffect(() => {
        const id = params.pathname.split('/')[3]
        try {
            setLoading(true)
            fetch('http://localhost:3000/api/v1/teacher/course/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.batch_name) {
                    
                    setSubjects(data.subjects)
                    let arr = subject_contents_merge(data.subjects, data.content)
                    setSubjectContents(arr)

                } else {
                    toast.error(data.message)
                }
                setLoading(false)
            })
        } catch (error) {
            toast.error("Something went wrong")
        }
    }, [])

    function subject_contents_merge(subjects: Subject[], content: Content[]) {
        let arr: SubjectContents[] = [];
        for (let i = 0; i < subjects.length; i++) {
            let obj: SubjectContents
            for (let k = 0; k < content.length; k++) {
                let matched = arr.find(obj => obj.subject_id == subjects[i].id)
                if (content[k].subjectId == subjects[i].id) {
                    if (matched) {
                        obj = {
                            ...matched,
                            contents: [...matched.contents, {
                                content_id: content[k].id,
                                content_name: content[k].content_name,
                                content_url: content[k].content_url
                            }]
                        }
                        arr = arr.map((o) => {
                            if (o.subject_id == obj.subject_id) {
                                return obj
                            } else {
                                return o
                            }
                        })
                    } else {
                        obj = {
                            subject_id: subjects[i].id,
                            subject_name: subjects[i].subject_name,
                            contents: [{ content_id: content[k].id, content_name: content[k].content_name, content_url: content[k].content_url }]
                        }
                        arr.push(obj)
                    }
                }
            }
        }
        return arr
    }
    function handleFile(e: any) {
        setNewContent({
            ...newContent,
            content: e.target.files
        })
    }
    function addNewContent(e: FormEvent) {
        e.preventDefault();
        try {
            setUploadLoading(true)
            const formData = new FormData()
            formData.append('content_name', newContent.content_name)
            formData.append('type', newContent.type)
            formData.append('content', newContent.content[0])
            fetch('http://localhost:3000/api/v1/teacher/content/' + `${subjectUploadId}`, {
                method: 'POST',
                body: formData
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.new_content) {
                    setUploadScreen(false)
                    setUploadLoading(false)
                    toast.success(data.message)
                } else {
                    setUploadLoading(false)
                    toast.error(data.message)
                }
            })
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }
    }
    function handleAddNewSubject(e : FormEvent) {
        e.preventDefault();
        const id = params.pathname.split('/')[3]
        console.log(id)
        try {
            fetch('http://localhost:3000/api/v1/teacher/subject/' + id , {
            method : 'POST' , 
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                subject : newSubject.subject_name
            })
        }).then(async(response : Response)=> {
            const data = await response.json();
            if(data.valid) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
            
        })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <Toaster />
            {
                addNewSubject && (
                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                         <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                              <form onSubmit={(e) => handleAddNewSubject(e)} className='flex flex-col p-4 bg-white w-full gap-4 rounded-lg'>
                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='text-lg font-bold'>Create new course </h2>
                                    <X onClick={() => setAddNewSubject(false)} className='cursor-pointer' />
                                </div>
                                <div className='flex flex-col gap-2 items-baseline w-full'>
                                    <div className='w-full'>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                                        <input
                                            value={newSubject.subject_name}
                                            onChange={(e) => {
                                                setNewSubject({
                                                    ...newSubject ,
                                                    subject_name : e.target.value
                                                })
                                            }}
                                            type="text"
                                            placeholder="Enter subject name..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                        <input
                                            value={newSubject.duration}
                                            onChange={(e) => {
                                                setNewSubject({
                                                    ...newSubject , 
                                                    duration : Number(e.target.value)
                                                })
                                            }}
                                            type="number"
                                            placeholder="Enter duration..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <button type="submit" className='w-full bg-black text-white p-2 rounded-lg'>Add new Content</button>
                                </div>
                            </form>
                         </div>
                    </div>
                )
            }
            {
                uploadScreen && (
                    uploadLoading ? <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                        <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                            <p className='text-center font-bold text-lg'>Uploading...</p>
                        </div>
                    </div> : (<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                        <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                            <form onSubmit={(e) => addNewContent(e)} className='flex flex-col p-4 bg-white w-full gap-4 rounded-lg'>
                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='text-lg font-bold'>Create new course </h2>
                                    <X onClick={() => setUploadScreen(false)} className='cursor-pointer' />
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
                                            }}
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
                    </div>)
                )
            }
            {
                loading ? <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    Loading...
                </div> : (<>
                <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome, Mr. Himanshu Parnami</h1>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-[75%] mt-10 p-4 m-auto shadow-lg rounded-lg bg-white">
                <div className='flex flex-col gap-4 lg:flex-row items-center justify-between'>
                    <h1 className="text-3xl p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Class 10th Foundation Batch</h1>
                    <div className='flex items-center justify-end m-auto w-[100%] lg:w-[60%] gap-4'>
                        <button onClick={()=> {
                            setAddNewSubject(true)
                        }} className="p-2 w-[50%] lg:w-[30%] bg-red-500 text-white font-bold rounded-lg cursor-pointer">Add Subject</button>
                        <button className="p-2 w-[50%] lg:w-[30%] bg-red-500 text-white font-bold rounded-lg cursor-pointer">Students</button>
                    </div>
                </div>
                <div className='flex flex-col gap-8 w-full mt-8'>
                    {
                       subjects.length == 0 ? (<div className='flex items-center justify-center text-xl font-bold'>No subjects yet add one</div>) :  subjects.map((subject, index) => {
                            return (
                                <div key={subject.id} className="w-full m-auto flex flex-col items-center justify-between">
                                    <div className='flex w-full justify-between items-center'>
                                        <h2 className="text-2xl p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>{subject.subject_name}</h2>
                                        <button onClick={() => {
                                            setUploadScreen(true)
                                            setSubjectUploadId(subject.id)
                                        }} className="p-1 lg:p-2 w-[50%] lg:w-[20%] bg-blue-500 text-white font-bold rounded-lg cursor-pointer">Add New Content</button>
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <h2 className="text-lg p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Current Content</h2>
                                        <div className='w-full flex flex-wrap gap-4 items-center'>
                                            {
                                                subjectContents[index] ? subjectContents[index].contents.map(object => {
                                                    return (
                                                        <ContentCard content_name={object.content_name} type={'PDF'} uploaded_on={'12-07-2025'} />
                                                    )
                                                }) : (<div>No content yet</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
                </>)
            }
        </div>
    )
}

export default TeacherCourse
