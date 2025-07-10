import { BookOpen, Clock, User2Icon } from 'lucide-react'
import React from 'react'

interface service {
    id : number,
    heading: string,
    name: string,
    subjects: string[],
    duration: number,
    mode: string
    feature: string[]
}

interface Prop {
    serviveObj : service 
}

const ServiceCards: React.FC<Prop> = ({serviveObj}) => {

    return (
        
        <div className='p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[45%] m-auto overflow-hidden shadow-xl rounded-lg'>
            

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
                            {serviveObj.heading}
                        </h2>
                    </div>
                    <p className='text-gray-500 p-1 w-full text-sm sm:text-base'>
                        {serviveObj.name}
                    </p>
                </div>

                {/* Info Section */}
                <div className='flex flex-col items-start p-1 gap-2'>
                    <div className='flex items-center w-full gap-2 p-1'>
                        <User2Icon size={18} color='gray' />
                        <h2 className='text-sm sm:text-base text-gray-500'>
                            Subjects : {
                                serviveObj.subjects.map((subject,idx) => {
                                    return (
                                        <span key={`${subject}_${idx}`}>{subject} , </span>
                                    )
                                } )
                            }
                        </h2>
                    </div>
                    <div className='flex items-center w-full gap-2 p-1'>
                        <Clock size={18} color='gray' />
                        <h2 className='text-sm sm:text-base text-gray-500'>
                            Duration : {serviveObj.duration} months
                        </h2>
                    </div>
                    <div className='flex items-center w-full gap-2 p-1'>
                        <div className='w-[15px] h-[15px] rounded-full bg-green-500'></div>
                        <h2 className='text-sm sm:text-base text-gray-500'>Mode : {serviveObj.mode}</h2>
                    </div>
                </div>

                {/* Key Features */}
                <div className='flex flex-col items-start p-1 gap-2'>
                    <h3 className='text-base sm:text-lg font-semibold'>Key features:</h3>
                    <div className='flex flex-col items-start gap-2'>
                        {serviveObj.feature.map((feature, idx) => (
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

export default ServiceCards
