// ===== BOOKING PAGE JAVASCRIPT =====

let currentBooking = {};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadBookingData();
    setupPaymentMethodToggle();
    setupForm();
    setupSuccessPopup();
});

// Load booking data from rooms page
function loadBookingData() {
    const booking = localStorage.getItem('currentBooking');
    if (!booking) {
        alert('No booking data found');
        window.location.href = 'rooms.html';
        return;
    }

    currentBooking = JSON.parse(booking);
    displayBookingSummary();
}

// Display booking summary
function displayBookingSummary() {
    const summaryContent = document.getElementById('summaryContent');
    
    summaryContent.innerHTML = `
        <div class="summary-row">
            <span class="summary-label">Room Type:</span>
            <span class="summary-value">${currentBooking.roomName}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Check-in:</span>
            <span class="summary-value">${new Date(currentBooking.checkin).toLocaleDateString()}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Check-out:</span>
            <span class="summary-value">${new Date(currentBooking.checkout).toLocaleDateString()}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Number of Nights:</span>
            <span class="summary-value">${currentBooking.nights}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Price per Night:</span>
            <span class="summary-value">${formatPrice(currentBooking.price)}</span>
        </div>
        <div class="total-price">
            Total: ${formatPrice(currentBooking.totalPrice)}
        </div>
    `;
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'credit-card' || e.target.value === 'debit-card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Setup form submission
function setupForm() {
    const form = document.getElementById('guestForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                processBooking();
            }
        });
    }

    // Format card number input
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Format expiry date
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Setup success popup
function setupSuccessPopup() {
    const bookingForm = document.querySelector('.booking-form');
    const successPopup = document.querySelector('.success-popup');
    const closeButton = document.querySelector('.btn-close');

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            processBooking();
            showSuccessPopup();
        }
    });

    function showSuccessPopup() {
        successPopup.classList.add('active');
    }

    closeButton.addEventListener('click', function() {
        successPopup.classList.remove('active');
    });
}

// Validate form
function validateForm() {
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();
    const terms = document.getElementById('terms').checked;

    let isValid = true;

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';

    // Validate name
    if (!name) {
        document.getElementById('nameError').textContent = 'Please enter your name';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    // Validate terms
    if (!terms) {
        alert('Please agree to the terms and conditions');
        isValid = false;
    }

    // Validate payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if ((paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && !validateCardDetails()) {
        isValid = false;
    }

    return isValid;
}

// Validate card details
function validateCardDetails() {
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardName) {
        alert('Please enter cardholder name');
        return false;
    }

    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter expiry date in MM/YY format');
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return false;
    }

    return true;
}

// Process booking
function processBooking() {
    const guestName = document.getElementById('guestName').value.trim();
    const guestEmail = document.getElementById('guestEmail').value.trim();
    const guestPhone = document.getElementById('guestPhone').value.trim();
    const specialRequests = document.getElementById('specialRequests').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    const bookingData = {
        ...currentBooking,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        paymentMethod,
        bookingDate: new Date().toLocaleString(),
        bookingId: 'BK' + Date.now()
    };

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Save user data
    localStorage.setItem('userData', JSON.stringify({
        name: guestName,
        email: guestEmail,
        phone: guestPhone
    }));

    // Show confirmation modal
    showConfirmation(bookingData);

    // Clear current booking
    localStorage.removeItem('currentBooking');
}

// Show confirmation modal
function showConfirmation(bookingData) {
    const modal = document.getElementById('confirmationModal');
    const confirmationDetails = document.getElementById('confirmationDetails');

    confirmationDetails.innerHTML = `
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Booking ID:</span>
            <span class="confirmation-detail-value">${bookingData.bookingId}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Guest Name:</span>
            <span class="confirmation-detail-value">${bookingData.guestName}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Room:</span>
            <span class="confirmation-detail-value">${bookingData.roomName}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Check-in:</span>
            <span class="confirmation-detail-value">${new Date(bookingData.checkin).toLocaleDateString()}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Check-out:</span>
            <span class="confirmation-detail-value">${new Date(bookingData.checkout).toLocaleDateString()}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Number of Nights:</span>
            <span class="confirmation-detail-value">${bookingData.nights}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Total Amount:</span>
            <span class="confirmation-detail-value">${formatPrice(bookingData.totalPrice)}</span>
        </div>
        <div class="confirmation-detail-row">
            <span class="confirmation-detail-label">Booking Date:</span>
            <span class="confirmation-detail-value">${bookingData.bookingDate}</span>
        </div>
    `;

    modal.style.display = 'block';

    // Close modal after 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 7000);
}

// Navigate to my bookings
function goToMyBookings() {
    window.location.href = 'my-bookings.html';
}

// Navigate to home
function goHome() {
    window.location.href = '../index.html';
}

// Helper functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}
