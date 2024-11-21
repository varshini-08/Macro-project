<?php
$serverusername = "localhost"; 
$userusername = "root"; 
$password = ""; 
$dbusername = "poultry"; 

// Create connection
$conn = new mysqli($serverusername, $userusername, $password, $dbusername);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sign up handling
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password']; 
    $number = $_POST['number'];

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepare the SQL query
    $sql = "INSERT INTO user (username, email, password, number) VALUES (?, ?, ?, ?)";

    // Prepare the statement
    if (!$stmt = $conn->prepare($sql)) {
        die("Prepare failed: " . $conn->error);  // Output detailed error if prepare fails
    }

    // Bind the parameters
    $stmt->bind_param("ssss", $username, $email, $hashed_password, $number);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Signup successful!";
        header("Location: signlog.html"); 
        exit();
    } else {
        echo "Error: " . $stmt->error;  // Display error message if execution fails
    }

    // Close the statement
    $stmt->close();
}

// Login handling
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare the query
    $sql = "SELECT password FROM user WHERE email=?";
    if (!$stmt = $conn->prepare($sql)) {
        die("Prepare failed: " . $conn->error);  // Output detailed error if prepare fails
    }

    // Bind parameters
    $stmt->bind_param("s", $email);

    // Execute query
    $stmt->execute();

    // Store the result to check if the email exists
    $stmt->store_result();

    // Bind result to fetch the hashed password
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    // Verify password
    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        echo "Login successful!";
        header("Location: home.html"); 
        exit();
    } else {
        echo "Invalid email or password.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
