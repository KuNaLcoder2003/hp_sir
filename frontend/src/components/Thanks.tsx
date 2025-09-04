import React, { useEffect, useState } from "react"
import { BoxReveal } from "./BoxReveal"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
const Thanks: React.FC = () => {
    const [doubtDetails, setDoubtDetails] = useState<any>({

        class: "",
        completed: false,
        date: "",
        doubt_type: "",
        id: 1,
        meeting_id: "",
        request_accepted: false,
        slot_id: 1,
        user_email: ""
    })
    const [time, setTime] = useState<string>()


    const [loading, setLoading] = useState<boolean>(false)
    const path = useLocation()

    useEffect(() => {
        const id = path.pathname.split('/')[2]
        try {
            setLoading(true)
            fetch('https://hp-sir.onrender.com/api/v1/meetings/doubtDetails/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.doubt) {

                    setDoubtDetails(data.doubt)
                    const utcTime = data.doubt.date.split('T')[1]; // UTC time

                    // Create a Date object using the current date and given UTC time
                    const utcDate = new Date(`1970-01-01T${utcTime}`);

                    // IST is UTC + 5:30, so add 5.5 hours in milliseconds
                    const istOffset = 5.5 * 60 * 60 * 1000;
                    const istDate = new Date(utcDate.getTime() + istOffset);

                    // Format to readable IST time
                    const istTimeString = istDate.toTimeString().split(' ')[0] + '.' + istDate.getMilliseconds().toString().padStart(3, '0');

                    setTime(istTimeString)
                    setLoading(false)
                } else {
                    setLoading(false)
                    toast.error(data.error)
                }
            })
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Something went wrong')
        }
    }, [])
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden px-4">
            {loading ? (
                <p className="text-2xl md:text-3xl bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md">
                    Loading...
                </p>
            ) : (
                <>
                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                        <p className="text-3xl md:text-5xl font-bold text-center">
                            Thank You<span className="text-[#5046e6]">.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                        <h2 className="mt-3 text-base md:text-lg text-center text-gray-700 leading-relaxed">
                            Your Doubt Request has been sent to the admin{" "}
                            <span className="text-[#5046e6] font-medium">Himanshu Parnami</span>
                        </h2>
                    </BoxReveal>

                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                        <div className="mt-6 w-full max-w-md bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-200">
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Email:</span> {doubtDetails.user_email}
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Time:</span> {time}
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Date:</span> {doubtDetails.date.split("T")[0]}
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Class:</span> {doubtDetails.class}
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Type:</span> {doubtDetails.doubt_type}
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                                <span className="font-medium">Status:</span>{" "}
                                {doubtDetails.request_accepted ? (
                                    <span className="text-green-600 font-semibold">Approved</span>
                                ) : (
                                    <span className="text-yellow-600 font-semibold">Approval Pending</span>
                                )}
                            </p>
                        </div>
                    </BoxReveal>

                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                        <button className="mt-6 bg-[#5046e6] hover:bg-[#4038c0] transition-colors duration-200 w-full px-4 cursor-pointer py-2.5 rounded-lg text-white font-medium text-lg shadow-md">
                            Explore
                        </button>
                    </BoxReveal>
                </>
            )}
        </div>

    )
}

export default Thanks