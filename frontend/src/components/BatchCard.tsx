import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Utility function for classnames
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
};

// Types
interface CardStickyProps extends HTMLMotionProps<"div"> {
    index: number;
    incrementY?: number;
    incrementZ?: number;
}

// ContainerScroll Component
const ContainerScroll = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("relative w-full font-mono", className)}
            style={{ perspective: "1000px", ...props.style }}
            {...props}
        >
            {children}
        </div>
    );
});
ContainerScroll.displayName = "ContainerScroll";

// CardSticky Component
const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
    (
        {
            index,
            incrementY = 10,
            incrementZ = 10,
            children,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const y = index * incrementY;
        const z = index * incrementZ;

        return (
            <motion.div
                ref={ref}
                layout="position"
                style={{
                    top: y,
                    zIndex: z,
                    backfaceVisibility: "hidden",
                    ...style,
                }}
                className={cn("sticky font-mono", className)}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
CardSticky.displayName = "CardSticky";

// Data
const PROCESS_PHASES = [
    {
        id: "batch-1",
        batch_id: 'err',
        title: "Class 8th – Maths",
        description:
            "Build strong fundamentals in arithmetic, algebra, and geometry as per the CBSE curriculum. This batch focuses on conceptual clarity, problem-solving skills, and preparing students early for competitive exams.",
    },
    {
        id: "batch-2",
        batch_id: 'err',
        title: "Class 8th – Science",
        description:
            "Develop curiosity and scientific thinking through Physics, Chemistry, and Biology concepts aligned with CBSE. Emphasis is placed on understanding, not rote learning.",
    },
    {
        id: "batch-3",
        batch_id: 'err',
        title: "Class 9th – Maths",
        description:
            "A critical foundation year. This batch strengthens algebra, geometry, and number systems while introducing students to higher-level problem-solving required for Class 10 and beyond.",
    },
    {
        id: "batch-4",
        batch_id: 'err',
        title: "Class 9th – Science",
        description:
            "Covers Physics, Chemistry, and Biology with a focus on core concepts and numerical practice. Designed to prepare students for board-level depth and competitive exam thinking.",
    },
    {
        id: "batch-5",
        batch_id: "825a5e90-059b-40b6-90ce-ae0664338ffc",
        title: "Class 10th – Maths",
        description:
            "Focused preparation for CBSE board exams with advanced problem-solving techniques. Special attention is given to frequently asked board patterns and conceptual accuracy.",
    },
    {
        id: "batch-6",
        batch_id: 'a56e7fc0-5d05-43a4-84cb-19da34c5f7f8',
        title: "Class 10th – Science",
        description:
            "Comprehensive coverage of Physics, Chemistry, and Biology with board-oriented practice, numericals, and exam strategies to maximize performance in CBSE exams.",
    },
    {
        id: "batch-7",
        batch_id: 'err',
        title: "Class 11th – Maths",
        description:
            "An intensive foundation for JEE and other competitive exams. This batch emphasizes calculus, algebra, and trigonometry with a balance of theory and high-level problem practice.",
    },
    {
        id: "batch-8",
        batch_id: 'err',
        title: "Class 11th – Chemistry",
        description:
            "Covers Physical, Organic, and Inorganic Chemistry with a strong focus on concepts, reactions, and numericals essential for JEE and school exams.",
    },
    {
        id: "batch-9",
        batch_id: 'a8f15070-5f53-4033-a6e8-c468a3ad207f',
        title: "Class 12th – Maths",
        description:
            "Advanced-level preparation targeting CBSE board excellence and JEE readiness. Includes rigorous problem-solving, mock tests, and exam-oriented strategies.",
    },
    {
        id: "batch-10",
        batch_id: '7b53cccb-a9f1-40d1-8e09-81f2410d0257',
        title: "Class 12th – Chemistry",
        description:
            "Final-year focused batch covering complete CBSE syllabus with in-depth preparation for JEE. Stress is placed on reaction mechanisms, numericals, and revision techniques.",
    },
];


const Process = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen px-6 py-12 text-stone-900 font-mono xl:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">

                    {/* Left Section */}
                    <div className="left-0 top-0 md:sticky md:h-screen md:py-12">
                        <h5 className="text-xs uppercase tracking-wide text-stone-500">
                            our batches
                        </h5>

                        <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
                            Explore our{" "}
                            <span className="text-[#FF6B2C]">
                                live learning batches
                            </span>
                        </h2>

                        <p className="max-w-prose text-sm text-stone-700">
                            Each batch is designed to be hands-on, structured, and outcome-driven.
                            Learn through real projects, guided sessions, and continuous feedback—
                            so you don’t just learn, you build.
                        </p>

                    </div>

                    {/* Cards */}
                    <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
                        {PROCESS_PHASES.map((phase, index) => (
                            <CardSticky
                                key={phase.id}
                                index={index + 2}
                                className="rounded-2xl border border-stone-200 bg-white/80 p-8 shadow-md backdrop-blur-md"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="my-6 text-2xl font-bold tracking-tight">
                                        {phase.title}
                                    </h2>

                                    {/* HERO STYLE NUMBER */}
                                    <span className="rounded-full bg-[#FF6B2C]/10 px-3 py-1 text-sm font-bold text-[#FF6B2C]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <p className="mb-6 text-stone-700">
                                    {phase.description}
                                </p>

                                {/* HERO STYLE BUTTON */}
                                <button
                                    onClick={() => navigate(`/batch/${phase.batch_id}`)}
                                    className="rounded-xl bg-[#FF6B2C] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
                                >
                                    Learn More
                                </button>
                            </CardSticky>
                        ))}
                    </ContainerScroll>
                </div>
            </div>
        </div>
    );
};

export default function BatchCard() {
    return (
        <div className="min-h-screen font-mono">
            <div className="pt-20">
                <Process />
            </div>

        </div>
    );
}
