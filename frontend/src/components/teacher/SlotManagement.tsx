import React, { useEffect, useState, type FormEvent } from "react"
interface Week {
    id: number,
    week_number: number,
    week_name: string,
    completed: boolean
}

import Modal from "../common/Modal"

interface Slot {
    week_id: Number
    day: string
    time: string
    duration: Number
}

const DAYS = [
    {
        id: 1,
        day_name: "Monday"
    },
    {
        id: 2,
        day_name: "Tuesday"
    },
    {
        id: 3,
        day_name: "Wednesday"
    },
    {
        id: 4,
        day_name: "Thursday"
    },
    {
        id: 5,
        day_name: "Friday"
    },
]

interface Day {
    id: number,
    day_name: string
}
import { BookOpen, XCircle, CheckCircle, TableProperties } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const SlotMangement: React.FC = () => {
    const [weeks, setWeeks] = useState<Week[]>([])
    const [weekName, setWeekName] = useState<string>('')
    const [selectedWeekId, setSelectedWeekId] = useState<number>(-1)
    const [selectedDays, setSelectedDays] = useState<Day[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isWeekModalOpen, setIsWeekModalOpen] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<number>(10)
    const [endTime, setEndTime] = useState<number>(12)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://hp-sir.onrender.com/api/v1/meetings/weeks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response: Response) => {
            const data = await response.json()
            if (data.weeks) {
                setWeeks(data.weeks)
            } else {
                setWeeks([])
            }
        })
    }, [])
    function generateSlots(startTime: number, endTime: number): string[] {
        let arr: string[] = []
        const break_points = ['00', '15', '30', '45']
        for (let i = startTime; i < endTime; i++) {
            for (let j = 0; j < break_points.length; j++) {
                arr.push(`${i}:${break_points[j]}`)
            }
        }
        return arr
    }
    function addNewWeek(e: FormEvent) {
        e.preventDefault()
        try {
            fetch('https://hp-sir.onrender.com/api/v1/meetings/postNewWeek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: {
                        week_name: weekName
                    }
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.valid) {
                    toast.success(data.message)
                    setIsWeekModalOpen(false)
                    setWeekName("")
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    function submitHandler(e: FormEvent) {
        e.preventDefault()
        try {
            if (selectedDays.length == 0) {
                toast.error('Atleast one day needs to be selected')
                return
            }
            let time_slots = generateSlots(startTime, endTime)
            let tempArr: Slot[] = []
            for (let i = 0; i < selectedDays.length; i++) {
                for (let j = 0; j < time_slots.length; j++) {
                    let obj: Slot = {
                        week_id: selectedWeekId,
                        time: time_slots[j],
                        day: selectedDays[i].day_name,
                        duration: 15
                    }
                    tempArr.push(obj)
                }
            }
            fetch('https://hp-sir.onrender.com/api/v1/meetings/slots/' + selectedWeekId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    slots: tempArr
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data)
            })
        } catch (error) {

        }


    }
    return (
        <div className="w-[90%] sm:w-[80%] lg:w-[75%] mt-16 p-6 m-auto shadow-xl rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200">
            {/* {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]">

                        <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[60%] md:w-[40%] p-6">
                            <form onSubmit={(e) => { submitHandler(e) }} className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">Create New Batch</h2>
                                    <X onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-500 hover:text-red-500" />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {
                                        DAYS.map((day) => {
                                            return (
                                                <div key={`${day.day_name}_${day.id}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                    <input type="checkbox" onChange={(e) => {
                                                        e.target.checked ? setSelectedDays([...selectedDays, day]) : setSelectedDays(selectedDays.filter(day_obj => day_obj.id !== day.id))
                                                    }} />
                                                    <label>{day.day_name}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                                    <input
                                        value={startTime.toString()}
                                        onChange={(e) => setStartTime(Number(e.target.value))}
                                        type="text"
                                        placeholder="Enter batch name..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                                    <input
                                        value={endTime.toString()}
                                        onChange={(e) => setEndTime(Number(e.target.value))}
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition">
                                    Add Slots
                                </button>
                            </form>
                        </div>

                    </div>
                )
            } */}
            <Modal isOpen={isWeekModalOpen} onClose={() => setIsWeekModalOpen(false)}>
                <form onSubmit={(e) => { addNewWeek(e) }} className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Create New Week</h2>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                        <input
                            value={weekName}
                            onChange={(e) => setWeekName(e.target.value)}
                            type="text"
                            placeholder="Enter batch name..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition">
                        Add New Week
                    </button>
                </form>
            </Modal>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={(e) => { submitHandler(e) }} className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Create New Slots</h2>

                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {
                            DAYS.map((day) => {
                                return (
                                    <div key={`${day.day_name}_${day.id}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                        <input type="checkbox" onChange={(e) => {
                                            e.target.checked ? setSelectedDays([...selectedDays, day]) : setSelectedDays(selectedDays.filter(day_obj => day_obj.id !== day.id))
                                        }} />
                                        <label>{day.day_name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                        <input
                            value={startTime.toString()}
                            onChange={(e) => setStartTime(Number(e.target.value))}
                            type="text"
                            placeholder="Enter batch name..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                        <input
                            value={endTime.toString()}
                            onChange={(e) => setEndTime(Number(e.target.value))}
                            type="number"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition">
                        Add Slots
                    </button>
                </form>
            </Modal>
            <div className="w-full flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #4338CA, #1E1B4B)" }}>Slots management</h2>
                <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">Add Week</button>
            </div>
            {
                weeks.length > 0 ?
                    (
                        <div className="flex w-full flex-col lg:flex-row items-center gap-4">
                            {
                                weeks.map(week => {
                                    return (
                                        <div key={`${week.week_name}_${week.week_number}_${week.id}`} className="p-6 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[45%] xl:w-[40%] m-auto mb-8 bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">
                                            <div className="flex flex-col gap-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md">
                                                        <BookOpen size={24} />
                                                    </div>
                                                    <h2 className="text-xl font-extrabold text-gray-800 bg-clip-text text-transparent"
                                                        style={{ backgroundImage: "linear-gradient(to right, #4338CA, #1E1B4B)" }}>
                                                        {week.week_name}
                                                    </h2>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {
                                                        week.completed ? <CheckCircle size={18} className="text-indigo-500" /> : <XCircle size={18} className="text-indigo-500" />
                                                    }
                                                    <span className="font-semibold">Status</span> {week.completed ? 'Completed' : 'Ongoing'}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <TableProperties size={18} className="text-indigo-500" />
                                                    <span className="font-semibold">Slots:</span> {12}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setSelectedWeekId(week.id)} className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:opacity-90 transition">Complete Week</button>
                                                    <button onClick={() => { setSelectedWeekId(week.id); setIsModalOpen(true) }} className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:opacity-90 transition">Manage Slots</button>
                                                    <button onClick={() => navigate(`/teacher/week/${week.id}`)} className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:opacity-90 transition">View Details</button>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : <p>No weeks added yet add a week</p>
            }
        </div>
    )
}

export default SlotMangement