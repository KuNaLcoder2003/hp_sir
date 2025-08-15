import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Subject {
    id: number,
    subject_name: string,
    batchId: number,
    createdAt?: string,
    updatedAt?: string
}

// interface Batch {
//     id: number,
//     batch_name: string,
//     duration: number
// }

// interface Batches_Subjects {
//     batch_id: number,
//     batch_name: string,
//     subjects: Subject[]
// }

interface Prop {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}


const StudentDashboard: React.FC<Prop> = ({ setIsLoggedIn }) => {
    const [batchName, setBatchName] = useState<string>("")
    const [studentName, setStudentName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [courses, setCourses] = useState<Subject[]>([])
    //  const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
    // function merge_courses_subjects(batches: Batch[], subjects: Subject[]) {
    //     let arr: Batches_Subjects[] = [];
    //     for (let i = 0; i < batches.length; i++) {
    //         let obj: Batches_Subjects
    //         for (let j = 0; j < subjects.length; j++) {
    //             if (batches[i].id == subjects[j].batchId) {
    //                 const matched = arr.find(obj => obj.batch_id == batches[i].id)
    //                 if (matched) {
    //                     obj = {
    //                         ...matched,
    //                         subjects: [...matched.subjects, { subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
    //                     }
    //                     arr = arr.map((o) => {
    //                         if (obj.batch_id == o.batch_id) {
    //                             return obj
    //                         } else {
    //                             return o
    //                         }
    //                     })
    //                 } else {
    //                     obj = {
    //                         batch_id: batches[i].id,
    //                         batch_name: batches[i].batch_name,
    //                         subjects: [{ subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
    //                     }
    //                     arr.push(obj)
    //                 }
    //             }
    //         }
    //     }
    //     console.log(arr)
    //     return arr;
    // }
    useEffect(() => {
        try {
            setLoading(true)
            fetch('https://hp-sir.onrender.com/api/v1/student/details/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token') as string
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data)
                if (data.student) {
                    setStudentName(`${data.student.first_name} ${data.student.last_name}`)
                    setBatchName(data.batch.batch_name)
                    setCourses(data.subs)
                } else {
                    toast.error('No student content found')
                }
                setLoading(false);
            })
        } catch (error) {
            setLoading(false)
        }
    }, [])

    return (
        <>
            {
                loading ? <div>Loading...</div> : (
                    <>
                        <StudentNavbar name={studentName} setIsLoggedIn={setIsLoggedIn} />
                        <div className='max-w-8xl m-auto p-4 relative min-h-[80vh]  text-center mt-46 shadow-xl rounded-lg'>
                            <h1 className='text-3xl font-bold bg-clip-text text-transparent ' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>{batchName}</h1>
                            <main className="max-w-6xl mx-auto p-6">
                                <h2 className='text-3xl my-10 font-semibold'>Registered Subjects</h2>
                                <div className='flex items-center justify-center gap-4 p-4'>

                                    {/* Subjects */}
                                    {
                                        courses.map((obj) => {
                                            return (
                                                <div key={obj.id} className='w-[30%] p-2 text-center bg-gray-100 rounded-ld shadow-lg'>
                                                    <h2 className='text-2xl fornt-bold text-shadow-sky-950'>Subject : {obj.subject_name}</h2>
                                                    <button onClick={() => navigate(`/subject/${obj.id}`)} className='mt-6 mb-6 cursor-pointer p-2 text-center w-[70%] m-auto bg-black text-white font-semibold rounded-lg'>View Content</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/* Notes Grid
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                                    {notes.map((note, index) => (
                                        <div
                                            key={index}
                                            className="bg-white shadow-md p-4 rounded-xl flex flex-col justify-between"
                                        >
                                            <h2 className="font-semibold mb-4">{note}</h2>
                                            <div className="flex justify-between items-center">

                                                <img
                                                    src="https://img.icons8.com/color/48/pdf-2.png"
                                                    className="w-6 h-6"
                                                    alt="PDF"
                                                />
                                                <img
                                                    src="https://img.icons8.com/ios-filled/24/download--v1.png"
                                                    className="w-5 h-5"
                                                    alt="Download"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                            </main>
                        </div>
                    </>
                )
            }
        </>
    )
};


export default StudentDashboard
