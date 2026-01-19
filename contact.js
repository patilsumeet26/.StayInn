// ===== CONTACT PAGE JAVASCRIPT =====

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
});

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitContactForm();
        });
    }
}

// Submit contact form
function submitContactForm() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validate required fields
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Create contact message object
    const contactMessage = {
        id: 'CM' + Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        submittedDate: new Date().toLocaleString()
    };

    // Save to localStorage (in a real app, this would be sent to backend)
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Clear form
    document.getElementById('contactForm').reset();

    // Show success notification
    showNotification('Your message has been sent successfully! We will get back to you soon.', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
