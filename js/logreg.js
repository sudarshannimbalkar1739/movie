
/*==========login===========*/
const overlay = document.getElementById("overlay");
const loginBtn = document.getElementById("loginBtn");
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const adminBox = document.getElementById("adminBox");

// Open modal
loginBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
});

// Close modal
function closeAuth() {
    overlay.classList.add("hidden");
}

// Switch forms
function showRegister() {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
    adminBox.classList.add("hidden");
}

function showLogin() {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
    adminBox.classList.add("hidden");
}

function showadmin() {
    adminBox.classList.remove("hidden");
    loginBox.classList.add("hidden");
    registerBox.classList.add("hidden");
}

// Show first letter after login
function showUserAvatar(name) {
    const firstLetter = name.charAt(0).toUpperCase();
    loginBtn.outerHTML = `<div class="avatar">${firstLetter}</div>`;
}