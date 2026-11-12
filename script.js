
// ==========================================
// STUDYTRACK - STUDENT ACADEMIC MANAGEMENT
// ==========================================


// GET HTML ELEMENTS
const role = document.getElementById("role");
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
    "Study Planner"
];


// TEACHER MENU
const teacherMenu = [
    "Dashboard",
    "My Profile",
    "Manage Students",
    "Manage Grades",
    "Manage Tasks",
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
        title: "Database Assignment",
        status: "Completed"
    },
    {
        title: "Web Development Project",
        status: "Pending"
    }
];


// SAMPLE GRADES
let grades = [
    {
        student: "Sheane Mendoza",
        subject: "Programming 2",
        midterm: "1.75",
        final: "1.50",
        average: "1.63",
        remarks: "Passed"
    },
    {
        student: "Sheane Mendoza",
        subject: "Database Management",
        midterm: "2.00",
        final: "1.75",
        average: "1.88",
        remarks: "Passed"
    },
    {
        student: "Alex Reyes",
        subject: "Programming 2",
        midterm: "2.00",
        final: "2.00",
        average: "2.00",
        remarks: "Passed"
    },
    {
        student: "Alex Reyes",
        subject: "Database Management",
        midterm: "2.25",
        final: "2.00",
        average: "2.13",
        remarks: "Passed"
    }
];


// SAMPLE EXAM SCHEDULE
const exams = [
    {
        subject: "Database Management",
        date: "November 18, 2026"
    },
    {
        subject: "Programming 2",
        date: "November 22, 2026"
    }
];


// ANNOUNCEMENTS
let announcements = [];


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
                    <strong>${studentGrades.length}</strong>
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

        const totalStudents = new Set(
            grades.map(g => g.student)
        ).size;

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

        `;

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

                <p><b>Student ID:</b> ${student.id}</p>

                <p><b>Complete Name:</b> ${student.name}</p>

                <p><b>Course:</b> ${student.course}</p>

                <p><b>Department:</b> ${student.department}</p>

                <p><b>Year Level:</b> ${student.year}</p>

                <p><b>Email Address:</b> ${student.email}</p>

            </div>

        `;

    }


    // MY GRADES AND MANAGE GRADES
    else if (
        page === "My Grades" ||
        page === "Manage Grades"
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
  
