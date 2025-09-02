import React, { useEffect, useState } from "react"
import { BookOpen, Clipboard, X } from "lucide-react"
import { useLocation } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

interface Doubt {
    id: number
    user_email: string
    doubt_type: string
    class: string
    completed: boolean
    meeting_id: string
    request_accepted: boolean
    date: Date
}

interface Week {
    id: number
    week_no: number
    completed: boolean
    week_name: string
}

interface Slot {
    id: number
    week_id: number
    week_number: number
    day: string
    time: string
    duration: string
    slot_booked: boolean
}

interface Meeting {
    id: number
    meeting_id: string
    join_url: string
    date: Date
    doubt_id: number
    completed: boolean
    user_email: string
    start_url: string
    joinTime: string
    slot_id: number
    meeting_password: string
}

const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const days_in_iso_format = {
//     'Monday': 'Mon',
//     'Tuesday': 'Tue',
//     'Wednesday': 'Wed',
//     'Thursday': 'Thu',
//     'Friday': 'Fri',
//     'Saturday': 'Sat',
//     'Sunday': 'Sun'
// }



const WeekManagement: React.FC = () => {
    const path = useLocation()
    const [slots, setSlots] = useState<Slot[]>([])
    const [week, setWeek] = useState<Week>()
    const [doubts, setDoubts] = useState<Doubt[]>([])
    const [days, setDays] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedDay, setSelectedDay] = useState<string>("")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [generating, setGenerating] = useState<boolean>(false)
    const [meetingDetails, setMeetingDetails] = useState<Meeting>()
    const [isMeetingModalOpen, setMeetingModalOpen] = useState<boolean>(false)
    const [meetingload, setIsMeetingLoad] = useState<boolean>(false)
    useEffect(() => {

        const weekId = path.pathname.split('/').at(-1)
        try {
            setLoading(true)
            fetch('http://localhost:3000/api/v1/meetings/weekDetails/' + weekId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data)
                if (data.week) {
                    setSlots(data.slots)
                    setWeek(data.week)
                    setDoubts(data.doubts)
                    setLoading(false)
                    console.log(week.week_no)
                    const uniqueDays = [...new Set(data.slots.map((item: Slot) => item.day))];
                    setDays(uniqueDays)
                } else {
                    toast.error(data.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false)
        }
    }, [])

    function fetchMeetingDetails(doubtId: number) {
        setMeetingModalOpen(true)
        try {
            setIsMeetingLoad(true)
            fetch('http://localhost:3000/api/v1/meetings/meetingDetails/' + `${doubtId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.meeting) {
                    setMeetingDetails(data.meeting)
                    setIsMeetingLoad(false)
                } else {
                    toast.error(data.message)
                    setMeetingModalOpen(false)
                    setIsMeetingLoad(false)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
            setMeetingModalOpen(false)
            setIsMeetingLoad(false)
        }
    }

    function generateMeetingLink(doubtId: number) {
        if (!doubtId) {
            toast.error('Invalid doubt id')
            return
        }
        try {
            setGenerating(true)
            fetch('http://localhost:3000/api/v1/meetings/createMeetingLink/' + `${doubtId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.meeting) {
                    toast.success(data.message)
                    console.log(data)
                    setGenerating(false)
                } else {
                    toast.error(data.message)
                    setGenerating(false)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
            setGenerating(false)
        }

    }
    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copied!`)
    }

    return (
        // <div className="h-screen">
        //     <Toaster />
        //     <header className="bg-white shadow-md border-b border-gray-100">
        //         <div className="max-w-7xl mx-auto px-6">
        //             <div className="flex justify-between items-center h-16">
        //                 <div className="flex items-center gap-3">
        //                     <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
        //                         <BookOpen className="w-6 h-6 text-white" />
        //                     </div>
        //                     <h1 className="text-xl font-extrabold text-gray-900">Welcome, <span className="text-indigo-600">Mr. Himanshu Parnami</span></h1>
        //                 </div>
        //                 <button className="bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition">
        //                     Logout
        //                 </button>
        //             </div>
        //         </div>
        //     </header>
        //     {
        //         loading ? <p>Loading...</p> :
        //             <>
        //                 <div></div>
        //                 <div>
        //                     <h2 className="text-2xl">Available on days in this week : </h2>
        //                 </div>
        //                 <div className="flex flex-col items-center gap-2 mb-6 max-w-8xl m-auto">

        //                     <div className="w-[80%] m-auto flex items-center gap-2">
        //                         {
        //                             days.sort(
        //                                 (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
        //                             ).map((day, index) => {
        //                                 return (
        //                                     <button
        //                                         key={`${day}_${index}`}
        //                                         type="button"
        //                                         onClick={() => setSelectedDay(day)}
        //                                         className={`w-full py-2 rounded-lg border text-sm font-medium transition px-3
        //                                 ${selectedDay === day
        //                                                 ? "bg-blue-600 text-white border-blue-600"
        //                                                 : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        //                                             }`}
        //                                     >
        //                                         {day}
        //                                     </button>
        //                                 )
        //                             })
        //                         }
        //                     </div>
        //                     <div>Availbale Time slots on the day : {selectedDay}</div>
        //                     <div className="w-[80%] m-auto grid grid-cols-4 gap-2 mb-6">
        //                         {slots.filter(slot => slot.day == selectedDay).map((slot) => (
        //                             <button
        //                                 key={`${slot.id}_${slot.day}_${slot.time}`}
        //                                 type="button"

        //                                 className={`w-full py-2 rounded-lg border text-sm font-medium transition
        //                 ${selectedTime === slot.time
        //                                         ? "bg-blue-600 text-white border-blue-600"
        //                                         : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        //                                     }`}
        //                             >
        //                                 {slot.time}
        //                             </button>
        //                         ))}
        //                     </div>
        //                 </div>
        //             </>
        //     }
        // </div>
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Toaster />
            {
                generating && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg">
                    <div className="rounded-lg shadow-md h-auto p-4 w-[30%] m-auto bg-white">
                        <p>Generating...</p>
                    </div>
                </div>)
            }

            {
                isMeetingModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg">
                        {
                            meetingload ? <div className="rounded-lg shadow-md h-auto p-4 w-[30%] m-auto bg-white">
                                <p>Loading Details...</p>
                            </div> : (
                                <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto border border-gray-200">
                                    <div className="flex items-center justify-between items-center">
                                        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Meeting Details</h2>
                                        <X className="cursor-pointer" onClick={() => setMeetingModalOpen(false)} />
                                    </div>

                                    {/* General Info */}
                                    <div className="space-y-2 text-gray-700 mb-6">
                                        <p><span className="font-semibold">Meeting ID:</span> {meetingDetails.meeting_id}</p>
                                        <p><span className="font-semibold">Date:</span> {new Date(meetingDetails.date).toLocaleString()}</p>
                                        <p><span className="font-semibold">Join Time:</span> {meetingDetails.joinTime}</p>
                                        <p><span className="font-semibold">User:</span> {meetingDetails.user_email}</p>
                                        <p>
                                            <span className="font-semibold">Status:</span>
                                            {meetingDetails.completed ? (
                                                <span className="ml-2 text-green-600 font-medium">Completed</span>
                                            ) : (
                                                <span className="ml-2 text-yellow-600 font-medium">Pending</span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Copyable Fields */}
                                    <div className="space-y-4">
                                        {/* Join URL */}
                                        <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2">
                                            <span className="truncate text-sm text-gray-800">{meetingDetails.join_url}</span>
                                            <button
                                                onClick={() => handleCopy(meetingDetails.join_url, "Join URL")}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                <Clipboard className="w-4 h-4" /> Copy
                                            </button>
                                        </div>

                                        {/* Start URL */}
                                        <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2">
                                            <span className="truncate text-sm text-gray-800">{meetingDetails.start_url}</span>
                                            <button
                                                onClick={() => handleCopy(meetingDetails.start_url, "Start URL")}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                <Clipboard className="w-4 h-4" /> Copy
                                            </button>
                                        </div>

                                        {/* Meeting Password */}
                                        <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2">
                                            <span className="font-mono text-gray-800">{meetingDetails.meeting_password}</span>
                                            <button
                                                onClick={() => handleCopy(meetingDetails.meeting_password, "Password")}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                <Clipboard className="w-4 h-4" /> Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }


            {/* Header */}
            <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo + Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-extrabold text-gray-900">
                                Welcome,&nbsp;
                                <span className="text-indigo-600">Mr. Himanshu Parnami</span>
                            </h1>
                        </div>

                        {/* Logout */}
                        <button className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 shadow-md text-white px-5 py-2 rounded-lg font-semibold transition transform">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : (
                    <>
                        {/* Availability */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Available Days This Week
                            </h2>
                            <div className="flex flex-wrap items-center gap-3">
                                {days
                                    .sort((a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b))
                                    .map((day, index) => (
                                        <button
                                            key={`${day}_${index}`}
                                            onClick={() => setSelectedDay(day)}
                                            className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition
                ${selectedDay === day
                                                    ? "bg-blue-600 text-white shadow-md scale-105"
                                                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                            </div>
                        </section>

                        {/* Time Slots */}
                        {selectedDay && (
                            <section className="mb-10">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Available Time Slots on <span className="text-indigo-600">{selectedDay}</span>
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {slots
                                        .filter((slot) => slot.day === selectedDay)
                                        .map((slot) => (
                                            <button
                                                key={`${slot.id}_${slot.day}_${slot.time}`}
                                                onClick={() => setSelectedTime(slot.time)}
                                                className={`px-4 py-2 rounded-lg shadow-sm font-medium transition
                    ${selectedTime === slot.time
                                                        ? "bg-blue-600 text-white shadow-md scale-105"
                                                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Doubts Section */}
                        {/* <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Doubts Raised</h2>
                            <div className="space-y-4">
                                {doubts && doubts.length > 0 ? (
                                    doubts.map((doubt, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-baseline hover:shadow-lg transition"
                                        >
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{doubt.user_email}</h4>
                                                <p className="text-sm text-gray-600">{doubt.class} : {doubt.doubt_type}</p>
                                                <p>{new Date(doubt.date).toDateString()}</p>
                                            </div>
                                            <button
                                                onClick={() => { }}
                                                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-2 py-1 rounded-lg font-medium hover:scale-105 shadow-md transition"
                                            >
                                                Accept Request
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 italic">No doubts raised yet.</p>
                                )}
                            </div>
                        </section> */}
                        {/* Doubts Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-bold">
                                    ?
                                </span>
                                Doubts Raised
                            </h2>

                            {doubts && doubts.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {doubts.map((doubt, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-200 shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
                                        >
                                            {/* User Info */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow">
                                                    {doubt.user_email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{doubt.user_email}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        Raised on {new Date(doubt.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Doubt Details */}
                                            <div className="mb-4 space-y-1">
                                                <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                                                    {doubt.class}
                                                </span>
                                                <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium ml-2">
                                                    {doubt.doubt_type}
                                                </span>
                                            </div>

                                            {/* Status + Action */}
                                            <div className="flex justify-between items-center mt-auto">
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full ${doubt.request_accepted
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                >
                                                    {doubt.request_accepted ? "Accepted" : "Pending"}
                                                </span>

                                                {!doubt.request_accepted ? (
                                                    <button
                                                        onClick={() => { generateMeetingLink(doubt.id) }}
                                                        className="bg-gradient-to-r cursor-pointer from-green-500 to-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 shadow-md transition"
                                                    >
                                                        Accept
                                                    </button>
                                                ) : <button
                                                    onClick={() => { fetchMeetingDetails(doubt.id) }}
                                                    className="bg-gradient-to-r cursor-pointer from-green-500 to-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 shadow-md transition"
                                                >
                                                    View Meeting Details
                                                </button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 italic">No doubts raised yet.</p>
                            )}
                        </section>

                    </>
                )}
            </main>
        </div>

    )
}

export default WeekManagement