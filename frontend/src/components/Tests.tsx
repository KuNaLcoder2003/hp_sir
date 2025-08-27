import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import StudentNavbar from "./StudentNavbar";

interface Test {
  name: string;
  id: Number;
  date: string;
}

export default function Tests() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const path = useLocation();
  const [batchName, setBatchName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const id = path.pathname.split("/")[2];
    try {
      setLoading(true);
      fetch("http://localhost:3000/api/v1/test/details/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token") || "",
        },
      }).then(async (response: Response) => {
        const data = await response.json();
        if (data.tests) {
          setTests(data.tests);
          setBatchName(data.batch_name);
          setLoading(false);
        } else {
          toast.error(data.message || "Failed to fetch tests");
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }, []);

  return (
    <div className="bg-gradient-to-b min-h-screen">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm md:text-base text-gray-700 hover:text-gray-900 transition flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm shadow-inner">
            <span className="font-bold text-gray-700">XP</span>
            <span className="text-gray-800">0</span>
          </div>
          <p className="font-medium text-gray-700 hidden sm:block">Hi, {user}</p>
          <img
            src="https://i.imgur.com/9RIFq5g.png"
            alt="User"
            className="w-9 h-9 rounded-full border"
          />
        </div>
      </header> */}
      <StudentNavbar />

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6 mt-28">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">
              {batchName} <span className="text-blue-600">Tests</span>
            </h1>

            {tests.length === 0 ? (
              <p className="text-gray-500">No tests available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((test, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between border border-gray-100"
                  >
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800 mb-2">
                        {test.name}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        📅 {test.date}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => navigate(`/testDetails/${test.id}`)} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-xl hover:bg-blue-700 transition shadow-sm">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
