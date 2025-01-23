document.addEventListener("DOMContentLoaded", () => {
  // Get all form elements
  const form = document.querySelector("form");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const dob = document.getElementById("dob");
  const genderRadios = document.getElementsByName("gender");
  const city = document.getElementById("city");
  const hobbies = document.getElementById("hobbies");
  const skills = document.getElementsByName("skills");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  let errorFlag = false;

  // Helper function to display validation messages
  const showError = (input, message) => {
    const parent = input.parentElement;
    let error = parent.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      error.style.color = "red";
      parent.appendChild(error);
    }
    error.textContent = message;
    errorFlag = true;
  };

  const clearError = (input) => {
    const parent = input.parentElement;
    const error = parent.querySelector(".error-message");
    if (error) {
      parent.removeChild(error);
    }
    errorFlag = false;
  };

  // Validate each field
  firstname.addEventListener("input", () => {
    if (firstname.value.trim() === "") {
      showError(firstname, "First name is required.");
    } else {
      clearError(firstname);
    }
  });

  lastname.addEventListener("input", () => {
    if (lastname.value.trim() === "") {
      showError(lastname, "Last name is required.");
    } else {
      clearError(lastname);
    }
  });

  email.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, "Enter a valid email address.");
    }
    else {
      clearError(email);
    }
  });

  phone.addEventListener("input", () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value)) {
      showError(phone, "Enter a valid 10-digit phone number.");
    } else {
      clearError(phone);
    }
  });

  dob.addEventListener("input", () => {
    const selectedDate = new Date(dob.value);
    const today = new Date();
    if (selectedDate >= today) {
      showError(dob, "Date of birth must be in the past.");
    } else {
      clearError(dob);
    }
  });

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const selected = Array.from(genderRadios).some((r) => r.checked);
      if (!selected) {
        showError(radio, "Please select a gender.");
      } else {
        clearError(radio);
      }
    });
  });

  city.addEventListener("change", () => {
    if (city.value === "") {
      showError(city, "Please select a city.");
    } else {
      clearError(city);
    }
  });

  hobbies.addEventListener("input", () => {
    if (hobbies.value.trim() === "") {
      showError(hobbies, "Please enter your hobbies.");
    } else {
      clearError(hobbies);
    }
  });

  skills.forEach((skill) => {
    skill.addEventListener("change", () => {
      const selected = Array.from(skills).some((s) => s.checked);
      if (!selected) {
        showError(skill, "Please select at least one skill.");
      } else {
        clearError(skill);
      }
    });
  });

  password.addEventListener("input", () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password.value)) {
      showError(password, "[A-Z], [a-z], [0-9] [@$!%*?&]");
    } else {
      clearError(password);
    }
  }
  );

  confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match.");
    } else {
      clearError(confirmPassword);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    const users = JSON.parse(localStorage.getItem("signupData")) || [];
    // const users = JSON.parse(localStorage.getItem("signupData"))
    const user = users.filter((u) => u.email === email.value.trim())
    if (user.length > 0) {
      alert("Email already Exist!")
      return
    }

    if (errorFlag === false) {
      // Gather form data
      const formData = {
        firstname: firstname.value.trim(),
        lastname: lastname.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        dob: dob.value,
        gender: Array.from(genderRadios).find((r) => r.checked)?.value,
        city: city.value,
        hobbies: hobbies.value.trim(),
        skills: Array.from(skills)
          .filter((s) => s.checked)
          .map((s) => s.value),
        password: password.value,
      };

      // Get existing data from localStorage

      // Add new user to the array
      users.push(formData);

      // Store updated array back in localStorage
      localStorage.setItem("signupData", JSON.stringify(users));

      alert("Signup data successfully saved!");
      window.location.href = "index.html";

      // Optionally clear the form
      form.reset();
    }
    else {
      alert("Please fill the form correctly.");
    }
  });

});

