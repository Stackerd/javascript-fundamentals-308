// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmission = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submission) {
    //Validate that the  AssignmentGroup belongs to the course
    if (ag.course_id !== course.id) {
        throw new Error('Invalid input: AssignmentGroup does not belong to the provided course')
    }

    const learnerScores = {};
    const learnerCount = {};

    //process learner submissions
    submission.forEach(function(submission) {
        const learner_id = submission.learner_id;
        const assignment_id  = submission.assignment_id;
        const score = submission.submission.score;
        if (!learnerScores[learner_id]) {
            learnerScores[learner_id] = {};
            learnerCount[learner_id] = {};
        }
        learnerScores[learner_id] [assignment_id] = score;
        learnerCount[learner_id] [assignment_id] = 1;
    });

    //Calculate averages and individual assignment scores
    const result = [];
    Object.keys(learnerScores).forEach(function(learner_id) {
        const scores = learnerScores[learner_id];
        const totalScore = Object.values(scores).reduce(function(total, score){
            return total + score;
        }, 0);
        const avg = totalScore / Object.keys(scores).length;
        const individualScores = {};
        Object.keys(scores).forEach(function(assignment_id) {
            individualScores[assignment_id] = scores[assignment_id] / ag.assignments.find(function(a) {
                return a.id == assignment_id;
            }).points_possible;
        });
        result.push({
            id: parseInt(learner_id),
            avg: avg,
            ...individualScores,
        });
    });

    return result;

}
try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmission);
    console.log(result);
} catch (error) {
    console.log(error.message);
}
