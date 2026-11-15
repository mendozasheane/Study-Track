  
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
                <input value="${student.id}" disabled>

                <label>Complete Name</label>
                <input id="profileName" value="${student.name}">

                <label>Course</label>
                <input id="profileCourse" value="${student.course}">

                <label>Department</label>
                <input id="profileDepartment" value="${student.department}">

                <label>Year Level</label>
                <input id="profileYear" value="${student.year}">

                <label>Email Address</label>
                <input type="email" id="profileEmail" value="${student.email}">

                <button class="btn" id="saveProfileBtn">Save Changes</button>
            </div>
        `;

        document.getElementById("saveProfileBtn")
            .addEventListener("click", function() {

                student.name = document.getElementById("profileName").value.trim();
                student.course = document.getElementById("profileCourse").value.trim();
                student.department = document.getElementById("profileDepartment").value.trim();
                student.year = document.getElementById("profileYear").value.trim();
                student.email = document.getElementById("profileEmail").value.trim();

                if (!student.name || !student.course || !student.email) {
                    alert("Please complete the required information.");
                    return;
                }

                studentsList[0].name = student.name;
                grades.forEach(g => {
                    if (g.student === "Sheane Mendoza") {
                        g.student = student.name;
                    }
                });

                alert("Profile updated!");
                showPage("My Profile");
            });
    }

    // MY GRADES
    else if (page === "My Grades") {

        const visibleGrades = grades.filter(
            g => g.student === student.name
        );

        content.innerHTML = `
            <div class="card">
                <h3>My Grades</h3>

                <div class="table-container">
                    <table>
                        <tr>
                            <th>Subject</th>
                            <th>Midterm</th>
                            <th>Final</th>
                            <th>Average</th>
                            <th>Remarks</th>
                        </tr>

                        ${visibleGrades.map(g => `
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
                <p>Your academic performance is based on your recorded subject grades.</p>
                <p>Continue completing your academic requirements and preparing for examinations.</p>
            </div>
        `;
    }

    // MY TASK
    else if (page === "My Task") {

        content.innerHTML = `
            <div class="card">
                <h3>My Task</h3>

                ${tasks.map((task, index) => `
                    <div class="card">
                        <p><b>${task.title}</b> — ${task.status}</p>

                        ${task.status !== "Completed" ? `
                            <button class="btn complete-task" data-index="${index}">
                                Complete
                            </button>
                        ` : ""}

                        <button class="btn delete-task" data-index="${index}">
                            Delete
                        </button>
                    </div>
                `).join("")}

                <label>Add New Task</label>
                <input id="newTask" placeholder="Enter task name">
                <button class="btn" id="addTaskBtn">Add Task</button>
            </div>
        `;

        document.getElementById("addTaskBtn")
            .addEventListener("click", addTask);

        document.querySelectorAll(".complete-task").forEach(button => {
            button.addEventListener("click", function() {
                tasks[Number(this.dataset.index)].status = "Completed";
                showPage("My Task");
            });
        });

        document.querySelectorAll(".delete-task").forEach(button => {
            button.addEventListener("click", function() {
                tasks.splice(Number(this.dataset.index), 1);
                showPage("My Task");
            });
        });
    }

    // EXAM PLANNER / EXAM SCHEDULE
    else if (page === "Exam Planner" || page === "Exam Schedule") {

        content.innerHTML = `
            <div class="card">
                <h3>${page}</h3>

                ${exams.map(exam => `
                    <p>
                        <b>${exam.subject}</b><br>
                        Date: ${exam.date}<br>
                        Time: ${exam.time || "Not specified"}<br>
                        Room: ${exam.room || "Not specified"}
                    </p>
                    <hr>
                `).join("")}

                ${currentRole === "teacher" ? `
                    <h3>Add Exam Schedule</h3>

                    <label>Subject</label>
                    <input id="examSubject" placeholder="Enter subject">

                    <label>Exam Date</label>
                    <input type="date" id="examDate">

                    <label>Exam Time</label>
                    <input type="time" id="examTime">

                    <label>Room</label>
                    <input id="examRoom" placeholder="Enter room">

                    <button class="btn" id="addExamBtn">Add Exam</button>
                ` : ""}
            </div>
        `;

        if (currentRole === "teacher") {
            document.getElementById("addExamBtn")
                .addEventListener("click", function() {

                    const subject = document.getElementById("examSubject").value.trim();
                    const date = document.getElementById("examDate").value;
                    const time = document.getElementById("examTime").value;
                    const room = document.getElementById("examRoom").value.trim();

                    if (!subject || !date || !time || !room) {
                        alert("Please complete all exam details.");
                        return;
                    }

                    exams.push({ subject, date, time, room });
                    alert("Exam schedule added!");
                    showPage("Exam Schedule");
                });
        }
    }

    // STUDY PLANNER
    else if (page === "Study Planner") {

        content.innerHTML = `
            <div class="card">
                <h3>Study Planner</h3>

                <label>Subject</label>
                <input id="studySubject" placeholder="Enter subject">

                <label>Study Topic</label>
                <input id="studyTopic" placeholder="Enter study topic">

                <label>Study Date</label>
                <input type="date" id="studyDate">

                <label>Study Time</label>
                <input type="time" id="studyTime">

                <button class="btn" id="addStudyBtn">Add Study Plan</button>
            </div>

            <div class="card">
                <h3>My Study Schedule</h3>

                ${studyPlans.map((plan, index) => `
                    <div class="card">
                        <b>${plan.subject}</b>
                        <p>Topic: ${plan.topic}</p>
                        <p>Date: ${plan.date}</p>
                        <p>Time: ${plan.time}</p>
                        <p>Status: ${plan.status}</p>

                        <button class="btn complete-study" data-index="${index}">
                            Complete
                        </button>

                        <button class="btn delete-study" data-index="${index}">
                            Delete
                        </button>
                    </div>
                `).join("")}
            </div>
        `;

        document.getElementById("addStudyBtn")
            .addEventListener("click", function() {

                const subject = document.getElementById("studySubject").value.trim();
                const topic = document.getElementById("studyTopic").value.trim();
                const date = document.getElementById("studyDate").value;
                const time = document.getElementById("studyTime").value;

                if (!subject || !topic || !date || !time) {
                    alert("Please complete all fields.");
                    return;
                }

                studyPlans.push({
                    subject,
                    topic,
                    date,
                    time,
                    status: "Pending"
                });

                showPage("Study Planner");
            });

        document.querySelectorAll(".complete-study").forEach(button => {
            button.addEventListener("click", function() {
                studyPlans[Number(this.dataset.index)].status = "Completed";
                showPage("Study Planner");
            });
        });

        document.querySelectorAll(".delete-study").forEach(button => {
            button.addEventListener("click", function() {
                studyPlans.splice(Number(this.dataset.index), 1);
                showPage("Study Planner");
            });
        });
    }

    // MANAGE STUDENTS
    else if (page === "Manage Students") {

        content.innerHTML = `
            <div class="card">
                <h3>Add Student</h3>

                <label>Student ID</label>
                <input id="newStudentID" placeholder="Enter Student ID">

                <label>Complete Name</label>
                <input id="newStudentName" placeholder="Enter complete name">

                <label>Course</label>
                <input id="newStudentCourse" placeholder="Enter course">

                <label>Year Level</label>
                <input id="newStudentYear" placeholder="Enter year level">

                <label>Email Address</label>
                <input type="email" id="newStudentEmail" placeholder="Enter email">

                <button class="btn" id="addStudentBtn">Add Student</button>
            </div>

            <div class="card">
                <h3>Student List</h3>
                ${studentsList.map((s, index) => `
                    <p>${index + 1}. ${s.id} - ${s.name} (${s.course})</p>
                `).join("")}
            </div>
        `;

        document.getElementById("addStudentBtn")
            .addEventListener("click", function() {

                const id = document.getElementById("newStudentID").value.trim();
                const name = document.getElementById("newStudentName").value.trim();
                const course = document.getElementById("newStudentCourse").value.trim();
                const year = document.getElementById("newStudentYear").value.trim();
                const email = document.getElementById("newStudentEmail").value.trim();

                if (!id || !name || !course || !year || !email) {
                    alert("Please complete all student information.");
                    return;
                }

                studentsList.push({ id, name, course, year, email });
                alert("Student added!");
                showPage("Manage Students");
            });
    }

    // ANNOUNCEMENTS
    else if (page === "Announcements") {

        content.innerHTML = `
            <div class="card">
                <h3>Class Announcements</h3>

                ${currentRole === "teacher" ? `
                    <label>Announcement</label>
                    <textarea id="announcement" placeholder="Write announcement"></textarea>
                    <button class="btn" id="postAnnouncementBtn">Post Announcement</button>
                ` : ""}
            </div>

            <div class="card">
                <h3>Posted Announcements</h3>
                ${announcements.length > 0
                    ? announcements.map(a => <p>${a}</p>).join("")
                    : <p class="empty-message">No announcements yet.</p>
                }
            </div>
        `;

        if (currentRole === "teacher") {
            document.getElementById("postAnnouncementBtn")
                .addEventListener("click", postAnnouncement);
        }
    }

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
// LOGIN FUNCTION
// ==========================================

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const selectedRole = loginRole.value;
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (
        selectedRole === "student" &&
        username === "student" &&
        password === "student123"
    ) {
        currentRole = "student";
    }

    else if (
        selectedRole === "teacher" &&
        username === "teacher" &&
        password === "teacher123"
    ) {
        currentRole = "teacher";
    }

    else {
        loginError.textContent = "Invalid username or password.";
        return;
    }

    loginError.textContent = "";

    loginPage.style.display = "none";
    appLayout.style.display = "flex";

    portal.textContent =
        currentRole.toUpperCase() + " PORTAL";

    showPage("Dashboard");

});


// ==========================================
// LOGOUT FUNCTION
// ==========================================

btnLogout.addEventListener("click", function() {

    appLayout.style.display = "none";
    loginPage.style.display = "flex";

    loginForm.reset();

    loginError.textContent = "";

    portal.textContent = "WELCOME";

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


  
