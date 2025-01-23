function checkUser() {
    // Get the email entered by the user
    const email = document.getElementById('email').value.trim();

    // Fetch user data from localStorage
    const users = localStorage.getItem("signupData")
        ? JSON.parse(localStorage.getItem("signupData"))
        : [];

    // Find user with the given email
    const user = users.find(u => u.email === email);

    // Select the container where elements will be displayed
    const container = document.querySelector('.container');

    // Clear container content for fresh updates
    container.innerHTML = '';

    // Create password field and submit button elements
    const passwordField = document.createElement('input');
    const submitPasswordButton = document.createElement('button');

    // Check if the email field is empty
    if (!email) {
        alert('Please enter an email');
        return;
    }

    if (email === "admin@gmail.com") {
        // Admin email case
        passwordField.placeholder = 'Enter admin password';
        passwordField.id = 'password';
        passwordField.type = 'password';
        passwordField.style.width = '100%';

        submitPasswordButton.innerText = 'Login';
        submitPasswordButton.onclick = function () {
            const password = document.getElementById('password')?.value;
            if (password === 'adminPassword') {
                sessionStorage.setItem('admin', true);
                alert('Login successful. Redirecting to admin page...');
                window.location.href = 'admin.html';
            } else {
                alert('Incorrect password.');
            }
        };

        // Append elements to the container
        container.style.display = 'inline';
        container.appendChild(passwordField);
        container.appendChild(submitPasswordButton);
    } else if (user) {
        // User exists case
        container.style.display = 'inline';
        container.innerHTML = `<h2>Welcome Back</h2><p>${user.email}</p>`;

        passwordField.placeholder = 'Enter your password';
        passwordField.id = 'password';
        passwordField.type = 'password';
        passwordField.style.width = '100%';

        submitPasswordButton.innerText = 'Login';
        submitPasswordButton.onclick = function () {
            const password = document.getElementById('password')?.value;
            if (password === user.password) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Login successful. Redirecting to user page...');
                window.location.href = 'user.html';
            } else {
                alert('Incorrect password.');
            }
        };

        // Append elements to the container
        container.appendChild(passwordField);
        container.appendChild(submitPasswordButton);
    } else {
        // Email not found case
        alert('Email not found. Redirecting to signup page...');
        window.location.href = 'signup.html';
    }
}





// function checkUser() {
//     const email = document.getElementById('email').value;
//     const users = localStorage.getItem("signupData") ? JSON.parse(localStorage.getItem("signupData")) : [];
//     const user = users.find(u => u.email === email);
//     const submitPasswordButton = document.createElement('button');
//     const passwordField = document.createElement('input');
//     const container = document.querySelector('.container');

//     if (!email || email.trim() === '') {    // Check if email is empty or not provided
//         alert('Please enter an email');
//         return;
//     }
//     else if (email === "admin@gmail.com") {
//         passwordField.placeholder = 'Enter admin password';
//     }
//     else if (user) {
//         container.style.display = 'inline';
//         container.innerHTML = `<h2>Welcome Back</h2><p>${user?.email}</p>`;
//     }
//     else {
//         alert('Email not found. Redirecting to signup page...');
//         window.location.href = 'signup.html';
//     }

//     passwordField.style.width = '100%';
//     passwordField.type = 'password';
//     passwordField.id = 'password';
//     submitPasswordButton.innerText = 'Login';
//     container.style.display = 'inline';

//     submitPasswordButton.onclick = function () {
//         const password = document.getElementById('password')?.value;
//         if (password === 'adminPassword' && email === 'admin@gmail.com') {
//             sessionStorage.setItem('admin', true)
//             alert('Login successful. Redirecting to admin page...');
//             window.location.href = 'admin.html'
//         } else if (password === user.password) {
//             sessionStorage.setItem('loggedInUser', JSON.stringify(user));
//             alert('Login successful. Redirecting to user page...');
//             window.location.href = 'user.html'
//         }
//         else {
//             alert('Incorrect password.');
//         }
//     };
//     console.log("cccc")
//     container.appendChild(submitPasswordButton);
//     container.appendChild(passwordField);
// }



















