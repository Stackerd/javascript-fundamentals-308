//the four data types provided
const courseInfo {
    "id": 456123,
    "name": string,
}
const assignmentGroup {
    "id": number,
    "name": string,
    "course_id": number,
    "group_wieght": number,
    "assignments": [AssigmentInfo]
}
 const AssigmentInfo {
    "id": number,
    "name": string,
    "due_at": date string,
    "score" : number
}
const learnerSubmission {
    "learner_id": number,
    "assignment_id": string,
    "due_at": date string,
    "score" : number
}