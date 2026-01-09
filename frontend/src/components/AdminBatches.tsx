import type React from "react"
import { Plus, ArrowRight, Pencil } from "lucide-react"
import FooterSection from "./FooterSection"

interface Batch {
    id: string
    batch_name: string
    batch_description: string
}

const SAMPLE_BATCHES: Batch[] = [
    {
        id: "1",
        batch_name: "Class 8th – Maths",
        batch_description:
            "Foundation batch focusing on concepts, problem-solving, and CBSE fundamentals.",
    },
    {
        id: "2",
        batch_name: "Class 9th – Science",
        batch_description:
            "Conceptual learning in Physics, Chemistry, and Biology with exam-oriented practice.",
    },
    {
        id: "3",
        batch_name: "Class 11th – Maths (JEE)",
        batch_description:
            "Advanced batch designed to build strong JEE-level problem-solving skills.",
    },
]

const AdminBatches: React.FC = () => {
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
                                            {batch.batch_name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 max-w-xl">
                                            {batch.batch_description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <button className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-colors">
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>

                                    <button className="inline-flex items-center gap-1 px-4 py-2 bg-[#FF6B2C] text-white text-sm hover:opacity-90 transition-opacity">
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
