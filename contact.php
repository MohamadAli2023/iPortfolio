<?php
// Initialize response array
$response = array('status' => '', 'message' => '');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic spam protection - check if the request is coming too quickly
    session_start();
    $now = time();
    if (isset($_SESSION['last_submit_time']) && 
        ($now - $_SESSION['last_submit_time']) < 15) { // 15 seconds cooldown
        $response['status'] = 'error';
        $response['message'] = 'Please wait a few seconds before submitting again.';
        echo json_encode($response);
        exit;
    }
    
    // Validate and sanitize input
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['status'] = 'error';
        $response['message'] = 'All fields are required.';
        echo json_encode($response);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['status'] = 'error';
        $response['message'] = 'Invalid email format.';
        echo json_encode($response);
        exit;
    }
    
    // Set recipient email
    $to = "Hassanmhamad777@gmail.com";
    
    // Create email headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Create HTML message
    $email_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Contact Form Submission</h2>
            <div class='field'>
                <span class='label'>Name:</span> " . $name . "
            </div>
            <div class='field'>
                <span class='label'>Email:</span> " . $email . "
            </div>
            <div class='field'>
                <span class='label'>Subject:</span> " . $subject . "
            </div>
            <div class='field'>
                <span class='label'>Message:</span><br>
                " . nl2br($message) . "
            </div>
        </div>
    </body>
    </html>";
    
    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        $_SESSION['last_submit_time'] = $now; // Record submission time
        $response['status'] = 'success';
        $response['message'] = 'Thank you for your message. We will get back to you soon!';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Sorry, there was an error sending your message. Please try again later.';
    }
    
    echo json_encode($response);
    exit;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method.';
    echo json_encode($response);
    exit;
}
?>