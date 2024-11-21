document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // If the user is logged in, show "Logout" button, else "Login"
    if (isLoggedIn === 'true') {
        loginBtn.textContent = "Logout"; // Change text to "Logout"
        loginBtn.classList.add("active");  // Mark as active
        signupBtn.classList.remove("active");  // Make sure signup is not active
    } else {
        loginBtn.textContent = "Login";  // Default to "Login" if not logged in
        loginBtn.classList.remove("active"); // Remove active class from login button
        signupBtn.classList.remove("active");  // Remove active class from signup button
    }
});

// Handle login button click
document.getElementById("login-btn").addEventListener("click", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // If user is logged in, log them out
    if (isLoggedIn === 'true') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = "signlog.html";  // Redirect to login page after logout
    } else {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-btn").classList.add("active");
        document.getElementById("signup-btn").classList.remove("active");
    }
});

// Handle signup button click
document.getElementById("signup-btn").addEventListener("click", function() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-btn").classList.add("active");
    document.getElementById("login-btn").classList.remove("active");
});

// Go Back Logic for both login and signup pages
function goBack() {
    // Set login state to false when going back to ensure the login button shows "Login"
    localStorage.setItem('isLoggedIn', 'false');  // Force the login state to false
    
    window.location.href = "home.html";  // Redirect to home page
}

// Login form submission
document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Assuming form validation passes and credentials are correct
    localStorage.setItem('isLoggedIn', 'true');  // Set user as logged in
    const user = {
        email: document.getElementById("email").value
    };
    localStorage.setItem("user", JSON.stringify(user));  // Store user info
    
    window.location.href = "home.html";  // Redirect to home page after login
});

// Signup form submission (this is just a placeholder for signup logic)
document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Signup logic to create a new user (this is just for demonstration)
    const newUser = {
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value
    };
    
    localStorage.setItem("newUser", JSON.stringify(newUser));  // Store new user in localStorage (just for demo)

    alert("Signup successful! You can now log in.");
    document.getElementById("login-btn").click();  // Automatically switch to login form after signup
});
