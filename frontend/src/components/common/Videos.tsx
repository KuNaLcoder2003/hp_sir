import React, { useEffect, useState, type FormEvent } from "react";
import { BookOpen, Loader, Plus, X, Youtube } from "lucide-react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import StudentNavbar from "../students/StudentNavbar";
import { useLocation } from "react-router-dom";

interface Video {
    id: number
    video_name: string
    content_url: string
    type: string
    uploaded_on: string
    sub_folder_id: string
}

const Videos: React.FC<{ account: string }> = ({ account }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const params = useLocation()
    const [loading, setLoading] = useState<boolean>(false)

    const fetch_videos = async () => {
        setLoading(true)
        const subFolderId = params.pathname.split('/').at(-1)
        try {
            fetch('http://localhost:3000/api/v1/student/videos/' + `${subFolderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res: Response) => {
                const data = await res.json()
                if (data.videos) {
                    setVideos(data.videos)
                    setLoading(false)
                } else {
                    toast.error(data.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            toast.error('somethig went wrong')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch_videos()
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideo, setNewVideo] = useState({ title: "", url: "" });

    const addNewVideo = (e: FormEvent) => {
        e.preventDefault();
        const subFolderId = params.pathname.split('/').at(-1)

        if (!newVideo.title || !newVideo.url) {
            toast.error("Please fill in both fields");
            return;
        }

        try {
            fetch('http://localhost:3000/api/v1/teacher/videos/' + `${subFolderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    video_name: newVideo.title,
                    url: newVideo.url
                })
            }).then(async (res: Response) => {
                const data = await res.json()
                if (data.newContent) {
                    setVideos(data.newContent)
                    toast.success(data.message || 'Uploaded')
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            {account === "teacher" ? (
                <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                                    Welcome, Mr. Himanshu Parnami
                                </h1>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                <StudentNavbar />
            )}

            {/* Main Content */}
            {
                loading ? <div className="flex justify-center items-center h-[50vh]">
                    <Loader className="animate-spin text-indigo-600 w-10 h-10" />
                </div> : (<main
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${account === "teacher" ? "mt-8" : "mt-16"
                        }`}
                >
                    {/* Title & Add Button */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Videos</h1>
                        {account === "teacher" && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                            >
                                <Plus className="w-4 h-4" /> Add New Video
                            </button>
                        )}
                    </div>

                    {/* Video Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <a
                                    key={video.id}
                                    href={video.content_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                                >
                                    <Youtube className="text-4xl text-red-600 mb-2" />
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                                        {video.video_name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">Watch on YouTube</p>
                                </a>
                            ))
                        ) : (
                            <p className="text-gray-600">No videos added yet</p>
                        )}
                    </div>
                </main>
                )
            }
            {/* Modal */}
            {account === "teacher" && isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="rounded-lg shadow-md h-auto p-6 w-full max-w-md bg-white">
                            <form
                                onSubmit={addNewVideo}
                                className="flex flex-col gap-4 rounded-lg"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold">Add New Video</h2>
                                    <X
                                        onClick={() => setIsModalOpen(false)}
                                        className="cursor-pointer"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Video Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newVideo.title}
                                        onChange={(e) =>
                                            setNewVideo({ ...newVideo, title: e.target.value })
                                        }
                                        placeholder="Enter video title..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        YouTube URL
                                    </label>
                                    <input
                                        type="url"
                                        value={newVideo.url}
                                        onChange={(e) =>
                                            setNewVideo({ ...newVideo, url: e.target.value })
                                        }
                                        placeholder="Enter YouTube URL..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                                >
                                    Add Video
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Videos;
