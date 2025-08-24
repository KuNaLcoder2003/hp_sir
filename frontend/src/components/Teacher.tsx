

const Teacher = () => {
    return (
        <div className="w-[90%] mx-auto p-6 mt-20 flex flex-col gap-10">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto">
                <h2
                    className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent 
      animate-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900"
                >
                    Meet Your Teacher
                </h2>
                <p className="mt-3 text-gray-500 text-lg">
                    Learn from an experienced educator dedicated to your success
                </p>
            </div>

            {/* Content */}
            <div
                className="flex flex-col lg:flex-row items-center lg:items-start 
    justify-center gap-8 p-6 rounded-2xl transition duration-300"
            >
                {/* Teacher Image */}
                <div className="w-[220px] h-[220px] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                    <img
                        src="/hp_sir.png"
                        alt="Himanshu Parnami"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Teacher Info */}
                <div className="flex flex-col gap-4 text-center lg:text-left lg:max-w-2xl">
                    <h3
                        className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-700 to-indigo-900"
                    >
                        Himanshu Parnami
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        I am a committed and enthusiastic educator with a strong background in
                        teaching Mathematics and Science. Over the years, I have developed a
                        teaching style that combines conceptual clarity with practical
                        applications, ensuring that students not only understand the subjects
                        but also enjoy learning them.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        My core strength lies in breaking down complex topics into simple,
                        engaging explanations that encourage curiosity and independent thinking.
                        I focus on building strong fundamentals, nurturing problem-solving
                        skills, and linking concepts to real-life situations to make learning
                        meaningful.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        In my classroom, I create an interactive and inclusive environment where
                        students feel confident to ask questions, share ideas, and actively
                        participate in discussions. I strongly believe that every learner has
                        unique potential, and my role as a teacher is to guide, motivate, and
                        provide them with the tools to succeed academically and personally.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        Beyond subject knowledge, I emphasize values such as discipline,
                        perseverance, and teamwork. I continuously update my methods by
                        integrating modern teaching techniques and technology to enhance student
                        engagement and outcomes. Looking ahead, my goal is to contribute not
                        just to academic excellence but also to the holistic development of my
                        students, preparing them to face challenges with confidence and a
                        problem-solving mindset.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Teacher
