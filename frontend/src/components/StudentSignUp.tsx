// import React, { useEffect, useState, type FormEvent } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { BookOpen, User2Icon, Clock } from 'lucide-react'
// import toast, { Toaster } from 'react-hot-toast'

// // interface Details {
// //     first_name: string,
// //     last_name: string,
// //     email: string,
// //     password: string,
// //     avatar: File[],
// // }

// interface Subject {
//     id: number,
//     subject_name: string,
//     batchId: number,
//     createdAt?: string,
//     updatedAt?: string
// }

// interface Batch {
//     id: number,
//     batch_name: string,
//     duration: number
// }

// interface Props {
//     batch_id: number,
//     index: number,
//     batch_name: string,
//     subjects: Subject[],
//     setSelectedBatchId: React.Dispatch<React.SetStateAction<number>>
// }
// interface Batches_Subjects {
//     batch_id: number,
//     batch_name: string,
//     subjects: Subject[]
// }

// interface Ids {
//     subjectId: number
// }

// interface Course {
//     batchId?: number,
//     subjects: Ids[]
// }

// interface Register {
//     first_name: string,
//     last_name: string,
//     email: string,
//     password: string,
//     batch: Course
// }

// const Card: React.FC<Props> = ({ subjects, batch_name, setSelectedBatchId, index }) => {
//     // const navigate = useNavigate()
//     return (
//         <div className='p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[45%] m-auto overflow-hidden shadow-xl rounded-lg'>
//             <div className='p-2 flex flex-col items-baseline gap-4'>
//                 {/* Header */}
//                 <div className='flex flex-col items-start gap-2 p-1 w-full'>
//                     <div className='flex items-center gap-4'>
//                         <div className='flex items-center'>
//                             <BookOpen size={28} />
//                         </div>
//                         <h2
//                             style={{
//                                 backgroundImage:
//                                     'radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)',
//                             }}
//                             className='text-lg sm:text-xl bg-clip-text text-transparent font-bold'
//                         >
//                             {batch_name}
//                         </h2>
//                     </div>
//                     <p className='text-gray-500 p-1 w-full text-sm sm:text-base'>
//                         {batch_name}
//                     </p>
//                 </div>

//                 {/* Info Section */}
//                 <div className='flex flex-col items-start p-1 gap-2'>
//                     <div className='flex items-center w-full gap-2 p-1'>
//                         <User2Icon size={18} color='gray' />
//                         <h2 className='text-sm sm:text-base text-gray-500'>
//                             Subjects : {
//                                 subjects.length == 0 ? <p>No subjects added yet</p> : subjects.map((subject, idx) => {
//                                     return (
//                                         <span key={`${subject}_${idx}`}>{subject.subject_name} , </span>
//                                     )
//                                 })
//                             }
//                         </h2>
//                     </div>
//                     <div className='flex items-center w-full gap-2 p-1'>
//                         <Clock size={18} color='gray' />
//                         <h2 className='text-sm sm:text-base text-gray-500'>
//                             Duration : {12} months
//                         </h2>
//                     </div>
//                     <div className='flex items-center w-full gap-2 p-1'>
//                         <div className='w-[15px] h-[15px] rounded-full bg-green-500'></div>
//                         <h2 className='text-sm sm:text-base text-gray-500'>Mode : Offline</h2>
//                     </div>
//                 </div>

//                 {/* Key Features */}
//                 <div className='flex flex-col items-start p-1 gap-2'>
//                     <h3 className='text-base sm:text-lg font-semibold'>Key features:</h3>
//                     <div className='flex flex-col items-start gap-2'>
//                         {['Conceptual clarity', 'Problem solving', 'Regular assesments'].map((feature, idx) => (
//                             <div className='flex items-center gap-2' key={idx}>
//                                 <div className='w-[10px] h-[10px] rounded-full bg-blue-500'></div>
//                                 <p className='text-sm sm:text-base text-gray-500'>{feature}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Button */}
//                 <button onClick={() => setSelectedBatchId(index)} className='w-full p-2 bg-blue-700 text-white text-sm sm:text-base font-bold rounded-lg cursor-pointer'>
//                     Select
//                 </button>
//             </div>
//         </div>
//     )
// }

// const StudentSignUp = () => {
//     const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
//     const [batches, setBatches] = useState<Batch[]>([])
//     const [selectedBatchId, setSelectedBatchId] = useState<number>(-1)
//     const [selecetdSubjects, setSelectedSubjects] = useState<number[]>([])

//     function merge_courses_subjects(batches: Batch[], subjects: Subject[]) {
//         let arr: Batches_Subjects[] = [];
//         for (let i = 0; i < batches.length; i++) {
//             let obj: Batches_Subjects
//             for (let j = 0; j < subjects.length; j++) {
//                 if (batches[i].id == subjects[j].batchId) {
//                     const matched = arr.find(obj => obj.batch_id == batches[i].id)
//                     if (matched) {
//                         obj = {
//                             ...matched,
//                             subjects: [...matched.subjects, { subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
//                         }
//                         arr = arr.map((o) => {
//                             if (obj.batch_id == o.batch_id) {
//                                 return obj
//                             } else {
//                                 return o
//                             }
//                         })
//                     } else {
//                         obj = {
//                             batch_id: batches[i].id,
//                             batch_name: batches[i].batch_name,
//                             subjects: [{ subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
//                         }
//                         arr.push(obj)
//                     }
//                 }
//             }
//         }
//         console.log(arr)
//         return arr;
//     }

//     useEffect(() => {
//         try {
//             fetch('https://hp-sir.onrender.com/api/v1/student/batches/subjects', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }).then(async (response: Response) => {
//                 const data = await response.json()
//                 if (data.batches) {
//                     setBatches(data.batches)
//                     let arr = merge_courses_subjects(data.batches, data.subjects)
//                     setcourses_subjects(arr)
//                 } else {
//                     toast.error(data.message)
//                 }
//             })
//         } catch (error) {
//             toast.error('Something went wrong')
//         }
//     }, [])

//     const [details, setDetails] = useState<Register>({
//         first_name: "",
//         last_name: "",
//         email: "",
//         password: "",
//         batch: {
//             batchId: 0,
//             subjects: []
//         }
//     })


//     const navigate = useNavigate()
//     function handleSubmit(e: FormEvent) {
//         e.preventDefault()
//         console.log(details)
//         try {
//             fetch('https://hp-sir.onrender.com/api/v1/student/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     first_name: details.first_name,
//                     last_name: details.last_name,
//                     email: details.email,
//                     password: details.password,
//                     batch: details.batch
//                 })
//             }).then(async (response) => {
//                 const data = await response.json();
//                 if (data.student) {
//                     toast.success(data.message)
//                     navigate('/signin')
//                 } else {
//                     toast.error(data.message)
//                 }
//             })
//         } catch (error) {
//             toast.error('Something went wrong')
//         }
//     }
//     return (
//         <div>
//             {
//                 selectedBatchId < 0 ? <div className='p-4 '>

//                     <div className='max-w-7xl m-auto min-h-screen flex flex-col justify-center items-center gap-4'>

//                         <div className='p-4  flex flex-col justify-center items-center'>
//                             <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//                                 <BookOpen className="w-5 h-5 text-white" />
//                             </div>
//                             <h1 className='text-5xl font-bold'>Register in your desired batch</h1>
//                             <p className='text-5xl font-bold text-gray-300'>Get access to your content</p>
//                         </div>

//                         <h2 className='text-center text-3xl font-bold'>Choose from here</h2>

//                         <div className="w-[75%] mt-10 p-4 m-auto shadow-lg rounded-lg bg-white">
//                             <div className="max-w-full m-auto flex items-center justify-between">
//                                 <h2 className="text-2xl p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Ongoing batches</h2>
//                             </div>
//                             <div className="max-w-full m-auto mt-8 flex flex-col lg:flex-row lg:flex-wrap p-1">
//                                 {
//                                     batches.map((obj, index) => {
//                                         return (
//                                             <>
//                                                 {
//                                                     courses_subjects[index] ? <Card index={index} setSelectedBatchId={setSelectedBatchId} subjects={courses_subjects[index].subjects} batch_name={courses_subjects[index].batch_name} key={courses_subjects[index].batch_id} batch_id={courses_subjects[index].batch_id} /> : <Card index={index} setSelectedBatchId={setSelectedBatchId} subjects={[]} batch_name={obj.batch_name} key={obj.id} batch_id={obj.id} />
//                                                 }
//                                             </>
//                                         )
//                                     })
//                                 }
//                             </div>
//                         </div>
//                     </div>

//                 </div> : <>
//                     <Toaster />
//                     <div className='max-w-5xl mt-20 m-auto min-h-auto flex flex-col justify-center items-center gap-4 bg-white rounded-lg shadow-lg p-4'>
//                         <h2 className='text-2xl font-bold'>Selected Batch : {courses_subjects[selectedBatchId].batch_name}</h2>

//                         <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col p-4 w-full gap-4 rounded-lg'>
//                             <div className='flex w-full justify-center items-center'>
//                                 <h2 className='text-lg font-bold text-center'>Select Subjects</h2>
//                             </div>
//                             {
//                                 courses_subjects[selectedBatchId] ? <div className='flex flex-col gap-2'>
//                                     {
//                                         courses_subjects[selectedBatchId].subjects.map((obj) => {
//                                             return (
//                                                 <div className='flex items-center gap-4 p-4'>
//                                                     <p className='text-xl lg:text-2xl font-semibold'>{obj.subject_name}</p>
//                                                     <div onClick={() => {
//                                                         setDetails({
//                                                             ...details,
//                                                             batch: {
//                                                                 batchId: obj.batchId,
//                                                                 subjects: [...details.batch.subjects, { subjectId: obj.id }]
//                                                             }
//                                                         })
//                                                         setSelectedSubjects([...selecetdSubjects, obj.id])
//                                                     }} className='p-[0.02rem] cursor-pointer bg-blue-500 text-lg text-white text-center w-[100px] font-bold rounded-lg'>Select</div>
//                                                 </div>
//                                             )
//                                         })
//                                     }
//                                     <div onClick={() => {
//                                         setDetails({
//                                             ...details,
//                                             batch: {
//                                                 batchId: courses_subjects[selectedBatchId].batch_id,
//                                                 subjects: courses_subjects[selectedBatchId].subjects.map(obj => {
//                                                     return { subjectId: obj.id }
//                                                 })
//                                             }
//                                         })
//                                         setSelectedSubjects(courses_subjects[selectedBatchId].subjects.map(obj => {
//                                             return obj.id
//                                         }))
//                                     }} className='flex items-center gap-4 p-4'>
//                                         <p className='text-xl lg:text-2xl font-semibold'>Both</p>
//                                         <div className='p-[0.02rem] cursor-pointer bg-blue-500 text-lg text-white text-center w-[100px] font-bold rounded-lg'>Select</div>
//                                     </div>
//                                     {
//                                         selecetdSubjects.length == 0 ? null : (<div className='w-[90%] m-auto bg-white rounded-lg lg:w-[70%] flex flex-col items-center gap-4 p-4'>
//                                             <h3 className='text-xl lg:text-3xl font-bold bg-clip-text text-transparent' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Fill Your Details</h3>
//                                             <div className='w-full p-1 flex flex-col'>
//                                                 <p className='text-md font-bold'>First Name : </p>
//                                                 <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={details?.first_name} onChange={(e) => setDetails({ ...details, first_name: e.target.value })} />
//                                             </div>
//                                             <div className='w-full p-1 flex flex-col'>
//                                                 <p className='text-md font-bold'>Last Name : </p>
//                                                 <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={details?.last_name} onChange={(e) => setDetails({ ...details, last_name: e.target.value })} />
//                                             </div>
//                                             <div className='w-full p-1 flex flex-col'>
//                                                 <p className='text-md font-bold'>Email : </p>
//                                                 <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={details?.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
//                                             </div>
//                                             <div className='w-full p-1 flex flex-col'>
//                                                 <p className='text-md font-bold'>Password</p>
//                                                 <input placeholder='enter your password...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={details?.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} />
//                                             </div>
//                                             <div className='w-full p-1 flex flex-col'>
//                                                 <button type="submit" className='bg-black text-white font-bold lg:w-[90%] p-1 rounded-lg'>Login</button>
//                                             </div></div>)
//                                     }
//                                 </div> : <div>No subjects yet</div>
//                             }
//                         </form>
//                     </div>
//                 </>
//             }
//         </div>
//     )
// }
// export default StudentSignUp

import React, { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, User2Icon, Clock } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface Subject {
    id: number,
    subject_name: string,
    batchId: number,
    createdAt?: string,
    updatedAt?: string
}

interface Batch {
    id: number,
    batch_name: string,
    duration: number
}

interface Props {
    batch_id: number,
    index: number,
    batch_name: string,
    subjects: Subject[],
    setSelectedBatchId: React.Dispatch<React.SetStateAction<number>>
}
interface Batches_Subjects {
    batch_id: number,
    batch_name: string,
    subjects: Subject[]
}

interface Ids {
    subjectId: number
}

interface Course {
    batchId?: number,
    subjects: Ids[]
}

interface Register {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    batch: Course
}

const Card: React.FC<Props> = ({ subjects, batch_name, setSelectedBatchId, index }) => {
    return (
        <div className='p-6 w-full sm:w-[80%] md:w-[70%] lg:w-[45%] m-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col gap-4'>
                {/* Header */}
                <div className='flex items-center gap-3'>
                    <BookOpen size={28} className="text-indigo-700" />
                    <div>
                        <h2 className='text-xl font-bold text-gray-900'>{batch_name}</h2>
                        <p className='text-gray-500 text-sm'>Exclusive learning experience</p>
                    </div>
                </div>

                {/* Info Section */}
                <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                        <User2Icon size={18} className="text-gray-500" />
                        <span className='text-gray-600 text-sm'>
                            Subjects: {
                                subjects.length === 0
                                    ? "No subjects added yet"
                                    : subjects.map((subject, idx) => (
                                        <span key={idx}>{subject.subject_name}{idx < subjects.length - 1 && ', '}</span>
                                    ))
                            }
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Clock size={18} className="text-gray-500" />
                        <span className='text-gray-600 text-sm'>Duration: 12 months</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-3 h-3 rounded-full bg-green-500'></div>
                        <span className='text-gray-600 text-sm'>Mode: Offline</span>
                    </div>
                </div>

                {/* Key Features */}
                <div>
                    <h3 className='text-base font-semibold text-gray-800 mb-2'>Key Features</h3>
                    <ul className='space-y-1'>
                        {['Conceptual clarity', 'Problem solving', 'Regular assessments'].map((feature, idx) => (
                            <li key={idx} className='flex items-center gap-2 text-sm text-gray-600'>
                                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Button */}
                <button
                    onClick={() => setSelectedBatchId(index)}
                    className='w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors duration-300'
                >
                    Select Batch
                </button>
            </div>
        </div>
    )
}

const StudentSignUp = () => {
    const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
    const [batches, setBatches] = useState<Batch[]>([])
    const [selectedBatchId, setSelectedBatchId] = useState<number>(-1)
    const [selecetdSubjects, setSelectedSubjects] = useState<number[]>([])

    function merge_courses_subjects(batches: Batch[], subjects: Subject[]) {
        let arr: Batches_Subjects[] = [];
        for (let i = 0; i < batches.length; i++) {
            let obj: Batches_Subjects
            for (let j = 0; j < subjects.length; j++) {
                if (batches[i].id == subjects[j].batchId) {
                    const matched = arr.find(obj => obj.batch_id == batches[i].id)
                    if (matched) {
                        obj = {
                            ...matched,
                            subjects: [...matched.subjects, { subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
                        }
                        arr = arr.map((o) => o.batch_id === obj.batch_id ? obj : o)
                    } else {
                        obj = {
                            batch_id: batches[i].id,
                            batch_name: batches[i].batch_name,
                            subjects: [{ subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
                        }
                        arr.push(obj)
                    }
                }
            }
        }
        return arr;
    }

    useEffect(() => {
        try {
            fetch('https://hp-sir.onrender.com/api/v1/student/batches/subjects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.batches) {
                    setBatches(data.batches)
                    let arr = merge_courses_subjects(data.batches, data.subjects)
                    setcourses_subjects(arr)
                } else {
                    toast.error(data.message)
                }
            })
        } catch {
            toast.error('Something went wrong')
        }
    }, [])

    const [details, setDetails] = useState<Register>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        batch: { batchId: 0, subjects: [] }
    })

    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            fetch('https://hp-sir.onrender.com/api/v1/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            }).then(async (response) => {
                const data = await response.json();
                if (data.student) {
                    toast.success(data.message)
                    navigate('/signin')
                } else {
                    toast.error(data.message)
                }
            })
        } catch {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            {selectedBatchId < 0 ? (
                <div className="max-w-7xl m-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-700 rounded-full">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">Register in Your Desired Batch</h1>
                        <p className="text-gray-600">Get access to exclusive content and resources</p>
                    </div>

                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Choose from Ongoing Batches</h2>

                    <div className="flex flex-wrap gap-6 justify-center">
                        {batches.map((obj, index) => (
                            courses_subjects[index]
                                ? <Card key={courses_subjects[index].batch_id} index={index} setSelectedBatchId={setSelectedBatchId} subjects={courses_subjects[index].subjects} batch_name={courses_subjects[index].batch_name} batch_id={courses_subjects[index].batch_id} />
                                : <Card key={obj.id} index={index} setSelectedBatchId={setSelectedBatchId} subjects={[]} batch_name={obj.batch_name} batch_id={obj.id} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <Toaster />
                    <div className="max-w-4xl m-auto mt-10 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Selected Batch: {courses_subjects[selectedBatchId].batch_name}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Select Subjects</h3>
                                <div className="space-y-3">
                                    {courses_subjects[selectedBatchId].subjects.map((obj) => (
                                        <div key={obj.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-700">{obj.subject_name}</p>
                                            <button type="button" onClick={() => {
                                                setDetails({
                                                    ...details,
                                                    batch: {
                                                        batchId: obj.batchId,
                                                        subjects: [...details.batch.subjects, { subjectId: obj.id }]
                                                    }
                                                })
                                                setSelectedSubjects([...selecetdSubjects, obj.id])
                                            }} className="px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                                Select
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-700">Both</p>
                                        <button type="button" onClick={() => {
                                            setDetails({
                                                ...details,
                                                batch: {
                                                    batchId: courses_subjects[selectedBatchId].batch_id,
                                                    subjects: courses_subjects[selectedBatchId].subjects.map(obj => ({ subjectId: obj.id }))
                                                }
                                            })
                                            setSelectedSubjects(courses_subjects[selectedBatchId].subjects.map(obj => obj.id))
                                        }} className="px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {selecetdSubjects.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-indigo-700">Fill Your Details</h3>
                                    <input type="text" placeholder="First Name" value={details.first_name} onChange={(e) => setDetails({ ...details, first_name: e.target.value })} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <input type="text" placeholder="Last Name" value={details.last_name} onChange={(e) => setDetails({ ...details, last_name: e.target.value })} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <input type="email" placeholder="Email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <input type="password" placeholder="Password" value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <button type="submit" className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800">Sign Up</button>
                                </div>
                            )}
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default StudentSignUp

