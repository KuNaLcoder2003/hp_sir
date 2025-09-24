// // import React, { useState, useEffect } from 'react'
// // import toast from 'react-hot-toast'
// // import { useLocation } from 'react-router-dom'
// // import StudentNavbar from './StudentNavbar'
// // import { CiFolderOn } from 'react-icons/ci'


// // // interface Content_Obj {
// // //     content_name: string,
// // //     content_url: string,
// // //     id: number
// // //     subjectId: number
// // //     type: string
// // //     uploaded_on: string
// // // }

// // export interface Folder {
// //     id: number,
// //     folder_name: string,
// //     batch_id: number,
// //     subject_id: number,
// // }

// // const Subject: React.FC = ({ }) => {
// //     const path = useLocation()
// //     const [subject, setSubject] = useState<string>("")
// //     const [folder, setFolder] = useState<Folder[]>([])
// //     const [loading, setLoading] = useState<boolean>(false)
// //     const [permitted, setIsPermitted] = useState<boolean>(false)
// //     const [message, setMessage] = useState<string>("")
// //     useEffect(() => {
// //         const id = path.pathname.split('/')[2]
// //         try {
// //             fetch('https://hp-sir.onrender.com/api/v1/student/subjectDetails/' + id, {
// //                 method: 'GET',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     authorization: localStorage.getItem('token') as string
// //                 }
// //             }).then(async (response: Response) => {
// //                 const data = await response.json()
// //                 console.log(data)
// //                 if (data.subject) {
// //                     setSubject(data.subject.subject_name)
// //                     setFolder(data.folder)
// //                     setIsPermitted(true)
// //                 } else {
// //                     toast.error(data.message)
// //                     if (!data.permitted) {
// //                         setIsPermitted(false)
// //                         setMessage(data.message)
// //                     }
// //                     setLoading(false)
// //                 }

// //             })
// //         } catch (error) {
// //             setLoading(false)
// //             toast.error('Something went wrong')
// //         }
// //     }, [])
// //     return (
// //         <>
// //             {
// //                 loading ? <div>Loading...</div> : (
// //                     permitted ? <div className='w-screen h-screen overflow-x-hidden p-4 bg-gray-100'>
// //                         <StudentNavbar />
// //                         <div className='w-[65%] rounded-lg mt-40 m-auto p-4 bg-white'>
// //                             <h1 className='text-2xl lg:text-3xl bg-clip-text text-transparent font-bold' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>{subject}</h1>
// //                             <div className='mt-2'>
// //                                 <p className='text-lg lg:text-xl font-semibold text-gray-400'>Content : </p>
// //                                 <div>
// //                                     <h3 className="text-lg font-semibold text-gray-700 mb-4">Folders</h3>
// //                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //                                         {folder.map(object => (
// //                                             <div
// //                                                 key={object.id}
// //                                                 className="flex flex-col items-center p-4 rounded-xl bg-white shadow hover:shadow-lg cursor-pointer transition"
// //                                             >
// //                                                 <CiFolderOn className="text-4xl text-indigo-500" />
// //                                                 <p className="text-sm font-medium text-gray-600 mt-2">{object.folder_name}</p>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                     </div>



// //                         : <div className='text-2xl max-w-screen flex items-center justify-center'>
// //                             {message}
// //                         </div>

// //                 )
// //             }
// //         </>
// //     )
// // }
// // // interface Content {
// // //     content_name: string,
// // //     uploaded_on: string,
// // //     type: string,
// // //     url: string,

// // // }

// // // const ContentCard: React.FC<Content> = ({ content_name, uploaded_on, type, url }) => {
// // //     return (
// // //         <div onClick={() => {
// // //             window.open(url, "_blank")
// // //         }} className='w-[300px] h-[100px] p-2 bg-stone-100 flex flex-col cursor-pointer items-baseline rounded-lg shadow-lg'>
// // //             <h2 className='text-xl font-bold text-gray-500'>{content_name}</h2>
// // //             <div className='flex w-full items-center gap-4'>
// // //                 <p className='text-md text-semibold'>{uploaded_on}</p>
// // //                 <p className='text-md text-semibold'>{type}</p>
// // //             </div>
// // //         </div>
// // //     )
// // // }
// // export default Subject

// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useLocation } from "react-router-dom";
// import StudentNavbar from "./StudentNavbar";
// import { CiFolderOn } from "react-icons/ci";
// import { Loader2 } from "lucide-react";

// export interface Folder {
//     id: number;
//     folder_name: string;
//     batch_id: number;
//     subject_id: number;
// }

// const Subject: React.FC = () => {
//     const path = useLocation();
//     const [subject, setSubject] = useState<string>("");
//     const [folder, setFolder] = useState<Folder[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [permitted, setIsPermitted] = useState<boolean>(false);
//     const [message, setMessage] = useState<string>("");

//     useEffect(() => {
//         const id = path.pathname.split("/")[2];
//         try {
//             fetch("http://localhost:3000/api/v1/student/subjectDetails/" + id, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization: localStorage.getItem("token") as string,
//                 },
//             }).then(async (response: Response) => {
//                 const data = await response.json();
//                 console.log(data);
//                 if (data.subject) {
//                     setSubject(data.subject.subject_name);
//                     setFolder(data.folders);
//                     setIsPermitted(true);
//                 } else {
//                     toast.error(data.message);
//                     if (!data.permitted) {
//                         setIsPermitted(false);
//                         setMessage(data.message);
//                     }
//                 }
//                 setLoading(false);
//             });
//         } catch (error) {
//             setLoading(false);
//             toast.error("Something went wrong");
//         }
//     }, [path]);

//     return (
//         <>
//             <StudentNavbar />

//             {loading ? (
//                 // Loader Screen
//                 <div className="flex items-center justify-center min-h-[80vh]">
//                     <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//                 </div>
//             ) : permitted ? (
//                 <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-20">
//                     <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-200">
//                         {/* Subject Title */}
//                         <h1
//                             className="text-5xl font-extrabold bg-clip-text text-transparent mb-12 text-center"
//                             style={{
//                                 backgroundImage:
//                                     "linear-gradient(90deg, #4f46e5, #3b82f6, #06b6d4)",
//                             }}
//                         >
//                             {subject}
//                         </h1>

//                         {/* Content Section */}
//                         <div className="text-center mb-10">
//                             <h2 className="text-3xl font-semibold text-gray-800">
//                                 Available Folders
//                             </h2>
//                             <p className="text-gray-500 mt-2">
//                                 Browse through subject folders to access study material
//                             </p>
//                         </div>

//                         {/* Folders Grid */}
//                         {folder.length > 0 ? (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {folder.map((object) => (
//                                     <div
//                                         key={object.id}
//                                         className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-[1.02]"
//                                     >
//                                         <CiFolderOn className="text-6xl text-indigo-500 group-hover:text-indigo-700 transition" />
//                                         <p className="text-lg font-semibold text-gray-700 mt-4 group-hover:text-indigo-600">
//                                             {object.folder_name}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center justify-center py-20">
//                                 <CiFolderOn className="text-6xl text-gray-300" />
//                                 <p className="mt-4 text-gray-500 text-lg">
//                                     No folders available yet.
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 // Not Permitted Message
//                 <div className="text-2xl min-h-screen flex items-center justify-center px-6 text-center text-gray-700">
//                     {message}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Subject;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import { CiFolderOn } from "react-icons/ci";


export interface Folder {
    id: number;
    folder_name: string;
    batch_id: number;
    subject_id: number;
}

const Subject: React.FC = () => {
    const path = useLocation();
    const [subject, setSubject] = useState<string>("");
    const [folder, setFolder] = useState<Folder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [permitted, setIsPermitted] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const id = path.pathname.split("/")[2];
        try {
            fetch("http://localhost:3000/api/v1/student/subjectDetails/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") as string,
                },
            }).then(async (response: Response) => {
                const data = await response.json();
                if (data.subject) {
                    setSubject(data.subject.subject_name);
                    setFolder(data.folders);
                    setIsPermitted(true);
                } else {
                    toast.error(data.message);
                    if (!data.permitted) {
                        setIsPermitted(false);
                        setMessage(data.message);
                    }
                }
                setLoading(false);
            });
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    }, [path]);

    return (
        <>
            <StudentNavbar />

            {loading ? (
                // Skeleton Loader
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl p-8 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 bg-gray-200 rounded-2xl shadow-inner"
                            ></div>
                        ))}
                    </div>
                </div>
            ) : permitted ? (
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                    {/* Hero Section */}
                    <div className="relative text-white bg-gradient-to-r from-stone-500 to-stone-700 py-20 px-6 shadow-lg rounded-b-3xl">
                        <div className="max-w-5xl mx-auto text-center flex flex-col justify-center">
                            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                                {subject}
                            </h1>
                            <p className="text-lg text-indigo-100">
                                Explore all folders and access your learning materials in one place.
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto px-6 py-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                            Available Folders
                        </h2>

                        {folder.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {folder.map((object) => (
                                    <div
                                        key={object.id}
                                        className="group p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-2xl border border-gray-200 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:scale-[1.03]"
                                    >
                                        <CiFolderOn className="text-6xl text-indigo-500 group-hover:text-indigo-700 transition mb-4" />
                                        <p className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 text-center">
                                            {object.folder_name}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Study materials inside
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <CiFolderOn className="text-7xl text-gray-300" />
                                <p className="mt-4 text-gray-500 text-lg">
                                    No folders have been uploaded yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // Not Permitted Message
                <div className="text-2xl min-h-screen flex items-center justify-center px-6 text-center text-gray-700">
                    {message}
                </div>
            )}
        </>
    );
};

export default Subject;
