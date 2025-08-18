

const Teacher = () => {
    return (
        <div className='w-[90%] m-auto p-4 mt-20 flex flex-col gap-6'>
            <div className='w-[80%] m-auto flex flex-col items-center mb-6 p-1'>
                <h2 className='lg:w-[50%]  text-center text-4xl font-bold  bg-clip-text text-transparent p-2' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Meet your teacher</h2>
                <p className='lg:w-[50%] text-gray-500 text-center'>Learn from an experienced educator dedicated to your success</p>
            </div>
            <div className='m-auto p-2 flex flex-col items-center lg:items-start lg:flex-row justify-center gap-4 '>
                <div className='w-[200px] h-[200px] rounded-lg'>
                    <img src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' className='object-cover rounded-lg w-full h-full' />
                </div>

                <div className='flex flex-col gap-2 items-baseline w-[90%] items-center lg:items-baseline lg:w-[50%] rounded-lg'>
                    <h2 className='text-2xl text-transparent font-bold bg-clip-text' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>Himanshu Parnami</h2>
                    <p className='text-gray-500 text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero, tempore possimus repellendus, magnam ullam dolor ducimus ipsa nesciunt nulla, beatae assumenda est? Provident sed magnam, natus expedita quidem placeat!</p>
                </div>

            </div>
        </div>
    )
}

export default Teacher
