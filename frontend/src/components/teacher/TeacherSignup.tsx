import type React from "react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Teacher {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const TeacherSignup: React.FC = () => {
    const [teacherCred, setTeacherCred] = useState<Teacher>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleTeacherSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            console.log("Teacher signup data:", teacherCred);
            toast.success("Account created successfully!");
            // Add API integration here
            navigate("/signin");
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Toaster />
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                        Teacher Sign Up
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Create your account to get started
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleTeacherSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={teacherCred.first_name}
                            onChange={(e) =>
                                setTeacherCred({ ...teacherCred, first_name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={teacherCred.last_name}
                            onChange={(e) =>
                                setTeacherCred({ ...teacherCred, last_name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={teacherCred.email}
                            onChange={(e) =>
                                setTeacherCred({ ...teacherCred, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={teacherCred.password}
                            onChange={(e) =>
                                setTeacherCred({ ...teacherCred, password: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
                    >
                        Sign Up
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <span
                            className="text-indigo-600 hover:underline cursor-pointer"
                            onClick={() => navigate("/signin")}
                        >
                            Sign in
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default TeacherSignup;
