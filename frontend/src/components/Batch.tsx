import { ArrowRight, BookOpen } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FooterSection from "./FooterSection";

interface BatchDetails {
    batch_name: string;
    batch_description: string
}
interface Chapters {
    id: string;
    chapter_name: string;
    batch_id: string
}
const Batch: React.FC = () => {
    const [batch_details, setBatchDetails] = useState<BatchDetails>()
    const [loading, setLoading] = useState<boolean>(false)
    const [chapters, setChapters] = useState<Chapters[]>([])
    const path = useLocation();
    const [openChapterId, setOpenChapterId] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        try {
            const id = path.pathname.split('/').at(-1)
            fetch('http://localhost:3000/api/v1/batch/batchDetails/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                if (!data.batch_details) {
                    console.log('Hi')
                    setBatchDetails({
                        batch_name: "",
                        batch_description: ""
                    })
                    setChapters([])
                    setLoading(false)
                } else {
                    setBatchDetails(data.batch_details);
                    setChapters(data.batch_chapters);
                    setLoading(false)
                }
            })
        } catch (error) {
            setBatchDetails({
                batch_name: "",
                batch_description: ""
            })
            setChapters([])
            setLoading(false)
        }
    }, [])

    const SAMPLE_MATERIAL = [
        {
            id: "1",
            notes_title: "Introduction to Algebra",
            notes_link: "https://example.com/algebra-notes",
            type: "pdf",
        },
        {
            id: "2",
            notes_title: "Linear Equations Worksheet",
            notes_link: "https://example.com/linear-equations",
            type: "pdf",
        },
    ]

    const SAMPLE_VIDEOS = [
        {
            video_title: "Algebra Basics | Class 9",
            video_link: <iframe width="560"
                height="315" src="https://www.youtube.com/embed/kSitHajEYKY?si=rIpK8bl79kyfg1Xp"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>,
        },
        // {
        //     video_title: "Linear Equations Explained",
        //     video_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        // },
    ]


    return (
        <>
            {
                loading ? <div className="min-h-screen flex items-center justify-center font-mono text-gray-700">
                    Loading batch details...
                </div> : <div className="min-h-screen bg-white">
                    <div className="max-w-6xl mx-auto px-4 py-20">

                        {/* Batch Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-mono font-bold text-gray-900">
                                {batch_details?.batch_name}
                            </h1>
                            <p className="mt-6 max-w-2xl mx-auto font-mono text-gray-600">
                                {batch_details?.batch_description}
                            </p>
                        </div>

                        {/* Chapters Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-mono font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#FF6B2C]" />
                                Chapters
                            </h2>

                            {chapters.length === 0 ? (
                                <p className="font-mono text-gray-600">
                                    No chapters available for this batch.
                                </p>
                            ) : (
                                <div className="grid gap-4">
                                    {chapters.map((chapter, index) => {
                                        const isOpen = openChapterId === chapter.id

                                        return (
                                            <div
                                                key={chapter.id}
                                                className="rounded-xl border border-gray-200 overflow-hidden"
                                            >
                                                {/* Chapter Header */}
                                                <div className="flex items-center justify-between px-6 py-4 hover:border-[#FF6B2C]/50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-mono text-sm text-gray-400">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className="font-mono text-gray-900 font-medium">
                                                            {chapter.chapter_name}
                                                        </span>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            setOpenChapterId(isOpen ? null : chapter.id)
                                                        }
                                                        className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-[#FF6B2C] text-white font-mono text-sm hover:opacity-90 transition-opacity"
                                                    >
                                                        View
                                                        <ArrowRight
                                                            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""
                                                                }`}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Dropdown Content */}
                                                {isOpen && (
                                                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-6">
                                                        <div className="grid md:grid-cols-2 gap-8">

                                                            {/* LEFT — MATERIALS */}
                                                            <div>
                                                                <h4 className="font-mono font-bold text-gray-900 mb-4">
                                                                    Notes & Material
                                                                </h4>

                                                                <ul className="space-y-3">
                                                                    {SAMPLE_MATERIAL.map((note) => (
                                                                        <li key={note.id}>
                                                                            <a
                                                                                href={note.notes_link}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="font-mono text-md text-gray-700 hover:text-[#FF6B2C] transition-colors underline-offset-4 hover:underline"
                                                                            >
                                                                                {note.notes_title}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* RIGHT — VIDEOS */}
                                                            <div>
                                                                <h4 className="font-mono font-bold text-gray-900 mb-4">
                                                                    Video Lectures
                                                                </h4>

                                                                <div className="space-y-4">
                                                                    {SAMPLE_VIDEOS.map((video, i) => (
                                                                        <a
                                                                            key={i}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-white hover:border-[#FF6B2C]/50 transition-colors"
                                                                        >
                                                                            {
                                                                                video.video_link
                                                                            }
                                                                            {/* YouTube Mock */}
                                                                            <div className="w-20 h-12 bg-gray-200 rounded-md flex items-center justify-center hidden">
                                                                                {/* <span className="text-red-600 font-mono text-xs">
                                                                                    ▶
                                                                                </span> */}

                                                                            </div>

                                                                            {/* <span className="font-mono text-sm text-gray-800">
                                                                                {video.video_title}
                                                                            </span> */}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            }
            <FooterSection />
        </>
    )
}
export default Batch;