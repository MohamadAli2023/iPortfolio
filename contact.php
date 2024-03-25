<?php

class ContactFormHandler {
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    public $headers;

    public function __construct() {
        $this->headers = "MIME-Version: 1.0" . "\r\n";
        $this->headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    }

    public function add_message($content, $label, $indent = 0) {
        $this->message .= str_repeat("&nbsp;", $indent * 4) . "<strong>{$label}:</strong> " . nl2br($content) . "<br>";
    }

    public function send() {
        $message = "<html><body>{$this->message}</body></html>";

        return mail($this->to, $this->subject, $message, $this->headers);
    }
}
?>


<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set recipient email address
    $to = "Hassanmhamad777@gmail.com";

    // Set subject
    $subject = $_POST['subject'];

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Construct email headers
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Construct email message
    $email_message = "
    <html>
    <head>
    <title>$subject</title>
    </head>
    <body>
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Message:</strong> $message</p>
    </body>
    </html>
    ";

    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        // Email sent successfully
        echo "Thank you for your message. We will get back to you soon!";
    } else {
        // Failed to send email
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Form not submitted, redirect to error page or display an error message
    echo "Form submission method not allowed.";
}
?>

