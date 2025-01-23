
const user = JSON.parse(localStorage.getItem("signupData")) || [];
const admin = JSON.parse(sessionStorage.getItem("admin"))
if (!admin) window.location.href = "index.html"
// Populate the table
const tableBody = document.getElementById("userTableBody");
const div = document.createElement("div");
div.id = "centre";
const button = document.createElement("button");
button.innerText = "Logout";
button.id = "logout";
button.onclick = function logout() {
    sessionStorage.removeItem("admin");
    window.location.href = "index.html";
};
document.body.appendChild(div);
div.appendChild(button);

function loadData() {

    if (!user || user === undefined || user.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="9">No data found</td>`;
        tableBody.appendChild(row);
    } else {
        user.map((u, i) => {
            const row = document.createElement("tr");
            row.id = i;
            row.innerHTML = `
                  <td>${u?.firstname}</td>
                  <td>${u?.lastname}</td>
                  <td>${u?.email}</td>
                  <td>${u?.phone}</td>
                  <td>${u?.dob}</td>
                  <td>${u?.gender}</td>
                  <td>${u?.city}</td>
                  <td>${u?.hobbies}</td>
                  <td>${u?.skills?.join(", ")}</td>
                  <td>${u?.password}</td>
                  <td>
                   <button onclick="saveUser(${i})">Edit</button>
                   <button onclick="location.reload()">Cancel</button>
                  </td>
              `;
            tableBody.appendChild(row);
        });
    }
}
loadData();

function saveUser(i) {
    const cancel = document.getElementById("cancel")
    if (cancel) location.reload()
    const row = document.getElementById(i);
    const updateButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    updateButton.innerText = "Update";
    cancelButton.innerText = "Cancel";
    cancelButton.id = "cancel"

    const users = JSON.parse(localStorage.getItem("signupData")) || [];
    const email = users[i].email
    const user = users.find((u) => u.email === email);

    if (!user) {
        alert("User not found!");
        return;
    }
    // Replace row content with input fields
    row.innerHTML = `
            <td><input id="firstname" value="${user.firstname || ""}" /></td>
            <td><input id="lastname" value="${user.lastname || ""}" /></td>
            <td><input id="email" value="${user.email || ""}" /></td>
            <td><input id="phone" value="${user.phone || ""}" /></td>
            <td><input type="date" id="dob" value="${user.dob || ""}" /></td>
            <td>
                <label><input type="radio" name="gender" value="Male" ${user.gender === "Male" ? "checked" : ""} /> Male</label>
                <label><input type="radio" name="gender" value="Female" ${user.gender === "Female" ? "checked" : ""} /> Female</label>
                <label><input type="radio" name="gender" value="Other" ${user.gender === "Other" ? "checked" : ""} /> Other</label>
            </td>
            <td>
                <select id="city">
                    <option value="${user.city || ""}">${user.city || "Select City"}</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>s
                    <option value="Houston">Houston</option>
                    <option value="Miami">Miami</option>
                </select>
            </td>
            <td><textarea id="hobbies">${user.hobbies || ""}</textarea></td>
            <td><div class="skill-item">
            <input type="checkbox" id="skill1" ${user?.skills?.includes("HTML") === true ? "checked" : ""
        } name="skills" value="HTML" />
            <label for="skill1">HTML</label>
          </div>
          <div class="skill-item">
            <input type="checkbox" id="skill2" ${user?.skills?.includes("CSS") === true ? "checked" : ""
        } name="skills" value="CSS" />
            <label for="skill2">CSS</label>
          </div>
          <div class="skill-item">
            <input
              type="checkbox"
              id="skill3"
              name="skills"
              value="JavaScript"
              ${user?.skills?.includes("JavaScript") === true ? "checked" : ""}
            />
            <label for="skill3">JavaScript</label>
          </div>
          <div class="skill-item">
            <input type="checkbox" id="skill4" ${user?.skills?.includes("Python") === true ? "checked" : ""
        } name="skills" value="Python" />
            <label for="skill4">Python</label>
          </div>
          <div class="skill-item">
            <input type="checkbox" id="skill5" ${user?.skills?.includes("Java") === true ? "checked" : ""
        } name="skills" value="Java" />
            <label for="skill5">Java</label>
          </div>
          <div class="skill-item">
            <input type="checkbox" id="skill6" ${user?.skills?.includes("C++") === true ? "checked" : ""
        } name="skills" value="C++" />
            <label for="skill6">C++</label>
          </div></td>
            <td id="password" value="${user.password}">${user.password}</td>
        `;

    // Append action buttons
    row.appendChild(updateButton);
    row.appendChild(cancelButton);

    // Button functionality
    updateButton.onclick = () => {
        // Collect and update user data
        // const updatedUser = {
        //     firstname: document.getElementById("firstname").value,
        //     lastname: document.getElementById("lastname").value,
        //     email: document.getElementById("email").value,
        //     phone: document.getElementById("phone").value,
        //     dob: document.getElementById("dob").value,
        //     gender: document.querySelector('input[name="gender"]:checked').value,
        //     city: document.getElementById("city").value,
        //     hobbies: document.getElementById("hobbies").value,
        //     skills: user.skills,
        //     password: user.password,
        // };
        const updatedUser = updateHandle(i)
        updatedUser.password = user.password
        users[i] = updatedUser;
        localStorage.setItem("signupData", JSON.stringify(users));
        alert("User updated successfully!");
        location.reload();
    };

    cancelButton.onclick = () => location.reload();
}

function updateHandle(i) {

    const firstname = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const email = document.getElementById("email")
    const phone = document.getElementById("phone")
    const dob = document.getElementById("dob")
    const gender = document.getElementsByName("gender")
    const city = document.getElementById("city")
    const hobbies = document.getElementById("hobbies")
    const skills = document.getElementsByName("skills")
    const password = document.getElementById("password")


    const users = localStorage.getItem("signupData")
        ? JSON.parse(localStorage.getItem("signupData"))
        : [];
    //const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const showError = {};

    if (firstname.value.trim() === "") {
        showError.firstname = "First name is required.";
    }
    if (lastname.value.trim() === "") {
        showError.lastname = "Last name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError.email = "Enter a valid email address.";
    }
    if (email.value.trim()) {
        const user = users.some((u) => u.email === email.value && users[i].email !== email.value)
        if (user) showError.unique = "Email already exist!";
        // const user = users.filter(u => u.email === email.value.trim())
        // if (!((user.length === 1 && user.length !== 0) && user[0].email === email.value)) showError.unique = "Email already exist!"
        //if (!(user.length >= 1 && users[i].email != email.value)) showError.unique = "Email already exist!";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value)) {
        showError.phone = "Enter a valid 10-digit phone number.";
    }
    const selectedDate = new Date(dob?.value);
    const today = new Date();
    if (selectedDate >= today) {
        showError.dob = "Date of birth must be in the past.";
    }
    const selected = Array.from(skills).some((s) => s.checked);
    if (!selected) {
        showError.skill = "Please select at least one skill.";
    }
    if (hobbies.value.trim() === "") {
        showError.hobbies = "hobbies can not be empty!"
    }

    if (Object.keys(showError).length !== 0) {
        let obj = Object.values(showError);
        alert(JSON.stringify(obj));
        return;
    } else {
        const formData = {
            firstname: firstname.value.trim(),
            lastname: lastname.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            password: password.value,
            dob: dob.value,
            gender: Array.from(gender).find((r) => r.checked)?.value,
            city: city.value,
            hobbies: hobbies.value,
            skills: Array.from(skills)
                .filter((s) => s.checked)
                .map((s) => s.value),
        };
        return formData
    }
}
