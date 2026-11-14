  
// ==========================================
// STUDYTRACK - STUDENT ACADEMIC MANAGEMENT
// ==========================================


// GET HTML ELEMENTS
// LOGIN ELEMENTS
const loginPage = document.getElementById("loginPage");
const loginForm = document.getElementById("loginForm");
const loginRole = document.getElementById("loginRole");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const appLayout = document.getElementById("appLayout");
const btnLogout = document.getElementById("btnLogout");
const navigation = document.getElementById("navigation");
const content = document.getElementById("content");
const heading = document.getElementById("heading");
const portal = document.getElementById("portal");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");


// CURRENT USER ROLE
let currentRole = "student";


// STUDENT MENU
const studentMenu = [
    "Dashboard",
    "My Profile",
    "My Grades",
    "Academic Performance",
    "My Task",
    "Exam Planner",
    "Study Planner",
    "Announcements"
];


// TEACHER MENU
const teacherMenu = [
    "Dashboard",
    "My Profile",
    "Manage Students",
    "Exam Schedule",
    "Announcements"
];


// SAMPLE STUDENT INFORMATION
const student = {
    name: "Sheane Mendoza",
    id: "2026-0001",
    course: "BS Information Technology",
    department: "College of Computer Studies",
    year: "First Year",
    email: "sheane@example.com"
};


// SAMPLE TASKS
let tasks = [
    {
        title: "Programming Activity",
        status: "Pending"
    },
    {
        title: "Contemporary",
        status: "Completed"
    },
    {
        title: "UTS",
        status: "Pending"
    }
];


// SAMPLE GRADES
let grades = [
    {
        student: "Sheane Mendoza",
        subject: "UTS",
        midterm: "1.75",
        final: "1.50",
        average: "1.63",
        remarks: "Passed"
    },
    {
        student: "Dwayne Rafinan",
        subject: "Contemporary",
        midterm: "2.00",
        final: "1.75",
        average: "1.88",
        remarks: "Passed"
    },
    {
        student: "Vince Salvador",
        subject: "Komfil",
        midterm: "2.00",
        final: "2.00",
        average: "2.00",
        remarks: "Passed"
    },
    {
        student: "Geishamae Calleja",
        subject: "Fundamentals",
        midterm: "2.25",
        final: "2.00",
        average: "2.13",
        remarks: "Passed"
    }
];

let studentsList = [
    {
        id: "2026-0001",
        name: "Sheane Mendoza",
        course: "BS Information Technology",
        year: "First Year",
        email: "sheane@example.com"
    }
];

let totalSubjects = 8;


// SAMPLE EXAM SCHEDULE
let exams = [
    {
        subject: "Contemporary",
        date: "November 18, 2026"
    },
    {
        subject: "Fundamentals",
        date: "November 22, 2026"
    }
];


// ANNOUNCEMENTS
let announcements = [];


let studyPlans = [];


// ==========================================
// SHOW NAVIGATION MENU
// ==========================================

function showMenu() {

    const menu = currentRole === "student"
        ? studentMenu
        : teacherMenu;

    navigation.innerHTML = "";

    menu.forEach(item => {

        const button = document.createElement("button");

        button.className = "nav-link";
        button.textContent = item;

        if (heading.textContent === item) {
            button.classList.add("active");
        }

        button.addEventListener("click", function() {

    showPage(item);

    sidebar.classList.remove("open");

        });

        navigation.appendChild(button);

    });

}


// ==========================================
// DASHBOARD
// ==========================================

function dashboard() {

    if (currentRole === "student") {

        const studentGrades = grades.filter(
            g => g.student === student.name
        );

        content.innerHTML = `

            <div class="welcome">

                <h2>Welcome back, ${student.name}!</h2>

                <p>
                    Welcome to your academic dashboard.
                    Manage your tasks, grades, and study schedule
                    in one place.
                </p>

            </div>


            <div class="grid">

                <div class="stat">
                    <small>Overall Average</small>
                    <strong>1.75</strong>
                </div>

                <div class="stat">
                    <small>Total Tasks</small>
                    <strong>${tasks.length}</strong>
                </div>

                <div class="stat">
                    <small>Pending Tasks</small>
                    <strong>
                        ${tasks.filter(t => t.status === "Pending").length}
                    </strong>
                </div>

                <div class="stat">
    <small>Total Subjects</small>
    <strong>${totalSubjects}</strong>
</div>

            </div>


            <div class="card">

                <h3>Recent Tasks</h3>

                ${tasks.map(task => `
                    <p>
                        ${task.title}
                        —
                        <span class="badge">${task.status}</span>
                    </p>
                `).join("")}

            </div>


            <div class="card">

                <h3>Upcoming Exams</h3>

                ${exams.map(exam => `
                    <p>
                        <b>${exam.subject}</b>
                        — ${exam.date}
                    </p>
                `).join("")}

            </div>

        `;

    }

    else {

        const totalStudents = studentsList.length;

        content.innerHTML = `

            <div class="welcome">

                <h2>Welcome, Teacher!</h2>

                <p>
                    Manage student information,
                    academic grades, tasks, and announcements.
                </p>

            </div>


            <div class="grid">

                <div class="stat">
                    <small>Total Students</small>
                    <strong>${totalStudents}</strong>
                </div>

                <div class="stat">
                    <small>Grade Records</small>
                    <strong>${grades.length}</strong>
                </div>

                <div class="stat">
                    <small>Pending Tasks</small>
                    <strong>
                        ${tasks.filter(t => t.status === "Pending").length}
                    </strong>
                </div>

                <div class="stat">
                    <small>Announcements</small>
                    <strong>${announcements.length}</strong>
                </div>

            </div>


            <div class="card">

                <h3>Recent Announcements</h3>

                ${announcements.length > 0
                    ? announcements.map(a => `<p>${a}</p>`).join("")
                    : `<p class="empty-message">No announcements yet.</p>`
                }

            </div>

            <div class="card">
    <h3>Manage Total Subjects</h3>

    <label>Number of Subjects</label>

    <input
        type="number"
        id="subjectCount"
        min="1"
        value="${totalSubjects}"
    >

    <button class="btn" id="saveSubjectCount">
        Save Changes
    </button>
</div>

        `;

              document.getElementById("saveSubjectCount")
            .addEventListener("click", function() {

                const newTotal = Number(
                    document.getElementById("subjectCount").value
                );

                if (!Number.isInteger(newTotal) || newTotal < 1) {
                    alert("Please enter a valid number.");
                    return;
                }

                totalSubjects = newTotal;

                alert("Total subjects updated!");

                dashboard();
            });

    }

}


// ==========================================
// SHOW PAGE
// ==========================================

 function showPage(page) {
    heading.textContent = page;


    // DASHBOARD
    if (page === "Dashboard") {

        dashboard();

    }


    
    // MY PROFILE
    else if (page === "My Profile") {

        content.innerHTML = `

            <div class="card">

                <h3>My Profile</h3>

                <label>Student ID</label>
                <input type="text" value="${student.id}" disabled>

                <label>Complete Name</label>
                <input type="text" id="profileName" value="${student.name}">

                <label>Course</label>
                <input type="text" id="profileCourse" value="${student.course}">

                <label>Department</label>
                <input type="text" id="profileDepartment" value="${student.department}">

                <label>Year Level</label>
                <input type="text" id="profileYear" value="${student.year}">

                <label>Email Address</label>
                <input type="email" id="profileEmail" value="${student.email}">

                <button class="btn" id="saveProfileBtn">
                    Save Changes
                </button>

            </div>

        `;

        document.getElementById("saveProfileBtn")
            .addEventListener("click", saveProfile);

    }



    // MY GRADES AND MANAGE GRADES
    else if (
        page === "My Grades"
    ) {

        const visibleGrades = currentRole === "student"
            ? grades.filter(g => g.student === student.name)
            : grades;

        content.innerHTML = `

            <div class="card">

                <h3>Student Grades</h3>

                <div class="table-container">

                    <table>

                        <tr>
                            <th>Student</th>
                            <th>Subject</th>
                            <th>Midterm</th>
                            <th>Final</th>
                            <th>Average</th>
                            <th>Remarks</th>
                        </tr>

                        ${visibleGrades.map(g => `

                            <tr>
                                <td>${g.student}</td>
                                <td>${g.subject}</td>
                                <td>${g.midterm}</td>
                                <td>${g.final}</td>
                                <td>${g.average}</td>
                                <td>${g.remarks}</td>
                            </tr>

                        `).join("")}

                    </table>

                </div>

            </div>

        `;

    }


    // ACADEMIC PERFORMANCE
    else if (page === "Academic Performance") {

        const studentGrades = grades.filter(
            g => g.student === student.name
        );

        content.innerHTML = `

            <div class="grid">

                <div class="stat">
                    <small>Overall Average</small>
                    <strong>1.75</strong>
                </div>

                <div class="stat">
                    <small>Recorded Subjects</small>
                    <strong>${studentGrades.length}</strong>
                </div>

            </div>


            <div class="card">

                <h3>Subject Performance</h3>

                <div class="table-container">

                    <table>

                        <tr>
                            <th>Subject</th>
                            <th>Midterm</th>
                            <th>Final</th>
                            <th>Average</th>
                            <th>Remarks</th>
                        </tr>

                        ${studentGrades.map(g => `

                            <tr>
                                <td>${g.subject}</td>
                                <td>${g.midterm}</td>
                                <td>${g.final}</td>
                                <td>${g.average}</td>
                                <td>${g.remarks}</td>
                            </tr>

                        `).join("")}

                    </table>

                </div>

            </div>


            <div class="card">

                <h3>Performance Summary</h3>

                <p>
                    Your academic performance is based
                    on your recorded subject grades.
                </p>

                <p>
                    Continue completing your academic
                    requirements and preparing for examinations.
                </p>

            </div>

        `;

    }


// MY TASK
else if (page === "My Task") {

    content.innerHTML = `
        <div class="card">
            <h3>My Task</h3>

            ${tasks.length > 0
                ? tasks.map((task, index) => `
                    <div class="card">
                        <p>
                            <b>${task.title}</b>
                            — <span class="badge">${task.status}</span>
                        </p>

                        ${task.status !== "Completed" ? `
                            <button class="btn complete-task"
                                data-index="${index}">
                                Complete
                            </button>
                        ` : ""}

                        <button class="btn delete-task"
                            data-index="${index}">
                            Delete
                        </button>
                    </div>
                `).join("")
                : `<p>No tasks available.</p>`
            }

            <label for="newTask">Add New Task</label>
            <input type="text" id="newTask"
                placeholder="Enter task name">

            <button class="btn" id="addTaskBtn">
                Add Task
            </button>
        </div>
    `;

    document.getElementById("addTaskBtn")
        .addEventListener("click", addTask);

    document.querySelectorAll(".complete-task")
        .forEach(button => {
            button.addEventListener("click", function() {
                completeTask(Number(this.dataset.index));
            });
        });

    document.querySelectorAll(".delete-task")
        .forEach(button => {
            button.addEventListener("click", function() {
                deleteTask(Number(this.dataset.index));
            });
        });
}


    // EXAM PLANNER AND EXAM SCHEDULE
    else if (
        page === "Exam Planner" ||
        page === "Exam Schedule"
    ) {

        content.innerHTML = `

            <div class="card">

                <h3>${page}</h3>

                ${exams.length > 0
                    ? exams.map((exam, index) => `
                        <p>
                            <b>${index + 1}. ${exam.subject}</b>
                            <br>
                            Date: ${exam.date}
                            <br>
                            Time: ${exam.time || "Not specified"}
                            <br>
                            Room: ${exam.room || "Not specified"}
                        </p>
                        <hr>
                    `).join("")
                    : `<p>No exam schedules yet.</p>`
                }

                ${currentRole === "teacher" ? `

                    <hr>

                    <h3>Add Exam Schedule</h3>

                    <label>Subject</label>
                    <input type="text" id="examSubject"
                        placeholder="Enter subject">

                    <label>Exam Date</label>
                    <input type="date" id="examDate">

                    <label>Exam Time</label>
                    <input type="time" id="examTime">

                    <label>Room</label>
                    <input type="text" id="examRoom"
                        placeholder="Enter room">

                    <button class="btn" id="addExamBtn">
                        Add Exam
                    </button>

                ` : ""}

            </div>

        `;

        if (currentRole === "teacher") {
            document.getElementById("addExamBtn")
                .addEventListener("click", addTeacherExam);
        }

    }



    
// STUDY PLANNER
else if (page === "Study Planner") {

    content.innerHTML = `
        <div class="card">
            <h3>Study Planner</h3>
            <p>Organize your study time and activities.</p>

            <label>Subject</label>
            <input type="text" id="studySubject"
                placeholder="Enter subject">

            <label>Study Topic</label>
            <input type="text" id="studyTopic"
                placeholder="Enter study topic">

            <label>Study Date</label>
            <input type="date" id="studyDate">

            <label>Study Time</label>
            <input type="time" id="studyTime">

            <button class="btn" id="addStudyBtn">
                Add Study Plan
            </button>
        </div>

        <div class="card">
            <h3>My Study Schedule</h3>

            ${studyPlans.length > 0
                ? studyPlans.map((plan, index) => `
                    <div class="card">
                        <p><b>${plan.subject}</b></p>
                        <p>Topic: ${plan.topic}</p>
                        <p>Date: ${plan.date}</p>
                        <p>Time: ${plan.time}</p>
                        <p>Status: <span class="badge">${plan.status || "Pending"}</span></p>

                        ${plan.status !== "Completed" ? `
                            <button class="btn complete-study"
                                data-index="${index}">
                                Complete
                            </button>
                        ` : ""}

                        <button class="btn delete-study"
                            data-index="${index}">
                            Delete
                        </button>
                    </div>
                `).join("")
                : `<p>No study plans added yet.</p>`
            }
        </div>
    `;

    document.getElementById("addStudyBtn")
        .addEventListener("click", addStudyPlan);

    document.querySelectorAll(".complete-study")
        .forEach(button => {
            button.addEventListener("click", function() {
                completeStudyPlan(Number(this.dataset.index));
            });
        });

    document.querySelectorAll(".delete-study")
        .forEach(button => {
            button.addEventListener("click", function() {
                deleteStudyPlan(Number(this.dataset.index));
            });
        });
}

    
// MANAGE STUDENTS
else if (page === "Manage Students") {

    content.innerHTML = `

        <div class="card">

            <h3>Add Student</h3>

            <label>Student ID</label>
            <input type="text" id="newStudentID"
                placeholder="Enter Student ID">

            <label>Complete Name</label>
            <input type="text" id="newStudentName"
                placeholder="Enter complete name">

            <label>Course</label>
            <input type="text" id="newStudentCourse"
                placeholder="Enter course">

            <label>Year Level</label>
            <input type="text" id="newStudentYear"
                placeholder="Enter year level">

            <label>Email Address</label>
            <input type="email" id="newStudentEmail"
                placeholder="Enter email">

            <button class="btn" id="addStudentBtn">
                Add Student
            </button>

        </div>

        <div class="card">

            <h3>Student List</h3>

            ${studentsList.map((student, index) => `

                <p>
                    ${index + 1}. ${student.id} -
                    ${student.name}
           <tr>
                                <td>${g.subject}</td>
                                <td>${g.midterm}</td>
                                <td>${g.final}</td>
                                <td>${g.average}</td>
                                <td>${g.remarks}</td>
                            </tr>

                        `).join("")}

                    </table>

                </div>

            </div>


            <div class="card">

                <h3>Performance Summary</h3>

                <p>
                    Your academic performance is based
                    on your recorded subject grades.
                </p>

                <p>
                    Continue completing your academic
                    requirements and preparing for examinations.
                </p>

            </div>

        `;

    }


    // MY TASK AND MANAGE TASKS
    else if (
        page === "My Task" ||
        page === "Manage Tasks"
    ) {

        content.innerHTML = `

            <div class="card">

                <h3>${page}</h3>

                ${tasks.length > 0

                    ? tasks.map((task, index) => `

                        <p>
                            ${index + 1}. ${task.title}
                            —
                            <span class="badge">${task.status}</span>
                        </p>

                    `).join("")

                    : `<p class="empty-message">No tasks available.</p>`

                }


                <label for="newTask">Add New Task</label>

                <input
                    type="text"
                    id="newTask"
                    placeholder="Enter task name"
                >

                <button class="btn" id="addTaskBtn">
                    Add Task
                </button>

            </div>

        `;

        document.getElementById("addTaskBtn")
            .addEventListener("click", addTask);

    }


    // EXAM PLANNER AND EXAM SCHEDULE
    else if (
        page === "Exam Planner" ||
        page === "Exam Schedule"
    ) {

        content.innerHTML = `

            <div class="card">

                <h3>${page}</h3>

                ${exams.map(exam => `

                    <p>
                        <b>${exam.subject}</b>
                        — ${exam.date}
                    </p>

                `).join("")}

            </div>

        `;

    }


    // STUDY PLANNER
    else if (page === "Study Planner") {

        content.innerHTML = `

            <div class="card">

                <h3>Study Planner</h3>

                <p>
                    Organize your study time
                    and daily academic activities.
                </p>

                <p>
                    Create a study routine and
                    prepare for your upcoming examinations.
                </p>

            </div>

        `;

    }


    // MANAGE STUDENTS
    else if (page === "Manage Students") {

        const students = [
            ...new Set(grades.map(g => g.student))
        ];

        content.innerHTML = `

            <div class="card">

                <h3>Student List</h3>

                ${students.map((name, index) => `

                    <p>${index + 1}. ${name}</p>

                `).join("")}

            </div>

        `;

    }


    // ANNOUNCEMENTS
    else if (page === "Announcements") {

        content.innerHTML = `

            <div class="card">

                <h3>Class Announcements</h3>

                <textarea
                    id="announcement"
                    placeholder="Write your announcement here..."
                ></textarea>

                <button class="btn" id="postAnnouncementBtn">
                    Post Announcement
                </button>

            </div>


            <div class="card">

                <h3>Posted Announcements</h3>

                <div id="announcementList">

                    ${announcements.length > 0

                        ? announcements.map(a => `
                            <p>${a}</p>
                        `).join("")

                        : `<p class="empty-message">No announcements yet.</p>`

                    }

                </div>

            </div>

        `;

        document.getElementById("postAnnouncementBtn")
            .addEventListener("click", postAnnouncement);

    }


    // UPDATE NAVIGATION
    showMenu();

}


// ==========================================
// ADD TASK FUNCTION
// ==========================================

function addTask() {

    const input = document.getElementById("newTask");

    const taskName = input.value.trim();

    if (taskName === "") {

        alert("Please enter a task name.");

        return;

    }

    tasks.push({

        title: taskName,

        status: "Pending"

    });

    showPage(
        currentRole === "student"
            ? "My Task"
            : "Manage Tasks"
    );

}


// ==========================================
// POST ANNOUNCEMENT FUNCTION
// ==========================================

function postAnnouncement() {

    const input = document.getElementById("announcement");

    const message = input.value.trim();

    if (message === "") {

        alert("Please write an announcement.");

        return;

    }

    announcements.push(message);

    showPage("Announcements");

}


// ==========================================
// CHANGE STUDENT / TEACHER PORTAL
// ==========================================

role.addEventListener("change", function() {

    currentRole = role.value;

    portal.textContent =
        currentRole.toUpperCase() + " PORTAL";

    showPage("Dashboard");

});


// ==========================================
// MOBILE SIDEBAR MENU
// ==========================================

menuToggle.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});


// ==========================================
// INITIAL PAGE
// ==========================================

showPage("Dashboard");
  
