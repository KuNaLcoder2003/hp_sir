import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import StudentNavbar from './StudentNavbar'
import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react'

interface Content_Obj {
    content_name: string,
    content_url: string,
    id: number
    subjectId: number
    type: string
    uploaded_on: string
}

const Subject: React.FC = ({ }) => {
    const path = useLocation()
    const [subject, setSubject] = useState<string>("")
    const [content, setContent] = useState<Content_Obj[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [permitted, setIsPermitted] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [pdfView, setPdfView] = useState<boolean>(false)
    const [url, setUrl] = useState<string>("")
    useEffect(() => {
        const id = path.pathname.split('/')[2]
        try {
            fetch('https://hp-sir.onrender.com/api/v1/student/subjectDetails/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token') as string
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data)
                if (data.subject) {
                    setSubject(data.subject.subject_name)
                    setContent(data.content)
                    setIsPermitted(true)
                } else {
                    toast.error(data.message)
                    if (!data.permitted) {
                        setIsPermitted(false)
                        setMessage(data.message)
                    }
                    setLoading(false)
                }

            })
        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong')
        }
    }, [])
    return (
        <>
            {
                loading ? <div>Loading...</div> : (
                    permitted ? <div className='w-screen h-screen overflow-x-hidden p-4 bg-gray-100'>
                        <StudentNavbar />
                        <div className='w-[65%] rounded-lg mt-40 m-auto p-4 bg-white'>
                            <h1 className='text-2xl lg:text-3xl bg-clip-text text-transparent font-bold' style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }}>{subject}</h1>
                            <div className='mt-2'>
                                <p className='text-lg lg:text-xl font-semibold text-gray-400'>Content : </p>
                                <div className='flex flex-col items-baseline lg:flex-row lg:gap-4 lg:items-center p-1 lg:flex-wrap'>
                                    {
                                        content.length == 0 ? <p>No Content uploaded yet</p> : content.map((obj, index) => {
                                            return (
                                                <ContentCard setPdfView={setPdfView} setUrl={setUrl} key={index} uploaded_on={"23-07-2025"} url={obj.content_url} content_name={obj.content_name} type={obj.type} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <>
                            {
                                pdfView && <embed
                                    src={url}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                />
                            }
                        </>
                    </div>



                        : <div className='text-2xl max-w-screen flex items-center justify-center'>
                            {message}
                        </div>

                )
            }
        </>
    )
}
interface Content {
    content_name: string,
    uploaded_on: string,
    type: string,
    url: string,
    setUrl: React.Dispatch<React.SetStateAction<string>>,
    setPdfView: React.Dispatch<React.SetStateAction<boolean>>

}

const ContentCard: React.FC<Content> = ({ content_name, uploaded_on, type, setUrl, url, setPdfView }) => {
    return (
        <div onClick={() => {
            setUrl(url)
            setPdfView(true)
        }} className='w-[300px] h-[100px] p-2 bg-stone-100 flex flex-col cursor-pointer items-baseline rounded-lg shadow-lg'>
            <h2 className='text-xl font-bold text-gray-500'>{content_name}</h2>
            <div className='flex w-full items-center gap-4'>
                <p className='text-md text-semibold'>{uploaded_on}</p>
                <p className='text-md text-semibold'>{type}</p>
            </div>
        </div>
    )
}
export default Subject
