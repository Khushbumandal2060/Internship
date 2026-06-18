// ===== DROPDOWN =====
document.getElementById("courseSelect").addEventListener("change", function () {
    let value = this.value;
    let result = document.getElementById("result");

    if (value) {
        result.textContent = "You selected: " + value;
    } else {
        result.textContent = "";
    }
});


// ===== MODAL =====
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// close modal when clicking outside
window.onclick = function (event) {
    let modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// ===== FORM VALIDATION =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let error = document.getElementById("error");

    if (name === "" || email === "") {
        error.textContent = "All fields are required!";
        error.style.color = "red";
        return;
    }

    // simple email check
    if (!email.includes("@")) {
        error.textContent = "Enter a valid email!";
        error.style.color = "red";
        return;
    }

    error.textContent = "Form submitted successfully!";
    error.style.color = "green";
});