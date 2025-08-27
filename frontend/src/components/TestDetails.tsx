import { useEffect, useState } from "react";
import {

  Trophy,
  Users,
  FileText,
  MessageSquare,
  XCircle,
  CheckCircle,
  BarChart3,
  Medal,
  Loader2,
} from "lucide-react";
import StudentNavbar from "../components/StudentNavbar"; // same navbar as your theme
import { useLocation } from "react-router-dom";

interface TestDetails {
  test_name: string,
  highestMarks: number,
  no_of_students_attempted: number,
  rank: number,
  average: number,
  student_marks: number,
  attempted: boolean
}

export default function TestDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const path = useLocation()

  useEffect(() => {
    const testId = path.pathname.split('/')[2]
    setLoading(true)
    fetch('http://localhost:3000/api/v1/test/getTestResult/' + testId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')
      }
    }).then(async (response: Response) => {
      const data = await response.json() as TestDetails
      if (data.test_name) {
        setTestDetails(data)
        setLoading(false)
      }
    })

  }, []);

  return (
    <div className="bg-gradient-to-b min-h-screen">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto p-6 mt-28">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : (
          <>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-8">
              {testDetails.test_name} <span className="text-blue-600">Details</span>
            </h1>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  {testDetails.attempted ? (
                    <FileText className="text-green-600 w-7 h-7" />
                  ) : (
                    <XCircle className="text-red-500 w-7 h-7" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Marks Obtained</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {testDetails.attempted
                        ? `${testDetails.student_marks}/${100}`
                        : "Not Attempted"}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-500 w-7 h-7" />
                  <div>
                    <p className="text-sm text-gray-500">Highest Marks</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {testDetails.highestMarks}/{100}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <Users className="text-purple-600 w-7 h-7" />
                  <div>
                    <p className="text-sm text-gray-500">Students Attempted</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {testDetails.no_of_students_attempted}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-blue-600 w-7 h-7" />
                  <div>
                    <p className="text-sm text-gray-500">Class Average</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {testDetails.average}/{100}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <Medal className="text-indigo-600 w-7 h-7" />
                  <div>
                    <p className="text-sm text-gray-500">Your Rank</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {testDetails.rank ? `#${testDetails.rank}` : "-"}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  {testDetails.attempted ? (
                    <CheckCircle className="text-green-600 w-7 h-7" />
                  ) : (
                    <XCircle className="text-red-500 w-7 h-7" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`text-lg font-semibold ${testDetails.attempted
                        ? "text-green-700"
                        : "text-red-600"
                        }`}
                    >
                      {testDetails.attempted ? "Attempted" : "Not Attempted"}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-blue-600 w-7 h-7 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Teacher’s Remarks</p>
                  <p className="text-base font-medium text-gray-800">
                    {"Good performance , little more efforst will make it even better"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
