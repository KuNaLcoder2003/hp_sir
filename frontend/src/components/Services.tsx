import { BookOpen } from 'lucide-react'
import React , {useState ,useEffect} from 'react'
import ServiceCards from './ServiceCards'


const useWindowWidth = () => {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);

            window.addEventListener('resize', handleResize);

            // Clean up on unmount
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return width;
    };


const Services = () => {
    const data = [
        {
            id: 1,
            heading: 'Class 9 – Maths & Science',
            name: "Foundation course for Class 9 students",
            subjects: ['Maths', 'Science'],
            duration: 12,
            mode: 'Offline',
            feature: ['Comprehensive syllabus', 'Regular assessments', 'Doubt clearing sessions']
        },
        {
            id: 2,
            heading: 'Class 10 – Maths & Science',
            name: "Board exam preparation for Class 10",
            subjects: ['Maths', 'Science'],
            duration: 12,
            mode: 'Offline',
            feature: ['Board exam focus', 'Mock tests', 'Individual Attention']
        },
        {
            id: 3,
            heading: 'Class 11 – Chemistry & Maths',
            name: "Advanced concepts for Class 11 students",
            subjects: ['Maths', 'Chemistry'],
            duration: 12,
            mode: 'Offline',
            feature: ['Conceptual clarity', 'Problem solving', 'Regular assesments']
        },
        {
            id: 4,
            heading: 'Class 12 – Chemistry & Maths',
            name: "Board exam preparation for Class 12",
            subjects: ['Maths', 'Chemistry'],
            duration: 12,
            mode: 'Offline',
            feature: ['Board exam focus', 'Mock tests', 'Individual Attention']
        },
    ]

    const width = useWindowWidth()

    return (
        
        <div className={`w-screen overflow-x-hidden ${width == 430 ? "-mt-[25rem]" : ""} 3xl:-mt-100`}>
            <div className='w-[80%] m-auto flex flex-col items-center mb-6 p-1'>
                <h2 className='lg:w-[50%]  text-center text-4xl font-bold  bg-clip-text text-transparent p-2' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Our Programs</h2>
                <p className='lg:w-[50%] text-gray-500 text-center'>Comprehensive courses designed to build strong foundations and achieve academic excellence</p>
            </div>

            <div className='w-[90%] m-auto flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 items-center justify-between'>
                {
                    data.map(obj => {
                        return (
                            <ServiceCards key={obj.id} serviveObj={obj} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Services
