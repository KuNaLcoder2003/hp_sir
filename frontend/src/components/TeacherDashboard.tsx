import { BookOpen , User2Icon , Clock  } from "lucide-react"
import { useEffect, useState } from "react"
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
    duration : number
}

interface Batches_Subjects {
  batch_id : number,
  batch_name : string,
  subjects : Subject[]
}

const TeacherDashboard = () => {
  
  const [courses_subjects, setcourses_subjects] = useState<Batches_Subjects[]>([])
  function merge_courses_subjects(batches : Batch[] , subjects : Subject[]) {
    let arr : Batches_Subjects[] = [];
    for(let i = 0 ; i < batches.length ; i++) {
      let obj:Batches_Subjects
      for(let j = 0 ; j < subjects.length ; j++) {
        if(batches[i].id == subjects[j].batchId) {
          const matched = arr.find(obj => obj.batch_id == batches[i].id)
          if(matched) {
            obj = {
              ...matched,
              subjects : [...matched.subjects , {subject_name : subjects[j].subject_name , id : subjects[j].id ,batchId : batches[i].id }]
            }
            arr = arr.map((o)=> {
              if(obj.batch_id == o.batch_id) {
                return obj
              } else {
                return o
              }
            })
          } else {
            obj = {
              batch_id : batches[i].id,
              batch_name : batches[i].batch_name,
              subjects : [{subject_name : subjects[j].subject_name , id : subjects[j].id ,batchId : batches[i].id}]
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
      fetch('http://localhost:3000/api/v1/teacher/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response: Response) => {
        const data = await response.json()
        if (data.courses) {
          
          let arr = merge_courses_subjects(data.courses , data.subjects)
          setcourses_subjects(arr)
        } else {
          toast.error(data.message)
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [])
  

  const Card : React.FC<Batches_Subjects> = ({subjects , batch_id , batch_name}) => {
    const navigate = useNavigate()
    return (
      <div onClick={()=>navigate(`/teacher/course/${batch_id}`)} className='p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[45%] m-auto overflow-hidden shadow-xl rounded-lg'>
        <div className='p-2 flex flex-col items-baseline gap-4'>
          {/* Header */}
          <div className='flex flex-col items-start gap-2 p-1 w-full'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center'>
                <BookOpen size={28} />
              </div>
              <h2
                style={{
                  backgroundImage:
                    'radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)',
                }}
                className='text-lg sm:text-xl bg-clip-text text-transparent font-bold'
              >
                {batch_name}
              </h2>
            </div>
            <p className='text-gray-500 p-1 w-full text-sm sm:text-base'>
              {batch_name}
            </p>
          </div>

          {/* Info Section */}
          <div className='flex flex-col items-start p-1 gap-2'>
            <div className='flex items-center w-full gap-2 p-1'>
              <User2Icon size={18} color='gray' />
              <h2 className='text-sm sm:text-base text-gray-500'>
                Subjects : {
                  subjects.map((subject, idx) => {
                    return (
                      <span key={`${subject}_${idx}`}>{subject.subject_name} , </span>
                    )
                  })
                }
              </h2>
            </div>
            <div className='flex items-center w-full gap-2 p-1'>
              <Clock size={18} color='gray' />
              <h2 className='text-sm sm:text-base text-gray-500'>
                Duration : {12} months
              </h2>
            </div>
            <div className='flex items-center w-full gap-2 p-1'>
              <div className='w-[15px] h-[15px] rounded-full bg-green-500'></div>
              <h2 className='text-sm sm:text-base text-gray-500'>Mode : Offline</h2>
            </div>
          </div>

          {/* Key Features */}
          <div className='flex flex-col items-start p-1 gap-2'>
            <h3 className='text-base sm:text-lg font-semibold'>Key features:</h3>
            <div className='flex flex-col items-start gap-2'>
              {['Conceptual clarity', 'Problem solving', 'Regular assesments'].map((feature, idx) => (
                <div className='flex items-center gap-2' key={idx}>
                  <div className='w-[10px] h-[10px] rounded-full bg-blue-500'></div>
                  <p className='text-sm sm:text-base text-gray-500'>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <button className='w-full p-2 bg-blue-700 text-white text-sm sm:text-base font-bold rounded-lg cursor-pointer'>
            View Details
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
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
        <div className="max-w-full m-auto flex items-center justify-between">
          <h2 className="text-2xl p-1 text-transparent bg-clip-text font-bold" style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Ongoing batches</h2>
          <button className="p-2 w-[20%] bg-blue-500 text-white font-bold rounded-lg">Add New Batch</button>
        </div>
        <div className="max-w-full m-auto mt-8 flex flex-col lg:flex-row lg:flex-wrap p-1">
          {
            courses_subjects.map(obj => {
              return (
                <Card subjects={obj.subjects} batch_name={obj.batch_name} key={obj.batch_id} batch_id={obj.batch_id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default TeacherDashboard
