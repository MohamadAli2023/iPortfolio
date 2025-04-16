document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message mt-3';
    contactForm.appendChild(statusMessage);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        statusMessage.innerHTML = '';
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Send the form data
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Show response message
            statusMessage.className = `status-message mt-3 alert alert-${data.status === 'success' ? 'success' : 'danger'}`;
            statusMessage.innerHTML = data.message;
            
            // Reset form if successful
            if (data.status === 'success') {
                contactForm.reset();
            }
        })
        .catch(error => {
            statusMessage.className = 'status-message mt-3 alert alert-danger';
            statusMessage.innerHTML = 'An error occurred. Please try again later.';
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        });
    });
}); 