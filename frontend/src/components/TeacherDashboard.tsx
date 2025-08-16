// import { BookOpen, User2Icon, Clock, X } from "lucide-react"
// import { useEffect, useState, type FormEvent } from "react"
// import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom"

// interface Subject {
//   id: number,
//   subject_name: string,
//   batchId: number,
//   createdAt?: string,
//   updatedAt?: string
// }

// interface Batch {
//   id: number,
//   batch_name: string,
//   duration: number
// }

// interface Batches_Subjects {
//   batch_id: number,
//   batch_name: string,
//   subjects: Subject[]
// }

// const TeacherDashboard = () => {

//   function addNewBatch(e: FormEvent) {
//     e.preventDefault()
//     try {
//       fetch('https://hp-sir.onrender.com/api/v1/teacher/batch', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           batch: {
//             batch_name: newBatch.batch_name,
//             duration: newBatch.duration
//           }
//         })
//       }).then(async (response: Response) => {
//         const data = await response.json()
//         if (data.valid) {
//           toast.success(data.message)
//           setIsopen(false)
//         } else {
//           toast.error(data.message)
//         }
//       })
//     } catch (error) {
//       toast.error('Something went wrong')
//     }
//   }
//   const [isOpen, setIsopen] = useState<boolean>(false)
//   const [newBatch, setNewBatch] = useState({
//     batch_name: '',
//     duration: 0
//   })

//   const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
//   const [courses, setCourses] = useState<Batch[]>([])
//   function merge_courses_subjects(batches: Batch[], subjects: Subject[]) {
//     let arr: Batches_Subjects[] = [];
//     for (let i = 0; i < batches.length; i++) {
//       let obj: Batches_Subjects
//       for (let j = 0; j < subjects.length; j++) {
//         if (batches[i].id == subjects[j].batchId) {
//           const matched = arr.find(obj => obj.batch_id == batches[i].id)
//           if (matched) {
//             obj = {
//               ...matched,
//               subjects: [...matched.subjects, { subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
//             }
//             arr = arr.map((o) => {
//               if (obj.batch_id == o.batch_id) {
//                 return obj
//               } else {
//                 return o
//               }
//             })
//           } else {
//             obj = {
//               batch_id: batches[i].id,
//               batch_name: batches[i].batch_name,
//               subjects: [{ subject_name: subjects[j].subject_name, id: subjects[j].id, batchId: batches[i].id }]
//             }
//             arr.push(obj)
//           }
//         }
//       }
//     }
//     console.log(arr)
//     return arr;
//   }
//   useEffect(() => {
//     try {
//       fetch('https://hp-sir.onrender.com/api/v1/teacher/courses', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }).then(async (response: Response) => {
//         const data = await response.json()
//         if (data.courses) {
//           setCourses(data.courses)
//           let arr = merge_courses_subjects(data.courses, data.subjects)
//           setcourses_subjects(arr)
//         } else {
//           toast.error(data.message)
//         }
//       })
//     } catch (error) {
//       toast.error('Something went wrong')
//     }
//   }, [])


//   const Card: React.FC<Batches_Subjects> = ({ subjects, batch_id, batch_name }) => {
//     const navigate = useNavigate()
//     return (
//       <div onClick={() => navigate(`/teacher/course/${batch_id}`)} className='p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[45%] m-auto overflow-hidden shadow-xl rounded-lg'>
//         <div className='p-2 flex flex-col items-baseline gap-4'>
//           {/* Header */}
//           <div className='flex flex-col items-start gap-2 p-1 w-full'>
//             <div className='flex items-center gap-4'>
//               <div className='flex items-center'>
//                 <BookOpen size={28} />
//               </div>
//               <h2
//                 style={{
//                   backgroundImage:
//                     'radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)',
//                 }}
//                 className='text-lg sm:text-xl bg-clip-text text-transparent font-bold'
//               >
//                 {batch_name}
//               </h2>
//             </div>
//             <p className='text-gray-500 p-1 w-full text-sm sm:text-base'>
//               {batch_name}
//             </p>
//           </div>

//           {/* Info Section */}
//           <div className='flex flex-col items-start p-1 gap-2'>
//             <div className='flex items-center w-full gap-2 p-1'>
//               <User2Icon size={18} color='gray' />
//               <h2 className='text-sm sm:text-base text-gray-500'>
//                 Subjects : {
//                   subjects.length == 0 ? <p>No subjects added yet</p> : subjects.map((subject, idx) => {
//                     return (
//                       <span key={`${subject}_${idx}`}>{subject.subject_name} , </span>
//                     )
//                   })
//                 }
//               </h2>
//             </div>
//             <div className='flex items-center w-full gap-2 p-1'>
//               <Clock size={18} color='gray' />
//               <h2 className='text-sm sm:text-base text-gray-500'>
//                 Duration : {12} months
//               </h2>
//             </div>
//             <div className='flex items-center w-full gap-2 p-1'>
//               <div className='w-[15px] h-[15px] rounded-full bg-green-500'></div>
//               <h2 className='text-sm sm:text-base text-gray-500'>Mode : Offline</h2>
//             </div>
//           </div>

//           {/* Key Features */}
//           <div className='flex flex-col items-start p-1 gap-2'>
//             <h3 className='text-base sm:text-lg font-semibold'>Key features:</h3>
//             <div className='flex flex-col items-start gap-2'>
//               {['Conceptual clarity', 'Problem solving', 'Regular assesments'].map((feature, idx) => (
//                 <div className='flex items-center gap-2' key={idx}>
//                   <div className='w-[10px] h-[10px] rounded-full bg-blue-500'></div>
//                   <p className='text-sm sm:text-base text-gray-500'>{feature}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Button */}
//           <button className='w-full p-2 bg-blue-700 text-white text-sm sm:text-base font-bold rounded-lg cursor-pointer'>
//             View Details
//           </button>
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
//       {
//         isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
//               <form onSubmit={(e) => addNewBatch(e)} className="flex flex-col p-4 bg-white w-full gap-4 rounded-lg">
//                 <div className='flex w-full justify-between items-center'>
//                   <h2 className='text-lg font-bold'>Create new course </h2>
//                   <X onClick={() => setIsopen(false)} className='cursor-pointer' />
//                 </div>
//                 <div className="flex flex-col gap-2 items-baseline w-full">
//                   <div className='w-full'>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Batch Name</label>
//                     <input
//                       value={newBatch.batch_name}
//                       onChange={(e) => {
//                         setNewBatch({
//                           ...newBatch,
//                           batch_name: e.target.value
//                         })
//                       }}
//                       type="text"
//                       placeholder="Enter batch name..."
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div className='w-full'>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Batch Duration</label>
//                     <input
//                       value={newBatch.duration}
//                       onChange={(e) => {
//                         setNewBatch({
//                           ...newBatch,
//                           duration: Number(e.target.value)
//                         })
//                       }}
//                       type="number"
//                       placeholder="Enter batch name..."
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <button type="submit" className='w-full bg-black text-white p-2 rounded-lg cursor-pointer'>Add new batch</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )
//       }
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <BookOpen className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">Welcome, Mr. Himanshu Parnami</h1>
//             </div>
//             <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>
//       <div className="w-[75%] mt-10 p-4 m-auto shadow-lg rounded-lg bg-white">
//         <div className="max-w-full m-auto flex items-center justify-between">
//           <h2 className="text-2xl p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Ongoing batches</h2>
//           <button onClick={() => setIsopen(true)} className="p-2 w-[20%] bg-blue-500 text-white font-bold rounded-lg cursor-pointer">Add New Batch</button>
//         </div>
//         <div className="max-w-full m-auto mt-8 flex flex-col lg:flex-row lg:flex-wrap p-1">
//           {
//             courses.map((obj, index) => {
//               return (
//                 <>
//                   {
//                     courses_subjects[index] ? <Card subjects={courses_subjects[index].subjects} batch_name={courses_subjects[index].batch_name} key={courses_subjects[index].batch_id} batch_id={courses_subjects[index].batch_id} /> : <Card subjects={[]} batch_name={obj.batch_name} key={obj.id} batch_id={obj.id} />
//                   }
//                 </>
//               )
//             })
//           }
//         </div>
//       </div>
//     </div>
//   )
// }
// export default TeacherDashboard

import { BookOpen, User2Icon, Clock, X } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

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

interface Batches_Subjects {
  batch_id: number,
  batch_name: string,
  subjects: Subject[]
}

const TeacherDashboard = () => {
  // --- states & logic unchanged ---
  const [isOpen, setIsopen] = useState<boolean>(false)
  const [newBatch, setNewBatch] = useState({
    batch_name: '',
    duration: 0
  })
  const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
  const [courses, setCourses] = useState<Batch[]>([])

  function addNewBatch(e: FormEvent) {
    e.preventDefault()
    try {
      fetch('https://hp-sir.onrender.com/api/v1/teacher/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch: {
            batch_name: newBatch.batch_name,
            duration: newBatch.duration
          }
        })
      }).then(async (response: Response) => {
        const data = await response.json()
        if (data.valid) {
          toast.success(data.message)
          setIsopen(false)
        } else {
          toast.error(data.message)
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

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
            arr = arr.map((o) => o.batch_id == obj.batch_id ? obj : o)
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
      fetch('https://hp-sir.onrender.com/api/v1/teacher/courses')
        .then(async (response: Response) => {
          const data = await response.json()
          if (data.courses) {
            setCourses(data.courses)
            let arr = merge_courses_subjects(data.courses, data.subjects)
            setcourses_subjects(arr)
          } else {
            toast.error(data.message)
          }
        })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [])

  // --- Card Component (UI enhanced only) ---
  const Card: React.FC<Batches_Subjects> = ({ subjects, batch_id, batch_name }) => {
    const navigate = useNavigate()
    return (
      <div
        onClick={() => navigate(`/teacher/course/${batch_id}`)}
        className="p-6 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[45%] xl:w-[40%] 
          m-auto mb-8 bg-white/70 backdrop-blur-md 
          border border-gray-200/50 shadow-lg rounded-2xl 
          hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
      >
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md">
              <BookOpen size={24} />
            </div>
            <h2 className="text-xl font-extrabold text-gray-800 bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #4338CA, #1E1B4B)" }}>
              {batch_name}
            </h2>
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-3 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <User2Icon size={18} className="text-indigo-500" />
              <span className="font-semibold">Subjects:</span>
              <div className="flex flex-wrap gap-2">
                {subjects.length === 0
                  ? <span className="text-gray-400">No subjects added yet</span>
                  : subjects.map((subject) => (
                    <span key={subject.id} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full shadow-sm">
                      {subject.subject_name}
                    </span>
                  ))
                }
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" />
              <span className="font-semibold">Duration:</span> {12} months
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-semibold">Mode:</span> Offline
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Key Features</h3>
            <ul className="space-y-1">
              {['Conceptual clarity', 'Problem solving', 'Regular assessments'].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <button className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:opacity-90 transition">
            View Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[60%] md:w-[40%] p-6">
            <form onSubmit={addNewBatch} className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Create New Batch</h2>
                <X onClick={() => setIsopen(false)} className="cursor-pointer text-gray-500 hover:text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Batch Name</label>
                <input
                  value={newBatch.batch_name}
                  onChange={(e) => setNewBatch({ ...newBatch, batch_name: e.target.value })}
                  type="text"
                  placeholder="Enter batch name..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Batch Duration (months)</label>
                <input
                  value={newBatch.duration}
                  onChange={(e) => setNewBatch({ ...newBatch, duration: Number(e.target.value) })}
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition">
                Add New Batch
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-extrabold text-gray-900">Welcome, <span className="text-indigo-600">Mr. Himanshu Parnami</span></h1>
            </div>
            <button className="bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="w-[90%] sm:w-[80%] lg:w-[75%] mt-10 p-6 m-auto shadow-xl rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #4338CA, #1E1B4B)" }}>
            Ongoing Batches
          </h2>
          <button
            onClick={() => setIsopen(true)}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          >
            + Add New Batch
          </button>
        </div>

        {/* Cards */}
        <div className="mt-10 flex flex-col lg:flex-row lg:flex-wrap gap-6">
          {courses.map((obj, index) => (
            courses_subjects[index]
              ? <Card key={courses_subjects[index].batch_id} {...courses_subjects[index]} />
              : <Card key={obj.id} subjects={[]} batch_name={obj.batch_name} batch_id={obj.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard

