import React, { useEffect, useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface Test {
    name: string;
    id: number;
    date: string;
}

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    batchId: number;
}

interface Student_Result {
    student_id: number;
    student_name: string;
    result_id: number;
    marks: number;
    test_id: number;
    student_email: string;
    attempted?: boolean;
}

const TeacherTest: React.FC = () => {
    const [batchName, setBatchName] = useState<string>("");
    const [tests, setTests] = useState<Test[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [openTestId, setOpenTestId] = useState<number | null>(null);
    const [student_results, setStudentResults] = useState<Student_Result[]>([]);
    const path = useLocation();
    const [loadingResults, setLoadingResults] = useState<boolean>(false);
    // const [editEntry, setEditEntry] = useState<number>(-1);
    // const [editedEntries, setEditedEntries] = useState<Student_Result[]>([]);
    const [loadStudents, setLoadStudents] = useState<number>(-1);
    const [newResultEntries, setNewResultEntries] = useState<Student_Result[]>([]);
    const [updateTestResults, setUpdateTestResults] = useState<number>(-1)
    const [editedResultEntries, setEditedResultEntries] = useState<Student_Result[]>([])

    useEffect(() => {
        const batchId = path.pathname.split("/")[3];
        const subjectId = path.pathname.split("/")[4];

        fetch(
            "https://hp-sir.onrender.com/api/v1/test/details/" + batchId + "/" + subjectId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response: Response) => {
            const data = await response.json();
            if (data.tests) {
                setTests(data.tests);
                setStudents(data.students || []);
                setBatchName(data.batch_name);
            }
        });
    }, [path]);

    const toggleDropdown = (testId: number) => {
        setOpenTestId(openTestId === testId ? null : testId);
        if (openTestId == testId) {
            setUpdateTestResults(-1)
        }

    };

    function merge_students_marks(
        students: any[],
        results: any[],
        test_id: number
    ) {
        if (results.length === 0) {
            toast.error("Results yet to be added");
            return [];
        }
        if (students.length === 0) {
            toast.error("No students in batch");
            return [];
        }
        let arr: Student_Result[] = [];
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < results.length; j++) {
                if (students[i].id === results[j].student_id) {
                    arr.push({
                        student_id: students[i].id,
                        student_name: `${students[i].first_name} ${students[i].last_name}`,
                        result_id: results[j].id,
                        test_id: test_id,
                        marks: results[j].marks,
                        student_email: students[i].email,
                        attempted: results[j].attempted
                    });
                }
            }
        }
        return arr;
    }

    function fetch_results(testId: number) {
        setLoadingResults(true);
        try {
            fetch("https://hp-sir.onrender.com/api/v1/test/getResults/" + `${testId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (response: Response) => {
                const data = await response.json();
                if (data.results) {
                    console.log('results are', data.results)
                    let arr = merge_students_marks(students, data.results, testId);
                    setStudentResults(arr);
                    // setEditedEntries(arr);
                } else {
                    setStudentResults([]);
                }
                setLoadingResults(false);
            });
        } catch (error) {
            toast.error("Something went wrong");
            setLoadingResults(false);
        }
    }

    function update_results(editedResultEntries: Student_Result[], testId: number) {
        if (editedResultEntries.length == 0) {
            toast.error('Please fill entries')
            return
        }
        try {
            fetch('https://hp-sir.onrender.com/api/v1/test/updateResult/' + `${testId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    results: editedResultEntries
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                if (data.valid) {
                    toast.success(data.message)
                    // setNewResultEntries([])
                    fetch_results(testId)
                    setOpenTestId(-1)
                    setUpdateTestResults(-1)
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    function merge_students_editedResults(students: any[], student_results: Student_Result[], testId: number): any[] {
        let arr: Student_Result[] = [...student_results]
        console.log(student_results)
        console.log('students', students)
        try {
            if (students.length == 0) {
                toast.error('No students in batch')
                return []
            }
            if (student_results.length == 0) {
                toast.error('No results to show please add results first')
                return []
            }
            // filter ids of students not in the student_results array
            let students_not_included = students.filter((obj) => {
                return !student_results.some(student => student.student_id == obj.id)
            })
            for (let i = 0; i < students_not_included.length; i++) {
                let obj: Student_Result = {
                    student_email: students_not_included[i].email,
                    student_name: `${students_not_included[i].first_name} ${students_not_included[i].last_name}`,
                    student_id: students_not_included[i].id,
                    test_id: testId,
                    result_id: 0,
                    marks: 0,
                    attempted: false
                }
                arr = [...arr, obj]
            }
        } catch (error) {
            console.log(error)
        }
        console.log(arr)
        setEditedResultEntries(arr)
    }

    function addResults(newResultEntries: Student_Result[], testId: Number) {
        if (newResultEntries.length == 0) {
            toast.error('Please fill entries')
            return
        }
        try {
            fetch('https://hp-sir.onrender.com/api/v1/test/marks/' + `${testId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    results: newResultEntries
                })
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data)
                if (data.valid) {
                    toast.success(data.message)
                    // setNewResultEntries([])
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Toaster />
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    Welcome, Mr. Himanshu Parnami
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Managing Batch: {batchName}
                                </p>
                            </div>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Tests List */}
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
                    Tests Overview
                </h2>

                <div className="space-y-6">
                    {tests.map((test) => (
                        <div
                            key={test.id}
                            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-5"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {test.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{test.date}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        toggleDropdown(test.id);
                                        fetch_results(test.id);
                                    }}
                                    className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    {openTestId === test.id ? (
                                        <>
                                            <ChevronUp className="w-4 h-4" /> Hide
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" /> Students
                                        </>
                                    )}
                                </button>
                            </div>
                            {openTestId === test.id && (
                                <ul className="mt-4 space-y-3 border-t pt-4 max-h-72 overflow-y-auto">
                                    {loadingResults ? (
                                        <p className="text-gray-500 text-center">Loading...</p>
                                    ) : updateTestResults == test.id ? <div>{
                                        editedResultEntries.map(entry => {
                                            return (
                                                <li
                                                    key={`${entry.test_id}_${entry.student_id}`}
                                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {entry.student_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {entry.student_name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {entry.student_email}
                                                            </p>
                                                        </div>
                                                    </div>


                                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-sm">Marks:</label>
                                                            <input
                                                                className="w-24 border rounded-md px-2 py-1 text-sm"
                                                                placeholder="Enter marks..."
                                                                value={entry.marks.toString()}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;

                                                                    setEditedResultEntries(prev =>
                                                                        prev.map(obj =>
                                                                            obj.student_id === entry.student_id
                                                                                ? { ...obj, marks: value === "" ? 0 : Number(value) }
                                                                                : obj
                                                                        )

                                                                    )
                                                                    // console.log(editedResuktEntries)
                                                                }}

                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-sm">
                                                                Attempted:
                                                            </label>
                                                            <input
                                                                type="checkbox"
                                                                checked={entry.attempted}
                                                                onChange={(e) => {
                                                                    setEditedResultEntries((prev) =>
                                                                        prev.map((obj) =>
                                                                            obj.student_id === entry.student_id
                                                                                ? {
                                                                                    ...obj,
                                                                                    attempted:
                                                                                        e.target.checked,
                                                                                }
                                                                                : obj
                                                                        )
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                </li>
                                            )
                                        })


                                    }
                                        <button onClick={() => update_results(editedResultEntries, test.id)} className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Save Changes</button>

                                    </div> : student_results.length > 0 ? (
                                        <>
                                            {student_results.map((obj) => (
                                                <li
                                                    key={`${obj.test_id}_${obj.student_id}`}
                                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {obj.student_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {obj.student_name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {obj.student_email}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Marks Obtained :  {obj.marks}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                            <div className="flex justify-end">
                                                <button onClick={() => { setUpdateTestResults(test.id); merge_students_editedResults(students, student_results, test.id) }} className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                                    Update Results
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            {!(loadStudents === test.id) && (
                                                <p className="text-sm text-gray-600">
                                                    No results added yet
                                                </p>
                                            )}

                                            {loadStudents === test.id ? (
                                                <div className="space-y-3">
                                                    {students.map((student) => {
                                                        const entry = newResultEntries.find(
                                                            (r) => r.student_id === student.id
                                                        );
                                                        return (
                                                            <li
                                                                key={`${student.email}_${student.id}`}
                                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                                        {student.first_name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">
                                                                            {student.first_name} {student.last_name}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {student.email}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {!entry ? (
                                                                    <button
                                                                        onClick={() => {
                                                                            setNewResultEntries((prev) => [
                                                                                ...prev,
                                                                                {
                                                                                    student_id: student.id,
                                                                                    student_email: student.email,
                                                                                    student_name: `${student.first_name} ${student.last_name}`,
                                                                                    marks: 0,
                                                                                    attempted: false,
                                                                                    test_id: test.id,
                                                                                    result_id: 0,
                                                                                },
                                                                            ])
                                                                            console.log(newResultEntries)
                                                                        }


                                                                        }
                                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                                                    >
                                                                        Post Marks
                                                                    </button>
                                                                ) : (
                                                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                                                        <div className="flex items-center gap-2">
                                                                            <label className="text-sm">Marks:</label>
                                                                            <input
                                                                                className="w-24 border rounded-md px-2 py-1 text-sm"
                                                                                placeholder="Enter marks..."
                                                                                value={entry.marks.toString()}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    setNewResultEntries(prev =>
                                                                                        prev.map(obj =>
                                                                                            obj.student_id === student.id
                                                                                                ? { ...obj, marks: value === "" ? 0 : Number(value) }
                                                                                                : obj
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <label className="text-sm">
                                                                                Attempted:
                                                                            </label>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={entry.attempted}
                                                                                onChange={(e) => {
                                                                                    setNewResultEntries((prev) =>
                                                                                        prev.map((obj) =>
                                                                                            obj.student_id === student.id
                                                                                                ? {
                                                                                                    ...obj,
                                                                                                    attempted:
                                                                                                        e.target.checked,
                                                                                                }
                                                                                                : obj
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                    <button onClick={() => {
                                                        console.log(newResultEntries)
                                                        addResults(newResultEntries, test.id)
                                                    }} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                                        Save Results
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setLoadStudents(test.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold w-fit"
                                                >
                                                    Add Results
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TeacherTest;

