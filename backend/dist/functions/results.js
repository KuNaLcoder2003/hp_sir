"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_result_data = get_result_data;
function get_result_data(resultsArr, studentId) {
    let highestMarks = 0;
    let no_of_students_attempted = resultsArr.length;
    let rank;
    let average;
    let student_marks = 0;
    let attempted = false;
    for (let i = 0; i < resultsArr.length; i++) {
        if (resultsArr[i].marks > highestMarks) {
            highestMarks = resultsArr[i].marks;
        }
    }
    for (let i = 0; i < resultsArr.length; i++) {
        if (resultsArr[i].student_id == studentId) {
            student_marks = resultsArr[i].marks;
        }
    }
    for (let i = 0; i < resultsArr.length; i++) {
        if (resultsArr[i].student_id == studentId) {
            attempted = resultsArr[i].attempted;
        }
    }
    let studentIndex = [...resultsArr].sort((a, b) => b.marks - a.marks).findIndex(result => result.student_id == studentId);
    rank = studentIndex + 1;
    let marks_total = resultsArr.reduce((sum, obj) => sum + obj.marks, 0);
    average = Number((marks_total / no_of_students_attempted).toFixed(2));
    return { highestMarks, no_of_students_attempted, rank, average, student_marks, attempted };
}
