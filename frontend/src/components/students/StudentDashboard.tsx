// // import React, { useEffect, useState } from 'react';
// // import StudentNavbar from './StudentNavbar';
// // import toast from 'react-hot-toast';
// // import { useNavigate } from 'react-router-dom';

// // interface Subject {
// //     id: number,
// //     subject_name: string,
// //     batchId: number,
// //     createdAt?: string,
// //     updatedAt?: string
// // }

// // // interface Batch {
// // //     id: number,
// // //     batch_name: string,
// // //     duration: number
// // // }

// // // interface Batches_Subjects {
// // //     batch_id: number,
// // //     batch_name: string,
// // //     subjects: Subject[]
// // // }




// // const StudentDashboard: React.FC = ({ }) => {
// //     const [batchName, setBatchName] = useState<string>("")
// //     const [loading, setLoading] = useState<boolean>(false)
// //     const navigate = useNavigate()
// //     const [courses, setCourses] = useState<Subject[]>([])
// //     const [permitted, setIsPermitted] = useState<boolean>(false)
// //     const [message, setMessage] = useState<string>("")
// //     //  const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
// //     // function merge_courses_subjects(batches: Batch[], subjects: Subject[]) {
// //     //     let arr: Batches_Subjects[] = [];
// //     //     for (let i = 0; i < batches.length; i++) {
// //     //         let obj: Batches_Subjects
// //     //         for (let j = 0; j < subjects.length; j++) {
// //     //             if (batches[i].id == subjects[j].batchId) {
// //     //                 const matched = arr.find(obj => obj.batch_id == batches[i].id)
// //     //                 if (matched) {
// //     //                     obj = {
// //     //                         ...matched,
// //     //                         subjects: [...matched.subjects, { subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
// //     //                     }
// //     //                     arr = arr.map((o) => {
// //     //                         if (obj.batch_id == o.batch_id) {
// //     //                             return obj
// //     //                         } else {
// //     //                             return o
// //     //                         }
// //     //                     })
// //     //                 } else {
// //     //                     obj = {
// //     //                         batch_id: batches[i].id,
// //     //                         batch_name: batches[i].batch_name,
// //     //                         subjects: [{ subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
// //     //                     }
// //     //                     arr.push(obj)
// //     //                 }
// //     //             }
// //     //         }
// //     //     }
// //     //     console.log(arr)
// //     //     return arr;
// //     // }
// //     useEffect(() => {
// //         try {
// //             setLoading(true)
// //             fetch('https://hp-sir.onrender.com/api/v1/student/details/', {
// //                 method: 'GET',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     authorization: localStorage.getItem('token') as string
// //                 }
// //             }).then(async (response: Response) => {
// //                 const data = await response.json()
// //                 console.log(data)
// //                 if (data.student) {
// //                     setBatchName(data.batch.batch_name)
// //                     setCourses(data.subs)
// //                     setIsPermitted(true)
// //                 } else {
// //                     toast.error('No student content found')
// //                     if (!data.permitted) {
// //                         setIsPermitted(false)
// //                         setMessage(data.message)
// //                     }
// //                 }
// //                 setLoading(false);
// //             })
// //         } catch (error) {
// //             setLoading(false)
// //         }
// //     }, [])

// //     return (
// //         <>
// //             {
// //                 loading ? <div>Loading...</div> : (
// //                     <>
// //                         <StudentNavbar />
// //                         {
// //                             permitted ? <div className="max-w-7xl mx-auto p-8 relative min-h-[80vh] text-center mt-28 shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200">
// //                                 {/* Batch Name */}
// //                                 <h1
// //                                     className="text-4xl font-extrabold bg-clip-text text-transparent mb-12"
// //                                     style={{
// //                                         backgroundImage:
// //                                             "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)",
// //                                     }}
// //                                 >
// //                                     {batchName}
// //                                 </h1>

// //                                 <main className="max-w-6xl mx-auto">
// //                                     {/* Section Title */}
// //                                     <h2 className="text-3xl font-semibold mb-10 text-gray-800">
// //                                         Registered Subjects
// //                                     </h2>

// //                                     {/* Subjects Grid */}
// //                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //                                         {courses.map((obj) => (
// //                                             <div
// //                                                 key={obj.id}
// //                                                 className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
// //                                             >
// //                                                 <h2 className="text-xl font-bold text-gray-800 mb-6">
// //                                                     Subject:{" "}
// //                                                     <span className="text-indigo-700">{obj.subject_name}</span>
// //                                                 </h2>
// //                                                 <button
// //                                                     onClick={() => navigate(`/subject/${obj.id}`)}
// //                                                     className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 transition text-white font-semibold"
// //                                                 >
// //                                                     View Content
// //                                                 </button>
// //                                             </div>
// //                                         ))}
// //                                     </div>

// //                                     {/* Notes Grid (Optional) */}
// //                                     {/* 
// //     <h2 className="text-3xl font-semibold mt-16 mb-8 text-gray-800">
// //       Notes
// //     </h2>
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //       {notes.map((note, index) => (
// //         <div
// //           key={index}
// //           className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition"
// //         >
// //           <h3 className="font-semibold mb-4">{note}</h3>
// //           <div className="flex justify-between items-center">
// //             <img
// //               src="https://img.icons8.com/color/48/pdf-2.png"
// //               className="w-6 h-6"
// //               alt="PDF"
// //             />
// //             <img
// //               src="https://img.icons8.com/ios-filled/24/download--v1.png"
// //               className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
// //               alt="Download"
// //             />
// //           </div>
// //         </div>
// //       ))}
// //     </div> 
// //     */}
// //                                 </main>
// //                             </div>
// //                                 : <div className='text-2xl max-w-screen h-screen flex items-center justify-center'>
// //                                     {message}
// //                                 </div>
// //                         }
// //                     </>
// //                 )
// //             }
// //         </>
// //     )
// // };


// // export default StudentDashboard

// import React, { useEffect, useState } from 'react';
// import StudentNavbar from './StudentNavbar';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { BookOpen } from 'lucide-react';

// interface Subject {
//     id: number;
//     subject_name: string;
//     batchId: number;
//     createdAt?: string;
//     updatedAt?: string;
// }

// const StudentDashboard: React.FC = () => {
//     const [batchName, setBatchName] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState<Subject[]>([]);
//     const [permitted, setIsPermitted] = useState<boolean>(false);
//     const [message, setMessage] = useState<string>('');

//     useEffect(() => {
//         try {
//             setLoading(true);
//             fetch('https://hp-sir.onrender.com/api/v1/student/details/', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     authorization: localStorage.getItem('token') as string,
//                 },
//             }).then(async (response: Response) => {
//                 const data = await response.json();
//                 console.log(data);
//                 if (data.student) {
//                     setBatchName(data.batch.batch_name);
//                     setCourses(data.subs);
//                     setIsPermitted(true);
//                 } else {
//                     toast.error('No student content found');
//                     if (!data.permitted) {
//                         setIsPermitted(false);
//                         setMessage(data.message);
//                     }
//                 }
//                 setLoading(false);
//             });
//         } catch (error) {
//             setLoading(false);
//         }
//     }, []);

//     return (
//         <>
//             <StudentNavbar />

//             {loading ? (
//                 <div className="flex items-center justify-center min-h-[80vh]">
//                     {/* Skeleton Loader */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse w-full max-w-6xl p-8">
//                         {[...Array(6)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="h-40 bg-gray-200 rounded-xl shadow-inner"
//                             ></div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     {permitted ? (
//                         <div className="max-w-7xl mx-auto p-8 relative min-h-[80vh] text-center mt-28 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200">
//                             {/* Batch Name */}
//                             <h1
//                                 className="text-5xl font-extrabold bg-clip-text text-transparent mb-16 tracking-wide"
//                                 style={{
//                                     backgroundImage:
//                                         'linear-gradient(90deg, #4f46e5, #3b82f6, #06b6d4)',
//                                 }}
//                             >
//                                 {batchName}
//                             </h1>

//                             <main className="max-w-6xl mx-auto">
//                                 {/* Section Title */}
//                                 <h2 className="text-3xl font-semibold mb-12 text-gray-800">
//                                     Registered Subjects
//                                 </h2>

//                                 {/* Subjects Grid */}
//                                 {courses.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//                                         {courses.map((obj) => (
//                                             <div
//                                                 key={obj.id}
//                                                 className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 border border-gray-100 flex flex-col justify-between"
//                                             >
//                                                 <div className="flex items-center gap-3 mb-6">
//                                                     <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
//                                                         <BookOpen size={24} />
//                                                     </div>
//                                                     <h2 className="text-xl font-bold text-gray-900">
//                                                         {obj.subject_name}
//                                                     </h2>
//                                                 </div>
//                                                 <button
//                                                     onClick={() => navigate(`/subject/${obj.id}`)}
//                                                     className="mt-auto w-full px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 transition text-white font-semibold shadow-md"
//                                                 >
//                                                     View Content
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p className="text-gray-600 text-lg mt-8">
//                                         No subjects registered yet.
//                                     </p>
//                                 )}
//                             </main>
//                         </div>
//                     ) : (
//                         <div className="text-2xl max-w-screen h-screen flex items-center justify-center px-6 text-center text-gray-700">
//                             {message}
//                         </div>
//                     )}
//                 </>
//             )}
//         </>
//     );
// };

// export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Layers } from 'lucide-react';

interface Subject {
    id: number;
    subject_name: string;
    batchId: number;
    createdAt?: string;
    updatedAt?: string;
}

const StudentDashboard: React.FC = () => {
    const [batchName, setBatchName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Subject[]>([]);
    const [permitted, setIsPermitted] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        try {
            setLoading(true);
            fetch('https://hp-sir.onrender.com/api/v1/student/details/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token') as string,
                },
            }).then(async (response: Response) => {
                const data = await response.json();
                console.log(data);
                if (data.student) {
                    setBatchName(data.batch.batch_name);
                    setCourses(data.subs);
                    setIsPermitted(true);
                } else {
                    toast.error('No student content found');
                    if (!data.permitted) {
                        setIsPermitted(false);
                        setMessage(data.message);
                    }
                }
                setLoading(false);
            });
        } catch (error) {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <StudentNavbar />

            {loading ? (
                <div className="flex items-center justify-center min-h-[80vh]">
                    {/* Skeleton Loader */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl p-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-44 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl animate-pulse shadow-inner"
                            ></div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {permitted ? (
                        <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pt-32 pb-20">
                            {/* Hero Section */}
                            <div className="max-w-5xl mx-auto text-center mb-16">
                                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                                    Welcome to{' '}
                                    <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                                        {batchName}
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Explore your registered subjects and start learning
                                </p>
                            </div>

                            {/* Subjects Section */}
                            <main className="max-w-6xl mx-auto px-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-12 flex items-center justify-center gap-2">
                                    <Layers size={28} className="text-indigo-600" />
                                    Registered Subjects
                                </h2>

                                {courses.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {courses.map((obj) => (
                                            <div
                                                key={obj.id}
                                                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 border border-gray-100 flex flex-col justify-between"
                                            >
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl">
                                                        <BookOpen size={28} />
                                                    </div>
                                                    <h2 className="text-xl font-bold text-gray-900 text-left">
                                                        {obj.subject_name}
                                                    </h2>
                                                </div>
                                                <button
                                                    onClick={() => navigate(`/subject/${obj.id}`)}
                                                    className="mt-auto w-full px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 transition text-white font-semibold shadow-md"
                                                >
                                                    View Content
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center mt-20">
                                        <img
                                            src="https://img.icons8.com/?size=128&id=12438&format=png"
                                            alt="No subjects"
                                            className="w-20 h-20 mb-6 opacity-70"
                                        />
                                        <p className="text-gray-600 text-lg">
                                            No subjects registered yet. Check back later
                                        </p>
                                    </div>
                                )}
                            </main>
                        </div>
                    ) : (
                        <div className="text-2xl max-w-screen h-screen flex items-center justify-center px-6 text-center text-gray-700">
                            {message}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default StudentDashboard;
