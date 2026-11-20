  
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
// DASHBOARD
// ==========================================

function dashboard() {

    if (currentRole === "student") {

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
                <h3>Manage Total Subjects</h3>

                <p>Update the number of your current subjects.</p>

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

                ${tasks.map(task => `
                    <p>
                        ${task.title} —
                        <span class="badge">${task.status}</span>
                    </p>
                `).join("")}

            </div>

            <div class="card">
                <h3>Upcoming Exams</h3>

                ${exams.map(exam => `
                    <p>
                        <b>${exam.subject}</b>
                       — ${formatExamDate(exam.date)}
                    </p>
                `).join("")}

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
                        Date: ${formatExamDate(exam.date)}<br>
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
                    <option value="${s.name}">
                        ${s.name}
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

            ${grades.map(g => `
                <p>
                    <b>${g.student}</b><br>
                    Subject: ${g.subject}<br>
                    Midterm: ${g.midterm}<br>
                    Final: ${g.final}<br>
                    Average: ${g.average}<br>
                    Remarks: ${g.remarks}
                </p>
                <hr>
            `).join("")}

        </div>

    `;

    document.getElementById("saveGradeBtn")
        .addEventListener("click", function() {

            const selectedStudent =
                document.getElementById("gradeStudent").value;

            const subject =
                document.getElementById("gradeSubject").value.trim();

            const midterm =
                Number(document.getElementById("midtermGrade").value);

            const final =
                Number(document.getElementById("finalGrade").value);

            if (
                !selectedStudent ||
                !subject ||
                !document.getElementById("midtermGrade").value ||
                !document.getElementById("finalGrade").value
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


  
