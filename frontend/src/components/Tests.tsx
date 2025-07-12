import { useNavigate } from "react-router-dom";


const tests = [
  { title: "JEE MAIN Full Test - 1", date: "26th Aug", status: "Completed" },
  { title: "Physics Mock Test - 1", date: "27th July", status: "Missed" },
  { title: "JEE MAIN Full Test - 2", date: "25th July", status: "Completed" },
  { title: "Chemistry Mock Test - 2", date: "22nd July", status: "Pending" },
  { title: "Maths Practice Test", date: "20th July", status: "Completed" },
];

export default function Tests() {
    const navigate = useNavigate()
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <button onClick={()=>navigate('/dashboard')} className="text-lg text-gray-700">&larr; Back</button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
            <span className="font-bold text-gray-700">XP</span>
            <span className="text-gray-800">0</span>
          </div>
          <p className="font-semibold text-gray-700">Hi, Kunal singh</p>
          <img
            src="https://i.imgur.com/9RIFq5g.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">JEE Mains Tests</h1>

        {/* Tabs */}
        <div className="flex gap-4 bg-blue-100 rounded-md p-2 w-full max-w-2xl">
          <button className="px-4 py-2 rounded bg-white text-blue-600 font-semibold shadow">
            Tests
          </button>
          <button className="px-4 py-2 rounded text-gray-600">Results</button>
          <button className="px-4 py-2 rounded text-gray-600">Analysis</button>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {tests.map((test, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-xl flex flex-col justify-between"
            >
              <h2 className="font-semibold text-lg mb-2">{test.title}</h2>
              <p className="text-sm text-gray-500 mb-4">Date: {test.date}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    test.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : test.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {test.status}
                </span>
                <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Avatar */}
      <div className="fixed bottom-6 right-6">
        <img
          src="https://i.imgur.com/EUpB3PV.png"
          alt="Avatar"
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
