import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";

const DoubtForm: React.FC = () => {
    const [slots, setSlots] = useState<any[]>([])
    const [selectedDay, setSelectedDay] = useState<string>("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isoDate, setIsoDate] = useState<string>("");
    const [weekId, setWeekId] = useState<number>(-1)
    const [days, setDays] = useState<any[]>([])
    const [selectedSlotId, setSlectedSlotId] = useState<number>(-1)
    const [selectedClass, setSelectedClass] = useState<string>("")
    const [doubtType, setDoubtType] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    // Map short day → index
    const daysMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    // Function to compute ISODate
    const days_in_iso_format = {
        'Monday': 'Mon',
        'Tuesday': 'Tue',
        'Wednesday': 'Wed',
        'Thursday': 'Thu',
        'Friday': 'Fri',
        'Saturday': 'Sat',
        'Sunday': 'Sun'
    }
    const getISODate = (day: string, time: string): string | null => {
        if (!day || !time) return null;
        let day_fromatted = days_in_iso_format[day]
        const today = new Date();
        const currentDay = today.getDay(); // 0=Sun, 1=Mon...
        const targetDay = daysMap[day_fromatted];
        let diff = targetDay - currentDay;

        // if already passed this week, go to next week
        if (diff < 0) diff += 7;

        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);

        // Set hours/minutes
        const [hours, minutes] = time.split(":").map(Number);
        targetDate.setHours(hours, minutes, 0, 0);

        return targetDate.toISOString();
    };

    // Update ISO whenever selection changes
    useEffect(() => {
        setLoading(true)
        fetch('https://hp-sir.onrender.com/api/v1/meetings/bookingDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response: Response) => {
            const data = await response.json()
            if (data.week) {
                setSlots(data.slots)
                setWeekId(data.week.id)
                setLoading(false)

                const uniqueDays = [...new Set(data.slots.map(item => item.day))];
                setDays(uniqueDays)
            }
        })
    }, [])
    useEffect(() => {
        const date = getISODate(selectedDay, selectedTime);
        if (date) setIsoDate(date);
    }, [selectedDay, selectedTime]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isoDate) return;

        console.log("Payload to backend:", {
            user_email: "user@example.com",
            doubt_type: "Maths",
            class: "10th Grade",
            day: selectedDay,
            time: selectedTime,
            date: isoDate,
        });
        try {
            fetch('https://hp-sir.onrender.com/api/v1/meetings/doubtRequest/' + `${selectedSlotId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: {
                        user_email: email,
                        doubt_type: doubtType,
                        class: selectedClass,
                        date: isoDate
                    }
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.valid) {
                    toast.success(data.message)
                    setTimeout(() => {
                        navigate(`/thanks/${data.doubtId}`)
                    }, 1000)
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    };



    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-50">
        //     {
        //         loading ? <p>Loading...</p> : <form
        //             onSubmit={handleSubmit}
        //             className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
        //         >
        //             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        //                 Book a Doubt Session , week id : {weekId}
        //             </h2>

        //             {/* Days selection */}
        //             <p className="mb-2 text-gray-700 font-medium">Select Day</p>
        //             <div className="flex flex-col items-baseline gap-4 w-full">

        //                 <div className="flex items-center gap-2 mb-6">
        //                     {
        //                         days.sort(
        //                             (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
        //                         ).map((day) => {
        //                             return (
        //                                 <button
        //                                     key={day}
        //                                     type="button"
        //                                     onClick={() => setSelectedDay(day)}
        //                                     className={`w-full py-2 rounded-lg border text-sm font-medium transition px-3
        //                                         ${selectedDay === day
        //                                             ? "bg-blue-600 text-white border-blue-600"
        //                                             : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        //                                         }`}
        //                                 >
        //                                     {day}
        //                                 </button>


        //                             )
        //                         })
        //                     }
        //                 </div>
        //             </div>


        //             {/* Time slots */}
        //             <p className="mb-2 text-gray-700 font-medium">Select Time Slot</p>
        //             <div className="grid grid-cols-4 gap-2 mb-6">
        //                 {slots.filter(slot => slot.day == selectedDay).map((slot) => (
        //                     <button
        //                         key={slot}
        //                         type="button"
        //                         onClick={() => { setSelectedTime(slot.time); setSlectedSlotId(slot.id) }}
        //                         className={`py-2 rounded-lg border text-sm font-medium transition
        //         ${selectedTime === slot.time
        //                                 ? "bg-blue-600 text-white border-blue-600"
        //                                 : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        //                             }`}
        //                     >
        //                         {slot.time}
        //                     </button>
        //                 ))}
        //             </div>

        //             {/* Preview ISO string */}
        //             {isoDate && (
        //                 <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 mb-6">
        //                     <strong>Selected DateTime:</strong>
        //                     <div className="mt-1 font-mono text-blue-600">{isoDate}</div>
        //                 </div>
        //             )}

        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        //             >
        //                 Confirm & Send
        //             </button>
        //         </form>
        //     }
        // </div>
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-[120px]">

                {
                    loading ? <p>Loading...</p> : <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Book a Doubt Session , week id : {weekId}
                        </h2>

                        {/* Email input */}
                        <p className="mb-2 text-gray-700 font-medium">Email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Enter your email"
                            className="w-full mb-4 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />

                        {/* Class selection */}
                        <p className="mb-2 text-gray-700 font-medium">Select Class</p>
                        <select
                            name="class"
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            defaultValue=""
                            value={selectedClass}
                            required
                        >
                            <option value="" disabled>Select your class</option>
                            {
                                ['Class 8th', 'Class 9th', 'Class 10th', 'Class 11th', 'Class 12th'].map(str => {
                                    return (
                                        <option key={str} value={str}>{str}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Doubt type */}
                        <p className="mb-2 text-gray-700 font-medium">Type of Doubt</p>
                        <textarea
                            name="doubt"
                            placeholder="Describe your doubt..."
                            className="w-full mb-4 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows={4}
                            value={doubtType}
                            onChange={(e) => setDoubtType(e.target.value)}
                            required
                        ></textarea>

                        {/* Days selection */}
                        <p className="mb-2 text-gray-700 font-medium">Select Day</p>
                        <div className="flex flex-col items-baseline gap-4 w-full">
                            <div className="flex flex-col lg:flex-row items-center gap-2 mb-6">
                                {
                                    days.sort(
                                        (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
                                    ).map((day, index) => {
                                        return (
                                            <button
                                                key={`${day}_${index}`}
                                                type="button"
                                                onClick={() => setSelectedDay(day)}
                                                className={`w-full py-2 rounded-lg border text-sm font-medium transition px-3
                                        ${selectedDay === day
                                                        ? "bg-blue-600 text-white border-blue-600"
                                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Time slots */}
                        <p className="mb-2 text-gray-700 font-medium">Select Time Slot</p>
                        <div className="grid grid-cols-4 gap-2 mb-6">
                            {slots.filter(slot => slot.day == selectedDay).map((slot) => (
                                <button
                                    key={`${slot.id}_${slot.day}_${slot.time}`}
                                    type="button"
                                    onClick={() => { setSelectedTime(slot.time); setSlectedSlotId(slot.id) }}
                                    className={`py-2 rounded-lg border text-sm font-medium transition
                        ${selectedTime === slot.time
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                        }`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>

                        {/* Preview ISO string */}
                        {isoDate && (
                            <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 mb-6">
                                <strong>Selected DateTime:</strong>
                                <div className="mt-1 font-mono text-blue-600">{isoDate}</div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Confirm & Send
                        </button>
                    </form>
                }
            </div>
        </>


    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const data = [
        { content: 'Why us?' },
        { content: 'Our Batches' },
        { content: 'Pricing' },
        { content: 'Student Login' },
    ]
    const navigate = useNavigate();

    return (
        <div className="rounded:sm w-[90%] rounded-xl lg:m-0 lg:w-full max-w-[1000px] mx-auto flex flex-wrap items-center lg:items-center justify-around lg:justify-around lg:rounded-full p-4 bg-white fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg z-50">
            <div className="flex md:justify-start lg:justify-center gap-2 self-center md:self-start lg:p-4">
                <p style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="text-2xl md:text-3xl font-bold bg-clip-text flex items-center justify-center text-transparent">
                    Abhyasa Classes
                </p>
            </div>

            <div className='hidden lg:flex items-center gap-4 p-2'>
                {data.map((data, index) => (
                    <p
                        onClick={() => { if (index == 3) navigate('/signin') }}
                        className='text-gray-400 text-lg font-semibold hover:text-black transition-text duration-400 cursor-pointer'
                        key={`${data.content}_${index}`}
                    >
                        {data.content}
                    </p>
                ))}
            </div>

            {/* Hamburger for small screens */}
            <div className="flex items-center lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 focus:outline-none">
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="w-full lg:hidden"
                >
                    <motion.div
                        initial={false}
                        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="overflow-hidden w-full lg:flex lg:items-center lg:w-auto lg:gap-6 lg:opacity-100 lg:h-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col lg:flex-row items-center gap-4 mt-4 md:mt-0"
                        >
                            {data.map((item, index) => (
                                <p
                                    className="text-gray-500 text-base md:text-lg hover:text-black transition-colors duration-300 cursor-pointer"
                                    key={`${item.content}_${index}`}
                                >
                                    {item.content}
                                </p>
                            ))}
                            <div className="lg:hidden w-[90%] p-2 bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-lg">
                                <div className="p-2 font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] text-white">
                                    Book a free intro call
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}

            <div className="hidden cursor-pointer lg:block w-[25%] p-2 bg-gradient-to-b from-indigo-500 to-indigo-900 rounded-[47.86px] shadow-lg">
                <div className="p-2 font-bold text-lg text-center bg-[radial-gradient(35%_63%_at_50%_50%,_rgb(99,102,241)_0%,_rgb(67,56,202)_100%)] rounded-[54.69px] text-white">
                    Book a doubt session
                </div>
            </div>
        </div>
    )
}

export default DoubtForm;
