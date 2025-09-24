import React, { useEffect, useState, useCallback } from "react";
import { Document, Page } from "react-pdf";

// set worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
    fileUrl: string;
    fetchHeaders?: Record<string, string>;
    initialScale?: number;
};

const PdfViewer: React.FC<Props> = ({ fileUrl, fetchHeaders, initialScale = 1 }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(initialScale);
    const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadPdf = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(fileUrl, {
                method: "GET",
                headers: fetchHeaders ?? {},
            });
            if (!res.ok) throw new Error("Failed to fetch PDF");
            const buffer = await res.arrayBuffer();
            const blob = new Blob([buffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setPdfDataUrl(url);
        } catch (err) {
            console.error("PDF load error:", err);
            setPdfDataUrl(null);
        } finally {
            setLoading(false);
        }
    }, [fileUrl, fetchHeaders]);

    useEffect(() => {
        loadPdf();
        return () => {
            if (pdfDataUrl) URL.revokeObjectURL(pdfDataUrl);
        };
    }, [loadPdf]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div
            className="w-full h-full flex flex-col items-center bg-gray-50"
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Controls */}
            <div className="w-full flex items-center justify-center gap-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <button
                    className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300"
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                >
                    ◀
                </button>
                <span className="text-gray-700 font-medium">
                    {pageNumber} {numPages ? `/ ${numPages}` : ""}
                </span>
                <button
                    className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300"
                    onClick={() =>
                        setPageNumber((p) =>
                            numPages ? Math.min(numPages, p + 1) : p + 1
                        )
                    }
                    disabled={numPages ? pageNumber >= numPages : false}
                >
                    ▶
                </button>

                <div className="mx-4 h-6 w-px bg-gray-300" />

                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                >
                    -
                </button>
                <span className="text-gray-700 font-medium">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                >
                    +
                </button>
            </div>

            {/* Canvas */}
            <div className="flex-1 w-full flex items-center justify-center p-6 overflow-auto">
                {loading && (
                    <div className="text-gray-500 animate-pulse">Loading…</div>
                )}

                {pdfDataUrl ? (
                    <Document
                        file={pdfDataUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<div className="text-gray-500">Loading document…</div>}
                    >
                        <Page pageNumber={pageNumber} scale={scale} renderMode="canvas" />
                    </Document>
                ) : (
                    !loading && (
                        <div className="text-red-500 font-medium">
                            Failed to load PDF
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
