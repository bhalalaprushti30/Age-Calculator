// Load saved DOB from localStorage if available
window.onload = function () {
    const savedDOB = localStorage.getItem("dob");
    if (savedDOB) {
        document.getElementById("dob").value = savedDOB;
        calculateAge(); // Auto calculate age
    }
};

// Function to calculate age and next birthday countdown
function calculateAge() {
    let dobInput = document.getElementById("dob").value;
    if (!dobInput) {
        document.getElementById("result").innerText = "Please select a valid date!";
        return;
    }

    // Save the selected date in localStorage
    localStorage.setItem("dob", dobInput);

    let dob = new Date(dobInput);
    let today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("result").innerText = 
        `You are ${years} years, ${months} months, and ${days} days old.`;

    // Next Birthday Countdown
    calculateNextBirthday(dob);
}

// Function to calculate the next birthday
function calculateNextBirthday(dob) {
    let today = new Date();
    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    let diff = nextBirthday - today;
    let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("countdown").innerText = 
        `🎂 Your next birthday is in ${daysLeft} days!`;
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load Dark Mode Setting
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeToggle").checked = true;
}
