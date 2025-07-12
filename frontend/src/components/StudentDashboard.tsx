import React from 'react';
import StudentNavbar from './StudentNavbar';
const StudentDashboard: React.FC = () => {
    const notes = [
        "Class 10th Physics",
        "Current and Electricity - 1",
        "Current and Electricity - 2",
        "Current and Electricity - 3",
        "Magnetism - 1",
        "Magnetism - 2",
        "Magnetism - 3",
    ];
    return (
        <>
            <StudentNavbar />
            <div className='max-w-8xl m-auto p-4 relative min-h-[80vh] m-auto text-center mt-46 shadow-xl rounded-lg'>
                <h1 className='text-3xl font-bold bg-clip-text text-transparent ' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Class 10th Foundation Batch</h1>
                <main className="max-w-6xl mx-auto p-6">

                    {/* Notes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                        {notes.map((note, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md p-4 rounded-xl flex flex-col justify-between"
                            >
                                <h2 className="font-semibold mb-4">{note}</h2>
                                <div className="flex justify-between items-center">
                                    
                                    <img
                                        src="https://img.icons8.com/color/48/pdf-2.png"
                                        className="w-6 h-6"
                                        alt="PDF"
                                    />
                                    <img
                                        src="https://img.icons8.com/ios-filled/24/download--v1.png"
                                        className="w-5 h-5"
                                        alt="Download"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
};


export default StudentDashboard
