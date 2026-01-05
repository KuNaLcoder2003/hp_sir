import { ArrowRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";

const NotFound: React.FC = () => {
    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="max-w-xl text-center">

                    {/* 404 Code */}
                    <p className="font-mono text-sm tracking-widest text-gray-400">
                        ERROR 404
                    </p>

                    <h1 className="mt-4 text-4xl md:text-6xl font-mono font-bold text-gray-900">
                        Page Coming Soon
                    </h1>

                    <p className="mt-6 font-mono text-gray-600 leading-relaxed">
                        The page you’re looking for is comming soon.
                        Stay tuned!.
                    </p>

                    {/* Action */}
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B2C] text-white font-mono text-sm hover:opacity-90 transition-opacity"
                        >
                            Go to Home
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </div>

            {/* <FooterSection /> */}
        </>
    );
};

export default NotFound;
