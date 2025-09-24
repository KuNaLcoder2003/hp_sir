// MyPdfPage.tsx
import React from "react";
import PdfViewer from "./PdfViewer";
import { useSearchParams } from "react-router-dom";

const MyPdfPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const url = searchParams.get("url"); // can be null

    if (!url) return <div className="text-red-500">No PDF URL provided</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <PdfViewer fileUrl={url} />
        </div>
    );
};

export default MyPdfPage;
