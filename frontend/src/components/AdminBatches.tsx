import type React from "react"
import { Plus, ArrowRight, Pencil } from "lucide-react"
import FooterSection from "./FooterSection"
import { useNavigate } from "react-router-dom";

const SAMPLE_BATCHES = [
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

const AdminBatches: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-4 py-20 font-mono">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-6">
                        <div>
                            <p className="text-sm tracking-widest text-gray-400">
                                ADMIN PANEL
                            </p>
                            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
                                Manage Batches
                            </h1>
                            <p className="mt-4 max-w-2xl text-gray-600">
                                View, manage, and update all active learning batches from one
                                place.
                            </p>
                        </div>

                        {/* Add Batch Button */}
                        <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF6B2C] text-white text-sm hover:opacity-90 transition-opacity">
                            <Plus className="w-4 h-4" />
                            Add New Batch
                        </button>
                    </div>

                    {/* Batch List */}
                    <div className="grid gap-4">
                        {SAMPLE_BATCHES.map((batch, index) => (
                            <div
                                key={batch.id}
                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-xl border border-gray-200 px-6 py-5 hover:border-[#FF6B2C]/50 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-sm text-gray-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {batch.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 max-w-xl">
                                            {batch.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <button className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-colors">
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>

                                    <button onClick={() => navigate(`/admin/batch/${batch.batch_id}`)} className="inline-flex items-center gap-1 px-4 py-2 bg-[#FF6B2C] text-white text-sm hover:opacity-90 transition-opacity">
                                        View
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State (for later use) */}
                    {SAMPLE_BATCHES.length === 0 && (
                        <div className="text-center py-32 text-gray-600">
                            No batches found. Create your first batch to get started.
                        </div>
                    )}
                </div>
            </div>

            <FooterSection />
        </>
    )
}

export default AdminBatches
