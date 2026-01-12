import { ArrowRight, BookOpen } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FooterSection from "./FooterSection";
import getMaterial from "../functions/getMaterial";

interface BatchDetails {
    batch_name: string;
    batch_description: string
}
interface Chapters {
    id: string;
    chapter_name: string;
    batch_id: string
}

interface Notes {
    id: string,
    notes_title: string,
    notes_link: string,
    type: string,
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Batch: React.FC = () => {
    const [batch_details, setBatchDetails] = useState<BatchDetails>()
    const [loading, setLoading] = useState<boolean>(false)
    const [chapters, setChapters] = useState<Chapters[]>([])
    const path = useLocation();
    const [openChapterId, setOpenChapterId] = useState<string | null>(null)
    const [notes, setNotes] = useState<Notes[]>([]);
    const [loadingContent, setLoadingContent] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        try {
            const id = path.pathname.split('/').at(-1)
            fetch(`${BACKEND_URL}/batch/batchDetails/` + id, {
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

    // const SAMPLE_MATERIAL = [
    //     {
    //         id: "1",
    //         notes_title: "Introduction to Algebra",
    //         notes_link: "https://example.com/algebra-notes",
    //         type: "pdf",
    //     },
    //     {
    //         id: "2",
    //         notes_title: "Linear Equations Worksheet",
    //         notes_link: "https://example.com/linear-equations",
    //         type: "pdf",
    //     },
    // ]

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
                                                        onClick={async () => {
                                                            setOpenChapterId(isOpen ? null : chapter.id)
                                                            setLoadingContent(true)
                                                            const response = await getMaterial(chapter.id)
                                                            setLoadingContent(false)
                                                            setNotes(response.data?.material)
                                                        }}
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
                                                    loadingContent ? <div className="border-t bg-gray-50 px-6 py-6 grid md:grid-cols-2 gap-8 animate-pulse">

                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-4 h-4 rounded bg-gray-300" />
                                                                <div className="h-4 w-24 bg-gray-300 rounded" />
                                                            </div>

                                                            <ul className="space-y-3">
                                                                {Array.from({ length: 4 }).map((_, i) => (
                                                                    <li key={i} className="flex items-center gap-2">
                                                                        <div className="h-3 w-3 bg-gray-300 rounded" />
                                                                        <div className="h-3 w-3/4 bg-gray-300 rounded" />
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>


                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-4 h-4 rounded bg-gray-300" />
                                                                <div className="h-4 w-20 bg-gray-300 rounded" />
                                                            </div>

                                                            <div className="w-full aspect-video rounded-lg bg-gray-300" />
                                                        </div>
                                                    </div> : (
                                                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-6">
                                                            <div className="grid md:grid-cols-2 gap-8">

                                                                {/* LEFT — MATERIALS */}
                                                                <div>
                                                                    <h4 className="font-mono font-bold text-gray-900 mb-4">
                                                                        Notes & Material
                                                                    </h4>

                                                                    {
                                                                        notes.length <= 0 ? <p className="font-mono text-md text-gray-700 transition-colors">No Notes uploaded yet</p> : <ul className="space-y-3">
                                                                            {notes.map((note) => (
                                                                                <li key={note.id}>
                                                                                    <p


                                                                                        onClick={() => window.open(`${note.notes_link}`, "_blank")}
                                                                                        className="font-mono text-md text-gray-700 hover:text-[#FF6B2C] transition-colors underline-offset-4 hover:underline"
                                                                                    >
                                                                                        {note.notes_title}
                                                                                    </p>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    }
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
                                                    )
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