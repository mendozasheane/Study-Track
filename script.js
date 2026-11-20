  
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
let student = {
    name: "Sheane Mendoza",
    id: "2026-0001",
    course: "BS Information Technology",
    department: "College of Computer Studies",
    year: "First Year",
    email: "sheane@example.com"
};


// TASK RECORDS
let tasks = JSON.parse(
    localStorage.getItem("studyTrackTasks")
) || [];

function saveTasks() {
    localStorage.setItem(
        "studyTrackTasks",
        JSON.stringify(tasks)
    );
}


// GRADE RECORDS
let grades = JSON.parse(
    localStorage.getItem("studyTrackGrades")
) || [];

function saveGrades() {
    localStorage.setItem(
        "studyTrackGrades",
        JSON.stringify(grades)
    );
}
const defaultStudents = [
    {
        id: "2026-0001",
        name: "Sheane Mendoza",
        course: "BSIT",
        section: "BSIT-1A",
        year: "First Year",
        email: "sheane@example.com"
    },
    {
        id: "2026-0002",
        name: "Mark Reyes",
        course: "BSIT",
        section: "BSIT-1B",
        year: "First Year",
        email: "mark@example.com"
    },
    {
        id: "2026-0003",
        name: "John Cruz",
        course: "BSIS",
        section: "BSIS-1A",
        year: "First Year",
        email: "john@example.com"
    }
];

let studentsList = JSON.parse(
    localStorage.getItem("studyTrackStudents")
) || defaultStudents;

let sections = JSON.parse(
    localStorage.getItem("studyTrackSections")
) || ["BSIT-1A", "BSIT-1B", "BSIS-1A", "BSIS-1B"];

let editingExamIndex = null;

function saveStudentRecords() {
    localStorage.setItem(
        "studyTrackStudents",
        JSON.stringify(studentsList)
    );
}

function saveSections() {
    localStorage.setItem(
        "studyTrackSections",
        JSON.stringify(sections)
    );
}

function saveExamSchedules() {
    localStorage.setItem(
        "studyTrackExams",
        JSON.stringify(exams)
    );
}

function getAvailableSections() {
    return [...new Set([
        ...sections,
        ...studentsList.map(s => s.section).filter(Boolean)
    ])].sort();
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[character]));
}

function formatExamDate(dateString) {
    if (!dateString) return "Not specified";

    const [year, month, day] = dateString.split("-");

    const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    );

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

 // ==========================================
 // STUDENT ACCOUNTS
 // ==========================================

let studentAccounts = JSON.parse(
    localStorage.getItem("studentAccounts")
) || [
    {
        id: "2026-0001",
        name: "Sheane Mendoza",
        username: "student",
        password: "student123"
    }
];

function saveStudentAccounts() {
    localStorage.setItem(
        "studentAccounts",
        JSON.stringify(studentAccounts)
    );
}


let totalSubjects = 8;


const defaultExams = [
    {
        subject: "Contemporary",
        section: "All Sections",
        date: "2026-11-18",
        time: "",
        room: ""
    },
    {
        subject: "Fundamentals",
        section: "All Sections",
        date: "2026-11-22",
        time: "",
        room: ""
    }
];

let exams = JSON.parse(
    localStorage.getItem("studyTrackExams")
) || defaultExams;


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

    // TEACHER STUDENT LIST SECTIONS
    if (currentRole === "teacher") {

        const sectionTitle = document.createElement("p");
        sectionTitle.className = "sidebar-section-title";
        sectionTitle.textContent = "STUDENT LIST";

        navigation.appendChild(sectionTitle);

        const activeSection = heading.textContent.startsWith("Student List: ")
            ? heading.textContent.replace("Student List: ", "")
            : "";

       getAvailableSections().forEach(section => {

    const sectionWrapper = document.createElement("div");
    sectionWrapper.className = "section-menu-item";

    const sectionButton = document.createElement("button");
    sectionButton.className = "nav-link section-nav-link";
    sectionButton.textContent = section;

    sectionButton.addEventListener("click", function() {
        showSectionStudents(section);
        sidebar.classList.remove("open");
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-section-btn";
    deleteButton.textContent = "×";
    deleteButton.title = "Delete Section";

    deleteButton.addEventListener("click", function() {

        const hasStudents = studentsList.some(
            s => s.section === section
        );

        if (hasStudents) {
            alert(
                "This section still has students. Move the students to another section first."
            );
            return;
        }

        if (!confirm(`Delete section ${section}?`)) return;

        sections = sections.filter(s => s !== section);

        saveSections();
        showMenu();

    });

    sectionWrapper.appendChild(sectionButton);
    sectionWrapper.appendChild(deleteButton);

    navigation.appendChild(sectionWrapper);

});

        // ADD SECTION BUTTON
        const addSectionButton = document.createElement("button");

        addSectionButton.type = "button";
        addSectionButton.className = "add-section-link";
        addSectionButton.textContent = "+ Add Section";

        addSectionButton.addEventListener("click", function() {

            const newSection = prompt(
                "Enter section name (example: BSIT-2A):"
            );

            if (!newSection || !newSection.trim()) return;

            const cleanSection = newSection.trim().toUpperCase();

            const alreadyExists = getAvailableSections().some(
                section => section.toUpperCase() === cleanSection
            );

            if (alreadyExists) {
                alert("This section already exists.");
                return;
            }

            sections.push(cleanSection);

            saveSections();
            showMenu();

        });

        navigation.appendChild(addSectionButton);

    }

}


// ==========================================
// SHOW STUDENTS BY SECTION
// ==========================================

function showSectionStudents(section) {

    const sectionStudents = studentsList.filter(
        s => s.section === section
    );

    heading.textContent = "Student List: " + section;

    content.innerHTML = `

        <div class="card">

            <div class="section-page-heading">

                <div>
                    <h3>${escapeHTML(section)}</h3>
                    <p>Students enrolled in this section.</p>
                </div>

                <span class="count-badge">
                    ${sectionStudents.length} Student(s)
                </span>

            </div>

            ${
                sectionStudents.length > 0
                ? `

                    <div class="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Complete Name</th>
                                    <th>Course</th>
                                    <th>Year Level</th>
                                    <th>Email Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                ${sectionStudents.map(s => {

                                    const realIndex = studentsList.indexOf(s);

                                    return `

                                        <tr>
                                            <td>${escapeHTML(s.id)}</td>
                                            <td>${escapeHTML(s.name)}</td>
                                            <td>${escapeHTML(s.course)}</td>
                                            <td>${escapeHTML(s.year)}</td>
                                            <td>${escapeHTML(s.email)}</td>

                                            <td>
                                                <button
                                                    class="btn btn-danger delete-student"
                                                    data-index="${realIndex}">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    `;

                                }).join("")}

                            </tbody>

                        </table>

                    </div>

                `
                : `
                    <p class="empty-message">
                        No students in this section yet.
                        Add students through Manage Students.
                    </p>
                `
            }

        </div>

    `;

    // DELETE STUDENT
    document.querySelectorAll(".delete-student").forEach(button => {

        button.addEventListener("click", function() {

            const index = Number(this.dataset.index);
            const removedStudent = studentsList[index];

            if (!removedStudent) return;

            if (!confirm(
                `Delete ${removedStudent.name} from ${section}?`
            )) return;

            studentsList.splice(index, 1);

            saveStudentRecords();

            studentAccounts = studentAccounts.filter(
                account => account.id !== removedStudent.id
            );

            saveStudentAccounts();

            grades = grades.filter(
                grade => grade.student !== removedStudent.name
            );

            alert("Student record deleted.");

            showSectionStudents(section);
            showMenu();

        });

    });

    showMenu();

}


// ==========================================
// DASHBOARD WITH FILTERING
// ==========================================

function dashboard() {

    // LOCAL DATE
    const today = new Date();
    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    // ======================================
    // STUDENT DASHBOARD
    // ======================================

    if (currentRole === "student") {

        let taskFilter = "All";
        let examFilter = "All";

        const currentStudent = studentsList.find(
            s => s.id === student.id
        );

        const studentSection = currentStudent?.section || "";

        const studentTasks = tasks.filter(
            task => task.section === studentSection
        );

        function renderStudentDashboard() {

            const pendingTasks = studentTasks.filter(task =>
                !(task.submissions || []).some(
                    sub => sub.studentId === student.id
                )
            );

            const completedTasks = studentTasks.filter(task =>
                (task.submissions || []).some(
                    sub => sub.studentId === student.id
                )
            );

            let displayedTasks = studentTasks;

            if (taskFilter === "Pending") {
                displayedTasks = pendingTasks;
            } else if (taskFilter === "Completed") {
                displayedTasks = completedTasks;
            }

            let displayedExams = exams;

            if (examFilter === "Upcoming") {
                displayedExams = exams.filter(
                    exam => exam.date >= todayString
                );
            }

            content.innerHTML = `

                <div class="welcome">
                    <h2>Welcome back, ${escapeHTML(student.name)}!</h2>
                    <p>
                        Manage your academic tasks, monitor your grades,
                        and stay updated with your study schedule.
                    </p>
                </div>

                <div class="grid">

                    <div class="stat">
                        <small>Overall Average</small>
                        <strong>1.75</strong>
                    </div>

                    <div class="stat">
                        <small>Total Tasks</small>
                        <strong>${studentTasks.length}</strong>
                    </div>

                    <div class="stat">
                        <small>Pending Tasks</small>
                        <strong>${pendingTasks.length}</strong>
                    </div>

                    <div class="stat">
                        <small>Total Subjects</small>
                        <strong>${totalSubjects}</strong>
                    </div>

                </div>

                <div class="card">

                    <h3>Manage Total Subjects</h3>
                    <p>Update your current number of subjects.</p>

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

                <div class="card">

                    <h3>Recent Tasks</h3>
                    <p>Your assigned activities</p>

                    <label>Filter by Status</label>

                    <select id="studentTaskFilter">
                        <option value="All">All Tasks</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <div class="dashboard-records">

                        ${
                            displayedTasks.length > 0
                            ? displayedTasks.map(task => {

                                const submitted = (task.submissions || []).some(
                                    sub => sub.studentId === student.id
                                );

                                return `
                                    <div class="dashboard-item">
                                        <b>${escapeHTML(task.title)}</b>
                                        <p>Subject: ${escapeHTML(task.subject)}</p>
                                        <p>Due Date: ${escapeHTML(task.dueDate)}</p>

                                        <span class="${submitted ? "task-completed" : "task-pending"}">
                                            ${submitted ? "Completed" : "Pending"}
                                        </span>
                                    </div>
                                `;

                            }).join("")
                            : `<p class="empty-message">No tasks found.</p>`
                        }

                    </div>

                </div>

                <div class="card">

                    <h3>Upcoming Exams</h3>
                    <p>Your scheduled examinations</p>

                    <label>Filter Exams</label>

                    <select id="studentExamFilter">
                        <option value="All">All Exams</option>
                        <option value="Upcoming">Upcoming Exams</option>
                    </select>

                    <div class="dashboard-records">

                        ${
                            displayedExams.length > 0
                            ? displayedExams.map(exam => `
                                <div class="dashboard-item">
                                    <b>${escapeHTML(exam.subject)}</b>
                                    <p>Date: ${formatExamDate(exam.date)}</p>
                                    <p>Time: ${escapeHTML(exam.time || "Not specified")}</p>
                                </div>
                            `).join("")
                            : `<p class="empty-message">No exams found.</p>`
                        }

                    </div>

                </div>

            `;

            // KEEP SELECTED FILTER VALUES
            document.getElementById("studentTaskFilter").value = taskFilter;
            document.getElementById("studentExamFilter").value = examFilter;

            // TASK FILTER
            document.getElementById("studentTaskFilter")
                .addEventListener("change", function() {
                    taskFilter = this.value;
                    renderStudentDashboard();
                });

            // EXAM FILTER
            document.getElementById("studentExamFilter")
                .addEventListener("change", function() {
                    examFilter = this.value;
                    renderStudentDashboard();
                });

            // SAVE TOTAL SUBJECTS
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

                    renderStudentDashboard();
                });

        }

        renderStudentDashboard();

    }

    // ======================================
    // TEACHER DASHBOARD
    // ======================================

    else {

        let sectionFilter = "All Sections";
        let createdTaskFilter = "All";

        function renderTeacherDashboard() {

            const filteredStudents = sectionFilter === "All Sections"
                ? studentsList
                : studentsList.filter(
                    s => s.section === sectionFilter
                );

            const studentNames = filteredStudents.map(s => s.name);

            const filteredGrades = grades.filter(
                g => studentNames.includes(g.student)
            );

            const filteredTasks = sectionFilter === "All Sections"
                ? tasks
                : tasks.filter(
                    task => task.section === sectionFilter
                );

            const totalSubmissions = filteredTasks.reduce(
                (total, task) =>
                    total + (task.submissions?.length || 0),
                0
            );

            let displayedTasks = filteredTasks;

            if (createdTaskFilter === "With Submissions") {
                displayedTasks = filteredTasks.filter(
                    task => (task.submissions || []).length > 0
                );
            } else if (createdTaskFilter === "No Submissions") {
                displayedTasks = filteredTasks.filter(
                    task => (task.submissions || []).length === 0
                );
            }

            content.innerHTML = `

                <div class="welcome">
                    <h2>Welcome, Teacher!</h2>
                    <p>
                        Manage student records, monitor academic grades,
                        assign activities, and share important announcements.
                    </p>
                </div>

                <div class="card dashboard-filter-card">

                    <label>Filter Dashboard by Section</label>

                    <select id="teacherSectionFilter">

                        <option value="All Sections">All Sections</option>

                        ${getAvailableSections().map(section => `
                            <option value="${escapeHTML(section)}">
                                ${escapeHTML(section)}
                            </option>
                        `).join("")}

                    </select>

                </div>

                <div class="grid">

                    <div class="stat">
                        <small>Total Students</small>
                        <strong>${filteredStudents.length}</strong>
                    </div>

                    <div class="stat">
                        <small>Grade Records</small>
                        <strong>${filteredGrades.length}</strong>
                    </div>

                    <div class="stat">
                        <small>Created Tasks</small>
                        <strong>${filteredTasks.length}</strong>
                    </div>

                    <div class="stat">
                        <small>Submissions</small>
                        <strong>${totalSubmissions}</strong>
                    </div>

                </div>

                <div class="card">

                    <h3>Recent Announcements</h3>
                    <p>Latest class updates</p>

                    ${
                        announcements.length > 0
                        ? announcements.slice(-3).reverse().map(a => `
                            <div class="dashboard-item">
                                ${escapeHTML(a)}
                            </div>
                        `).join("")
                        : `<p class="empty-message">No announcements yet.</p>`
                    }

                </div>

                <div class="card">

                    <h3>Recent Created Tasks</h3>
                    <p>Activities assigned to students</p>

                    <label>Filter Tasks</label>

                    <select id="teacherTaskFilter">
                        <option value="All">All Tasks</option>
                        <option value="With Submissions">With Submissions</option>
                        <option value="No Submissions">No Submissions</option>
                    </select>

                    <div class="dashboard-records">

                        ${
                            displayedTasks.length > 0
                            ? displayedTasks.slice().reverse().map(task => `
                                <div class="dashboard-item">

                                    <b>${escapeHTML(task.title)}</b>

                                    <p>Subject: ${escapeHTML(task.subject)}</p>
                                    <p>Section: ${escapeHTML(task.section)}</p>

                                    <p>
                                        ${task.submissions?.length || 0}
                                        Student Submission(s)
                                    </p>

                                </div>
                            `).join("")
                            : `<p class="empty-message">No tasks found.</p>`
                        }

                    </div>

                </div>

            `;

            // KEEP SELECTED FILTER VALUES
            document.getElementById("teacherSectionFilter").value =
                sectionFilter;

            document.getElementById("teacherTaskFilter").value =
                createdTaskFilter;

            // SECTION FILTER
            document.getElementById("teacherSectionFilter")
                .addEventListener("change", function() {
                    sectionFilter = this.value;
                    renderTeacherDashboard();
                });

            // CREATED TASK FILTER
            document.getElementById("teacherTaskFilter")
                .addEventListener("change", function() {
                    createdTaskFilter = this.value;
                    renderTeacherDashboard();
                });

        }

        renderTeacherDashboard();

    }

}

    // ==================================
    // TEACHER DASHBOARD
    // ==================================
    else {

        const totalStudents = studentsList.length;

        const totalSubmissions = tasks.reduce(
            (total, task) => total + (task.submissions?.length || 0),
            0
        );

        content.innerHTML = `

            <div class="dashboard-welcome teacher-welcome">
                <div>
                    <span class="dashboard-label">TEACHER PORTAL</span>
                    <h2>Welcome, Teacher!</h2>
                    <p>
                        Manage student records, monitor academic grades,
                        assign activities, and share important announcements.
                    </p>
                </div>
                <div class="welcome-icon">👨‍🏫</div>
            </div>

            <div class="dashboard-stats">

                <div class="dashboard-stat">
                    <div class="stat-icon">👨‍🎓</div>
                    <div>
                        <small>Total Students</small>
                        <strong>${totalStudents}</strong>
                        <span>Registered Students</span>
                    </div>
                </div>

                <div class="dashboard-stat">
                    <div class="stat-icon">📊</div>
                    <div>
                        <small>Grade Records</small>
                        <strong>${grades.length}</strong>
                        <span>Recorded Grades</span>
                    </div>
                </div>

                <div class="dashboard-stat">
                    <div class="stat-icon">📝</div>
                    <div>
                        <small>Created Tasks</small>
                        <strong>${tasks.length}</strong>
                        <span>Assigned Activities</span>
                    </div>
                </div>

                <div class="dashboard-stat">
                    <div class="stat-icon">📤</div>
                    <div>
                        <small>Submissions</small>
                        <strong>${totalSubmissions}</strong>
                        <span>Student Submissions</span>
                    </div>
                </div>

            </div>

            <div class="dashboard-columns">

                <div class="dashboard-panel">
                    <div class="dashboard-panel-heading">
                        <div>
                            <h3>Recent Announcements</h3>
                            <p>Latest class updates</p>
                        </div>
                        <span class="panel-icon">📢</span>
                    </div>

                    <div class="dashboard-list">
                        ${
                            announcements.length > 0
                            ? announcements.slice(-5).reverse().map(a => `
                                <div class="dashboard-list-item announcement-item">
                                    <strong>${escapeHTML(a)}</strong>
                                </div>
                            `).join("")
                            : `<p class="empty-message">No announcements yet.</p>`
                        }
                    </div>
                </div>

                <div class="dashboard-panel">
                    <div class="dashboard-panel-heading">
                        <div>
                            <h3>Recent Created Tasks</h3>
                            <p>Activities assigned to students</p>
                        </div>
                        <span class="panel-icon">📋</span>
                    </div>

                    <div class="dashboard-list">
                        ${
                            tasks.length > 0
                            ? tasks.slice(-5).reverse().map(task => `
                                <div class="dashboard-list-item">
                                    <div>
                                        <strong>${escapeHTML(task.title)}</strong>
                                        <small>
                                            ${escapeHTML(task.subject)} ·
                                            ${escapeHTML(task.section)}
                                        </small>
                                    </div>
                                    <span class="exam-date-badge">
                                        ${task.submissions?.length || 0} Submitted
                                    </span>
                                </div>
                            `).join("")
                            : `<p class="empty-message">No tasks created yet.</p>`
                        }
                    </div>
                </div>

            </div>

        `;

    }

}




// ==========================================
 // SHOW PAGE
 // ==========================================

function showPage(page) {

    heading.textContent = page;
  if (page === "Register") {
    sidebar.style.display = "none";
} else {
    sidebar.style.display = "";
}
  
// STUDENT REGISTRATION
if (page === "Register") {

    content.innerHTML = `
        <div class="card">

            <h3>Student Registration</h3>

            <label>Student ID</label>
            <input id="registerID" placeholder="Enter Student ID">

            <label>Complete Name</label>
            <input id="registerName" placeholder="Enter Complete Name">

            <label>Username</label>
            <input id="registerUsername" placeholder="Create Username">

            <label>Password</label>
            <input type="password" id="registerPassword"
                placeholder="Create Password">

            <button type="button" class="btn" id="registerBtn">
                Register Account
            </button>

            <button type="button" class="btn" id="backToLogin">
                Back to Login
            </button>

            <p id="registerMessage"></p>

        </div>
    `;

    // REGISTER BUTTON
    document.getElementById("registerBtn")
        .addEventListener("click", function() {

            const id = document.getElementById("registerID").value.trim();
            const name = document.getElementById("registerName").value.trim();
            const username = document.getElementById("registerUsername").value.trim();
            const password = document.getElementById("registerPassword").value;

            if (!id || !name || !username || !password) {
                alert("Please complete all fields.");
                return;
            }

            const existingID = studentAccounts.some(
                s => s.id === id
            );

            const existingUsername = studentAccounts.some(
                s => s.username.toLowerCase() === username.toLowerCase()
            );

            if (existingID || existingUsername) {
                alert("Student ID or Username already exists.");
                return;
            }

            const registeredStudent = studentsList.find(
                s => s.id === id
            );

            if (!registeredStudent) {
                alert("Please ask your teacher to add your Student ID first.");
                return;
            }

            if (registeredStudent.name.toLowerCase() !== name.toLowerCase()) {
                alert("Your name does not match the student record.");
                return;
            }

           studentAccounts.push({
    id: id,
    name: registeredStudent.name,
    username: username.toLowerCase(),
    password: password
});

saveStudentAccounts();

            alert("Registration successful! You can now log in.");

            appLayout.style.display = "none";
            loginPage.style.display = "flex";

            loginForm.reset();
            loginError.textContent = "";
        });

    // BACK TO LOGIN BUTTON
document.getElementById("backToLogin")
    .addEventListener("click", function() {

        alert("Back button clicked!");

        showPage("Dashboard");

        appLayout.style.display = "none";
        loginPage.style.display = "flex";

        loginForm.reset();
        loginError.textContent = "";

        currentRole = "student";

    });

}

    // DASHBOARD
    else if (page === "Dashboard") {
        dashboard();
    }

    // MY PROFILE
else if (page === "My Profile") {

    // STUDENT MY PROFILE
    if (currentRole === "student") {

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

                <button class="btn" id="saveProfileBtn">
                    Save Changes
                </button>
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

    else {

    let teacherProfile = JSON.parse(
        localStorage.getItem("studyTrackTeacherProfile")
    ) || {
        id: "T-2026-001",
        name: "Juan Dela Cruz",
        department: "College of Computer Studies",
        email: "teacher@example.com"
    };

    content.innerHTML = `
        <div class="card">
            <h3>My Profile</h3>

            <label>Teacher ID</label>
            <input value="${teacherProfile.id}" disabled>

            <label>Complete Name</label>
            <input id="teacherName"
                value="${escapeHTML(teacherProfile.name)}" disabled>

            <label>Department</label>
            <input id="teacherDepartment"
                value="${escapeHTML(teacherProfile.department)}" disabled>

            <label>Email Address</label>
            <input type="email" id="teacherEmail"
                value="${escapeHTML(teacherProfile.email)}" disabled>

            <button class="btn" id="editTeacherBtn">
                Edit Profile
            </button>

            <button class="btn" id="saveTeacherBtn" style="display:none;">
                Save Changes
            </button>
        </div>
    `;

    document.getElementById("editTeacherBtn")
        .addEventListener("click", function() {

            document.getElementById("teacherName").disabled = false;
            document.getElementById("teacherDepartment").disabled = false;
            document.getElementById("teacherEmail").disabled = false;

            this.style.display = "none";
            document.getElementById("saveTeacherBtn").style.display = "inline-block";
        });

    document.getElementById("saveTeacherBtn")
        .addEventListener("click", function() {

            teacherProfile.name = document.getElementById("teacherName").value.trim();
            teacherProfile.department = document.getElementById("teacherDepartment").value.trim();
            teacherProfile.email = document.getElementById("teacherEmail").value.trim();

            if (!teacherProfile.name || !teacherProfile.department || !teacherProfile.email) {
                alert("Please complete all fields.");
                return;
            }

            localStorage.setItem(
                "studyTrackTeacherProfile",
                JSON.stringify(teacherProfile)
            );

                        alert("Teacher profile updated successfully!");

            showPage("My Profile");
        });

    }

} 

// MY GRADES
else if (page === "My Grades") {

    const visibleGrades = grades.filter(
        g => g.student === student.name
    );

    content.innerHTML = `
        <div class="card">
            <h3>My Grades</h3>
            <p>View your recorded academic grades.</p>

            ${
                visibleGrades.length > 0
                ? `
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Midterm</th>
                                    <th>Final</th>
                                    <th>Average</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${visibleGrades.map(g => `
                                    <tr>
                                        <td>${escapeHTML(g.subject)}</td>
                                        <td>${g.midterm}</td>
                                        <td>${g.final}</td>
                                        <td>${g.average}</td>
                                        <td>${escapeHTML(g.remarks)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                `
                : `
                    <div class="empty-message">
                        <h3>No Grades Available</h3>
                        <p>
                            Your grades will appear here once
                            your teacher has recorded them.
                        </p>
                    </div>
                `
            }
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

    // MY TASK / MANAGE TASKS
else if (page === "My Task" || page === "Manage Tasks") {

    // ==================================
    // TEACHER VIEW
    // ==================================
    if (currentRole === "teacher") {

        content.innerHTML = `
            <div class="card">
                <h3>Manage Student Tasks</h3>
                <p>Create activities and assign them to students.</p>

                <label>Task Title</label>
                <input id="taskTitle" placeholder="Enter task title">

                <label>Subject</label>
                <input id="taskSubject" placeholder="Enter subject">

                <label>Description</label>
                <textarea id="taskDescription"
                    placeholder="Enter task instructions"></textarea>

                <label>Assigned Section</label>
                <select id="taskSection">
                    <option value="">Select Section</option>
                    ${getAvailableSections().map(section => `
                        <option value="${escapeHTML(section)}">
                            ${escapeHTML(section)}
                        </option>
                    `).join("")}
                </select>

                <label>Due Date</label>
                <input type="date" id="taskDueDate">

                <button class="btn" id="addTaskBtn">
                    Add Task
                </button>
            </div>

            <div class="card">
                <h3>Created Tasks</h3>

                ${tasks.length === 0
                    ? `<p class="empty-message">No tasks created yet.</p>`
                    : tasks.map((task, index) => `
                        <div class="task-card">
                            <h3>${escapeHTML(task.title)}</h3>
                            <p><b>Subject:</b> ${escapeHTML(task.subject)}</p>
                            <p><b>Description:</b> ${escapeHTML(task.description)}</p>
                            <p><b>Section:</b> ${escapeHTML(task.section)}</p>
                            <p><b>Due Date:</b> ${escapeHTML(task.dueDate)}</p>

                            <p>
                                <b>Submitted:</b>
                                ${task.submissions?.length || 0}
                            </p>

                            <button class="btn btn-danger delete-task"
                                data-index="${index}">
                                Delete Task
                            </button>

                            <h4>Student Submissions</h4>

                            ${
                                task.submissions?.length
                                ? task.submissions.map(sub => `
                                    <div class="submission-box">
                                        <p><b>Student:</b>
                                            ${escapeHTML(sub.studentName)}
                                        </p>
                                        <p><b>Student ID:</b>
                                            ${escapeHTML(sub.studentId)}
                                        </p>
                                        <p><b>File:</b>
                                            ${escapeHTML(sub.fileName)}
                                        </p>
                                        <p><b>Status:</b>
                                            <span class="task-completed">Completed</span>
                                        </p>
                                        <a href="${sub.fileData}"
                                            download="${escapeHTML(sub.fileName)}">
                                            Download Submitted File
                                        </a>
                                    </div>
                                `).join("")
                                : `<p class="empty-message">No submissions yet.</p>`
                            }
                        </div>
                    `).join("")
                }
            </div>
        `;

        // ADD TASK
        document.getElementById("addTaskBtn")
            .addEventListener("click", function() {

                const title = document.getElementById("taskTitle").value.trim();
                const subject = document.getElementById("taskSubject").value.trim();
                const description = document.getElementById("taskDescription").value.trim();
                const section = document.getElementById("taskSection").value;
                const dueDate = document.getElementById("taskDueDate").value;

                if (!title || !subject || !description || !section || !dueDate) {
                    alert("Please complete all task information.");
                    return;
                }

                tasks.push({
                    id: Date.now(),
                    title,
                    subject,
                    description,
                    section,
                    dueDate,
                    submissions: []
                });

                saveTasks();

                alert("Task added successfully!");

                showPage("Manage Tasks");
            });

        // DELETE TASK
        document.querySelectorAll(".delete-task")
            .forEach(button => {

                button.addEventListener("click", function() {

                    const index = Number(this.dataset.index);

                    if (!confirm("Are you sure you want to delete this task?")) {
                        return;
                    }

                    tasks.splice(index, 1);
                    saveTasks();

                    showPage("Manage Tasks");
                });

            });

    }

    // ==================================
    // STUDENT VIEW
    // ==================================
    else {

        const currentStudent = studentsList.find(
            s => s.id === student.id
        );

        const studentSection = currentStudent?.section || "";

        const studentTasks = tasks.filter(
            task => task.section === studentSection
        );

        content.innerHTML = `
            <div class="card">
                <h3>My Tasks</h3>
                <p>Activities assigned by your teacher.</p>

                ${
                    studentTasks.length === 0
                    ? `<p class="empty-message">No tasks assigned to your section yet.</p>`
                    : studentTasks.map(task => {

                        const submission = (task.submissions || []).find(
                            sub => sub.studentId === student.id
                        );

                        return `
                            <div class="task-card">

                                <h3>${escapeHTML(task.title)}</h3>

                                <p><b>Subject:</b> ${escapeHTML(task.subject)}</p>

                                <p><b>Description:</b> ${escapeHTML(task.description)}</p>

                                <p><b>Due Date:</b> ${escapeHTML(task.dueDate)}</p>

                                ${
                                    submission
                                    ? `
                                        <span class="task-completed">Completed</span>
                                        <p>Submitted File: ${escapeHTML(submission.fileName)}</p>
                                        <p>Successfully submitted.</p>
                                    `
                                    : `
                                        <span class="task-pending">Pending</span>

                                        <label>Upload Your Answer</label>
                                        <input
                                            type="file"
                                            class="task-file"
                                            data-task-id="${task.id}"
                                            accept=".pdf,.doc,.docx"
                                        >

                                        <button
                                            class="btn submit-task"
                                            data-task-id="${task.id}">
                                            Submit Task
                                        </button>
                                    `
                                }

                            </div>
                        `;
                    }).join("")
                }
            </div>
        `;

        // SUBMIT TASK
        document.querySelectorAll(".submit-task")
            .forEach(button => {

                button.addEventListener("click", function() {

                    const taskId = Number(this.dataset.taskId);

                    const task = tasks.find(
                        t => t.id === taskId
                    );

                    if (!task) return;

                    const fileInput = document.querySelector(
                        `.task-file[data-task-id="${taskId}"]`
                    );

                    const file = fileInput?.files[0];

                    if (!file) {
                        alert("Please select a file first.");
                        return;
                    }

                    const allowedExtensions = ["pdf", "doc", "docx"];
                    const extension = file.name.split(".").pop().toLowerCase();

                    if (!allowedExtensions.includes(extension)) {
                        alert("Only PDF, DOC, and DOCX files are allowed.");
                        return;
                    }

                    // Limit prototype uploads to 1 MB
                    if (file.size > 1024 * 1024) {
                        alert("File is too large. Maximum file size is 1 MB.");
                        return;
                    }

                    const alreadySubmitted = (task.submissions || []).some(
                        sub => sub.studentId === student.id
                    );

                    if (alreadySubmitted) {
                        alert("You have already submitted this task.");
                        return;
                    }

                    const reader = new FileReader();

                    reader.onload = function() {

                        if (!task.submissions) {
                            task.submissions = [];
                        }

                        task.submissions.push({
                            studentId: student.id,
                            studentName: student.name,
                            fileName: file.name,
                            fileData: reader.result,
                            submittedAt: new Date().toISOString()
                        });

                        saveTasks();

                        alert("Task submitted successfully!");

                        showPage("My Task");
                    };

                    reader.onerror = function() {
                        alert("Unable to read the selected file.");
                    };

                    reader.readAsDataURL(file);

                });

            });

    }
}
    // EXAM PLANNER / EXAM SCHEDULE
else if (page === "Exam Planner" || page === "Exam Schedule") {

    // TEACHER VIEW
    if (currentRole === "teacher") {

        content.innerHTML = `
            <div class="card">
                <h3>Exam Schedule Management</h3>
                <p>Manage and delete completed examinations.</p>

                <div class="exam-container">
                    ${exams.length === 0
                        ? "<p>No scheduled exams.</p>"
                        : exams.map((exam, index) => `
                            <div class="exam-card">

                                <h3>${exam.subject}</h3>

                                <p>
                                    <b>Instructor:</b>
                                    ${exam.instructor || "Not specified"}
                                </p>

                                <p>
                                    <b>Date:</b>
                                    ${formatExamDate(exam.date)}
                                </p>

                                <p>
                                    <b>Time:</b>
                                    ${exam.time || "Not specified"}
                                </p>

                                <p>
                                    <b>Room:</b>
                                    ${exam.room || "Not specified"}
                                </p>

                                <button
                                    class="delete-exam-btn"
                                    data-index="${index}">
                                    Delete Exam
                                </button>

                            </div>
                        `).join("")
                    }
                </div>
            </div>
        `;

        document.querySelectorAll(".delete-exam-btn")
            .forEach(button => {

                button.addEventListener("click", function() {

                    const index = Number(this.dataset.index);

                    if (confirm("Are you sure you want to delete this exam?")) {

                        exams.splice(index, 1);

                        localStorage.setItem(
                            "studyTrackExams",
                            JSON.stringify(exams)
                        );

                        alert("Exam deleted successfully!");

                        showPage("Exam Schedule");
                    }

                });

            });

    }

    // STUDENT VIEW
    else {

        content.innerHTML = `
            <div class="card">
                <h3>Exam Planner</h3>

                <div class="exam-container">

                    ${exams.length === 0
                        ? "<p>No scheduled exams yet.</p>"
                        : exams.map(exam => `
                            <div class="exam-card">

                                <h3>${exam.subject}</h3>

                                <p>
                                    <b>Instructor:</b>
                                    ${exam.instructor || "Not specified"}
                                </p>

                                <p>
                                    <b>Date:</b>
                                    ${formatExamDate(exam.date)}
                                </p>

                                <p>
                                    <b>Time:</b>
                                    ${exam.time || "Not specified"}
                                </p>

                                <p>
                                    <b>Room:</b>
                                    ${exam.room || "Not specified"}
                                </p>

                            </div>
                        `).join("")
                    }

                </div>
            </div>
        `;
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

// ==========================================
// MANAGE STUDENTS
// ==========================================

else if (page === "Manage Students") {

    content.innerHTML = `

        <div class="card">

            <h3>Add New Student</h3>

            <label>Student ID</label>
            <input id="newStudentID" placeholder="Enter Student ID">

            <label>Complete Name</label>
            <input id="newStudentName" placeholder="Enter complete name">

            <label>Course</label>
            <select id="newStudentCourse">
                <option value="">Select Course</option>
                <option value="BSIT">BSIT</option>
                <option value="BSIS">BSIS</option>
            </select>

            <label>Section</label>
            <select id="newStudentSection">
                <option value="">Select Section</option>
                ${getAvailableSections().map(section => `
                    <option value="${escapeHTML(section)}">
                        ${escapeHTML(section)}
                    </option>
                `).join("")}
            </select>

            <label>Year Level</label>
            <select id="newStudentYear">
                <option value="">Select Year Level</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Fourth Year">Fourth Year</option>
            </select>

            <label>Email Address</label>
            <input type="email" id="newStudentEmail"
                placeholder="Enter email address">

            <button class="btn" id="addStudentBtn">
                Add Student
            </button>

        </div>

        <div class="card">

            <h3>Student Records</h3>

            <div class="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Complete Name</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Year Level</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${studentsList.map(s => `
                            <tr>
                                <td>${escapeHTML(s.id)}</td>
                                <td>${escapeHTML(s.name)}</td>
                                <td>${escapeHTML(s.course)}</td>
                                <td>${escapeHTML(s.section)}</td>
                                <td>${escapeHTML(s.year)}</td>
                                <td>${escapeHTML(s.email)}</td>
                            </tr>
                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;


    // ADD STUDENT
    document.getElementById("addStudentBtn")
        .addEventListener("click", function() {

            const id = document.getElementById("newStudentID").value.trim();
            const name = document.getElementById("newStudentName").value.trim();
            const course = document.getElementById("newStudentCourse").value;
            const section = document.getElementById("newStudentSection").value;
            const year = document.getElementById("newStudentYear").value;
            const email = document.getElementById("newStudentEmail").value.trim();

            if (!id || !name || !course || !section || !year || !email) {
                alert("Please complete all student information.");
                return;
            }

            const existingStudent = studentsList.some(
                s => s.id === id
            );

            if (existingStudent) {
                alert("Student ID already exists.");
                return;
            }

            studentsList.push({
                id,
                name,
                course,
                section,
                year,
                email
            });

            saveStudentRecords();

            alert("Student added successfully!");

            showPage("Manage Students");

        });

}

// MANAGE GRADES
else if (page === "Manage Grades") {

    content.innerHTML = `

        <div class="card">

            <h3>Add Student Grades</h3>

            <label>Select Student</label>

            <select id="gradeStudent">

                ${studentsList.map(s => `
                    <option value="${escapeHTML(s.name)}">
                        ${escapeHTML(s.name)}
                    </option>
                `).join("")}

            </select>

            <label>Subject</label>
            <input id="gradeSubject" placeholder="Enter subject">

            <label>Midterm Grade</label>
            <input type="number" id="midtermGrade"
                step="0.01" min="1" max="5">

            <label>Final Grade</label>
            <input type="number" id="finalGrade"
                step="0.01" min="1" max="5">

            <button class="btn" id="saveGradeBtn">
                Save Grade
            </button>

        </div>

        <div class="card">

            <h3>Grade Records</h3>

            <label>Filter by Section</label>

            <select id="gradeSectionFilter">

                <option value="All Sections">All Sections</option>

                ${getAvailableSections().map(section => `
                    <option value="${escapeHTML(section)}">
                        ${escapeHTML(section)}
                    </option>
                `).join("")}

            </select>

            <div id="gradeRecordsContainer"></div>

        </div>

    `;

    // DISPLAY GRADE RECORDS
    function displayGradeRecords(sectionFilter) {

        const filteredGrades = grades.filter(g => {

            const studentRecord = studentsList.find(
                s => s.name === g.student
            );

            return sectionFilter === "All Sections" ||
                   studentRecord?.section === sectionFilter;

        });

        document.getElementById("gradeRecordsContainer").innerHTML =

            filteredGrades.length > 0

            ? filteredGrades.map(g => `
                <p>
                    <b>${escapeHTML(g.student)}</b><br>
                    Subject: ${escapeHTML(g.subject)}<br>
                    Midterm: ${g.midterm}<br>
                    Final: ${g.final}<br>
                    Average: ${g.average}<br>
                    Remarks: ${escapeHTML(g.remarks)}
                </p>
                <hr>
            `).join("")

            : `<p class="empty-message">
                No grade records for this section.
               </p>`;
    }

    // SHOW ALL GRADES
    displayGradeRecords("All Sections");

    // FILTER BY SECTION
    document.getElementById("gradeSectionFilter")
        .addEventListener("change", function() {

            displayGradeRecords(this.value);

        });

    // SAVE STUDENT GRADE
    document.getElementById("saveGradeBtn")
        .addEventListener("click", function() {

            const selectedStudent =
                document.getElementById("gradeStudent").value;

            const subject =
                document.getElementById("gradeSubject").value.trim();

            const midtermValue =
                document.getElementById("midtermGrade").value;

            const finalValue =
                document.getElementById("finalGrade").value;

            const midterm = Number(midtermValue);
            const final = Number(finalValue);

            if (
                !selectedStudent ||
                !subject ||
                !midtermValue ||
                !finalValue
            ) {
                alert("Please complete all grade information.");
                return;
            }

            if (
                midterm < 1 || midterm > 5 ||
                final < 1 || final > 5
            ) {
                alert("Grades must be between 1.00 and 5.00.");
                return;
            }

            const average = ((midterm + final) / 2).toFixed(2);

            const remarks = Number(average) <= 3
                ? "Passed"
                : "Failed";

            grades.push({
                student: selectedStudent,
                subject: subject,
                midterm: midterm.toFixed(2),
                final: final.toFixed(2),
                average: average,
                remarks: remarks
            });

            alert("Student grade saved successfully!");

            showPage("Manage Grades");

        });

}

   // ANNOUNCEMENTS
else if (page === "Announcements") {

    content.innerHTML = `

        <div class="card">
            <h3>Class Announcements</h3>

            ${currentRole === "teacher" ? `

                <label>Announcement</label>

                <textarea
                    id="announcement"
                    placeholder="Write your announcement here..."
                ></textarea>

                <button class="btn" id="postAnnouncementBtn">
                    Post Announcement
                </button>

            ` : `

                <p>
                    View the latest announcements posted by your teacher.
                </p>

            `}

        </div>

        <div class="card">

            <h3>Posted Announcements</h3>

            ${announcements.length > 0
                ? announcements.map(a => `<p>${a}</p>`).join("")
                : `<p class="empty-message">No announcements yet.</p>`
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
// POST ANNOUNCEMENT FUNCTION
// ==========================================

function postAnnouncement() {

    if (currentRole !== "teacher") {
        alert("Only teachers can post announcements.");
        return;
    }

    const input = document.getElementById("announcement");

    const message = input.value.trim();

    if (message === "") {
        alert("Please write an announcement.");
        return;
    }

    announcements.push(message);

    alert("Announcement posted successfully!");

    showPage("Announcements");

}


// ==========================================
// OPEN STUDENT REGISTRATION
// ==========================================

document.getElementById("registerLink")
    .addEventListener("click", function(e) {

        e.preventDefault();

        loginPage.style.display = "none";
        appLayout.style.display = "flex";

        currentRole = "student";

        showPage("Register");

    });


// ==========================================
// LOGIN FUNCTION
// ==========================================

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const selectedRole = loginRole.value;
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (!username || !password) {
        loginError.textContent = "Please enter your username and password.";
        return;
    }

    // STUDENT LOGIN
    if (selectedRole === "student") {

        const account = studentAccounts.find(s =>
            s.username.toLowerCase() === username.toLowerCase() &&
            s.password === password
        );

        if (!account) {
            loginError.textContent = "Invalid student username or password.";
            return;
        }

        currentRole = "student";

        student.id = account.id;
        student.name = account.name;

    }

    // TEACHER LOGIN
    else if (selectedRole === "teacher") {

        if (username === "teacher" && password === "teacher123") {
            currentRole = "teacher";
        } else {
            loginError.textContent = "Invalid teacher username or password.";
            return;
        }

    } else {

        loginError.textContent = "Please select a valid role.";
        return;

    }

    loginError.textContent = "";

    loginPage.style.display = "none";
    appLayout.style.display = "flex";

    portal.textContent = currentRole.toUpperCase() + " PORTAL";

// APPLY TEACHER DESIGN
appLayout.classList.toggle(
    "teacher-mode",
    currentRole === "teacher"
);

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


  
