

import type React from "react"
import { useEffect, useState } from "react"
import {
    ArrowRight,
    Plus,
    FileText,
    Video,
    UploadCloud,
} from "lucide-react"
import FooterSection from "./FooterSection"
import { useLocation } from "react-router-dom"
import uploadVideo from "../functions/uploadVideo"
import { toast, Toaster } from "react-hot-toast"
import uploadNotes from "../functions/uploadNotes"
import getMaterial from "../functions/getMaterial"
interface BatchDetails {
    batch_name: string
    batch_description: string
}

interface Chapters {
    id: string
    chapter_name: string
    batch_id: string
}

// const SAMPLE_MATERIAL = [
//     {
//         id: "1",
//         notes_title: "Introduction to Algebra",
//         notes_link: "#",
//         type: "Notes",
//     },
// ]

const SAMPLE_VIDEOS = [
    {
        video_title: "Real Numbers – Introduction",
        video_link: "https://www.youtube.com/embed/kSitHajEYKY",
    },
]
const AdminBatch: React.FC = () => {
    const [batchDetails, setBatchDetails] = useState<BatchDetails>()
    const [chapters, setChapters] = useState<Chapters[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [openChapterId, setOpenChapterId] = useState<string | null>(null)
    const [showAddMaterial, setShowAddMaterial] = useState<string | null>(null)
    const [materialType, setMaterialType] = useState<"video" | "notes">("video")
    const [loadingMaterial, setLoadingMaterial] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false)
    // const [videos, setVideos] = useState([]);
    const [notes, setNotes] = useState([]);
    const [videoDetails, setVideoDetails] = useState({
        video_title: "",
        video_link: "",
    })

    const [notesDetails, setNotesDetails] = useState({
        notes_title: "",
        notes_type: "",
    })

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setSelectedFile(file)
    }

    const path = useLocation()
    useEffect(() => {
        setLoading(true)
        try {
            const id = path.pathname.split('/').at(-1);
            fetch('http://localhost:3000/api/v1/batch/batchDetails/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res: Response) => {
                const data = await res.json();
                if (!data.batch_details) {
                    setBatchDetails({
                        batch_name: "",
                        batch_description: ""
                    })
                    setChapters([]);
                    setLoading(false);
                    console.log(data.message)
                } else {
                    setBatchDetails(data.batch_details)
                    setChapters(data.batch_chapters)
                    setLoading(false)
                }
            })
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }, [])
    async function handleVideoUpload(chatpterId: string) {
        if (videoDetails.video_link.length == 0 || videoDetails.video_title.length == 0) {
            return
        }
        setUploading(true);
        const { err, message } = await uploadVideo(chatpterId, videoDetails.video_link, videoDetails.video_title);
        if (err) {
            toast.error(message)
            setUploading(false)
        } else {
            toast.success(message)
            setUploading(false)
        }
        setNotesDetails({
            notes_title: "",
            notes_type: ""
        })
        setSelectedFile(null)
        setVideoDetails({
            video_link: "",
            video_title: ""
        })
    }

    async function handleNotesUpload(chatpterId: string) {
        console.log(notesDetails)
        console.log(selectedFile)
        if (notesDetails.notes_title.length == 0 || notesDetails.notes_type.length == 0 || !selectedFile) {
            return
        }
        const formData: FormData = new FormData()
        formData.append('material_name', notesDetails.notes_title);
        formData.append('material_type', notesDetails.notes_type);
        formData.append('material', selectedFile)
        setUploading(true);
        const { err, message } = await uploadNotes(chatpterId, formData);
        if (err) {
            toast.error(message)
            setUploading(false)
        } else {
            toast.success(message)
            setUploading(false)
        }
        setNotesDetails({
            notes_title: "",
            notes_type: ""
        })
        setSelectedFile(null)
        setVideoDetails({
            video_link: "",
            video_title: ""
        })

    }

    return (
        <>
            {
                loading ? <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                    <p>Loading...</p>
                </div> : <>
                    <Toaster />
                    {
                        uploading ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                            <div className="flex flex-col items-center gap-6">


                                <div className="relative h-12 w-12">
                                    <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
                                    <div className="absolute inset-0 rounded-full border-2 border-[#FF6B2C] border-t-transparent animate-spin" />
                                </div>


                                <p className="font-mono text-sm text-gray-700 tracking-wide">
                                    Uploading material…
                                </p>

                            </div>
                        </div> : <>
                            <div className="min-h-screen bg-white font-mono">
                                <div className="max-w-6xl mx-auto px-4 py-20">


                                    <div className="text-center mb-16">
                                        <p className="text-sm tracking-widest text-gray-400">
                                            ADMIN · BATCH MANAGEMENT
                                        </p>
                                        <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
                                            {batchDetails?.batch_name}
                                        </h1>
                                        <p className="mt-6 max-w-2xl mx-auto text-gray-600">
                                            {batchDetails?.batch_description}
                                        </p>
                                    </div>


                                    <div className="mb-10 flex justify-end">
                                        <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF6B2C] text-white text-sm hover:opacity-90 transition">
                                            <Plus className="w-4 h-4" />
                                            Add New Chapter
                                        </button>
                                    </div>


                                    {
                                        chapters.length > 0 ? <div className="space-y-4">
                                            {chapters.map((chapter, index) => {
                                                const isOpen = openChapterId === chapter.id
                                                const isAdding = showAddMaterial === chapter.id



                                                return (
                                                    <div
                                                        key={chapter.id}
                                                        className="rounded-xl border border-gray-200 overflow-hidden"
                                                    >

                                                        <div className="flex items-center justify-between px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-sm text-gray-400">
                                                                    {String(index + 1).padStart(2, "0")}
                                                                </span>
                                                                <span className="font-medium text-gray-900">
                                                                    {chapter.chapter_name}
                                                                </span>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setShowAddMaterial(
                                                                            isAdding ? null : chapter.id
                                                                        )
                                                                        setNotesDetails({
                                                                            notes_title: "",
                                                                            notes_type: ""
                                                                        })
                                                                        setSelectedFile(null)
                                                                        setVideoDetails({
                                                                            video_link: "",
                                                                            video_title: ""
                                                                        })
                                                                    }
                                                                    }
                                                                    className="px-4 py-2 border border-gray-300 text-sm hover:border-[#FF6B2C] hover:text-[#FF6B2C]"
                                                                >
                                                                    Add Material
                                                                </button>

                                                                <button
                                                                    onClick={async () => {
                                                                        setOpenChapterId(isOpen ? null : chapter.id)
                                                                        setLoadingMaterial(true)
                                                                        const res = await getMaterial(chapter.id);
                                                                        if (res.valid) {
                                                                            setNotes(res.data?.material)
                                                                            console.log(res.data?.material)
                                                                            setLoadingMaterial(false)
                                                                        } else {
                                                                            toast.error(res.message)
                                                                            setLoadingMaterial(false)
                                                                        }
                                                                        setLoadingMaterial(false)
                                                                    }}
                                                                    className="px-4 py-2 bg-[#FF6B2C] text-white text-sm hover:opacity-90"
                                                                >
                                                                    View
                                                                    <ArrowRight
                                                                        className={`inline ml-1 w-4 h-4 ${isOpen ? "rotate-90" : ""
                                                                            }`}
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Add Material Form */}
                                                        {isAdding && (
                                                            <div className="border-t bg-gray-50 px-6 py-6">
                                                                <h4 className="font-bold mb-4">
                                                                    Add New Material
                                                                </h4>

                                                                <div className="flex gap-4 mb-4">
                                                                    <button
                                                                        onClick={() => setMaterialType("video")}
                                                                        className={`px-4 py-2 text-sm border ${materialType === "video"
                                                                            ? "bg-[#FF6B2C] text-white"
                                                                            : "border-gray-300"
                                                                            }`}
                                                                    >
                                                                        Video
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setMaterialType("notes")}
                                                                        className={`px-4 py-2 text-sm border ${materialType === "notes"
                                                                            ? "bg-[#FF6B2C] text-white"
                                                                            : "border-gray-300"
                                                                            }`}
                                                                    >
                                                                        Notes
                                                                    </button>
                                                                </div>

                                                                {materialType === "video" ? (
                                                                    <div className="grid gap-4 max-w-xl">
                                                                        <input
                                                                            value={videoDetails.video_title}
                                                                            onChange={(e) => setVideoDetails({
                                                                                ...videoDetails,
                                                                                video_title: e.target.value
                                                                            })}
                                                                            placeholder="Video Title"
                                                                            className="border px-4 py-2 text-sm"
                                                                        />
                                                                        <input
                                                                            value={videoDetails.video_link}
                                                                            onChange={(e) => setVideoDetails({
                                                                                ...videoDetails,
                                                                                video_link: e.target.value
                                                                            })}
                                                                            placeholder="YouTube Embed Link"
                                                                            className="border px-4 py-2 text-sm"
                                                                        />
                                                                        <button onClick={() => { handleVideoUpload(chapter.id) }} className="w-fit px-4 py-2 bg-[#FF6B2C] text-white text-sm">
                                                                            Save Video
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="grid gap-4 max-w-xl">
                                                                        <input
                                                                            onChange={(e) => setNotesDetails({
                                                                                ...notesDetails,
                                                                                notes_title: e.target.value
                                                                            })}
                                                                            value={notesDetails.notes_title}
                                                                            placeholder="Notes Title"
                                                                            className="border px-4 py-2 text-sm"
                                                                        />
                                                                        <select value={notesDetails.notes_type} onChange={(e) => setNotesDetails({
                                                                            ...notesDetails,
                                                                            notes_type: e.target.value
                                                                        })} className="border px-4 py-2 text-sm">
                                                                            <option value={"Notes"}>Notes</option>
                                                                            <option value={"Practice Sheet"}>Practice Sheet</option>
                                                                            <option value={"Practice Sheet Solution"}>Practice Sheet Solution</option>
                                                                        </select>
                                                                        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 text-center hover:border-[#FF6B2C] transition">
                                                                            <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-[#FF6B2C]" />

                                                                            <p className="font-mono text-sm text-gray-700">
                                                                                {selectedFile ? selectedFile.name : "Click to upload file"}
                                                                            </p>

                                                                            <p className="font-mono text-xs text-gray-400">
                                                                                PDF, DOCX, or Image
                                                                            </p>

                                                                            <input
                                                                                type="file"
                                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                                onChange={handleFileChange}
                                                                            />
                                                                        </label>

                                                                        <button onClick={() => handleNotesUpload(chapter.id)} className="w-fit px-4 py-2 bg-[#FF6B2C] text-white text-sm cursor-pointer">
                                                                            Upload Notes
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* View Content */}
                                                        {isOpen && (
                                                            loadingMaterial ? <div className="border-t bg-gray-50 px-6 py-6 grid md:grid-cols-2 gap-8 animate-pulse">

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
                                                            </div>
                                                                : <div className="border-t bg-gray-50 px-6 py-6 grid md:grid-cols-2 gap-8">
                                                                    <div>
                                                                        <h4 className="font-bold mb-3 flex items-center gap-2">
                                                                            <FileText className="w-4 h-4 text-[#FF6B2C]" />
                                                                            Materials
                                                                        </h4>
                                                                        {
                                                                            notes.length <= 0 ? <p className="text-sm">
                                                                                No Notes uploaded yet
                                                                            </p> : <ul className="space-y-2">
                                                                                {notes.map((m) => (
                                                                                    <li onClick={() => window.open(m.notes_link, "_blank")} key={m.id} className="text-sm hover:text-[#FF6B2C] cursor-pointer">
                                                                                        {m.notes_title} ({m.type})
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        }
                                                                    </div>

                                                                    <div>
                                                                        <h4 className="font-bold mb-3 flex items-center gap-2">
                                                                            <Video className="w-4 h-4 text-[#FF6B2C]" />
                                                                            Videos
                                                                        </h4>
                                                                        <iframe
                                                                            className="w-full aspect-video rounded-lg"
                                                                            src={SAMPLE_VIDEOS[0].video_link}
                                                                            allowFullScreen
                                                                        />
                                                                    </div>
                                                                </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div> : <p>No Chapters yet</p>
                                    }
                                </div>
                            </div>

                            <FooterSection />
                        </>
                    }
                </>
            }
        </>
    )
}

export default AdminBatch
