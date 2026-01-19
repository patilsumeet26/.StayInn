// ===== STAYINN MAIN JAVASCRIPT =====

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Set minimum dates for check-in and check-out
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        checkinInput.setAttribute('min', today);
        checkinInput.addEventListener('change', () => {
            if (checkoutInput) {
                checkoutInput.setAttribute('min', checkinInput.value);
            }
        });
    }
});

// Search Rooms Function
function searchRooms() {
    const location = document.getElementById('location').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;

    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }

    // Store search criteria in localStorage
    localStorage.setItem('searchCriteria', JSON.stringify({
        location,
        checkin,
        checkout,
        guests
    }));

    // Redirect to rooms page
    window.location.href = 'pages/rooms.html';
}

// Load Search Criteria from URL/localStorage
function getSearchCriteria() {
    const stored = localStorage.getItem('searchCriteria');
    return stored ? JSON.parse(stored) : null;
}

// Calculate nights between dates
function calculateNights(checkin, checkout) {
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
}

// Format price to INR
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

// Store booking data
function saveBooking(bookingData) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = {
        id: 'BK' + Date.now(),
        ...bookingData,
        bookingDate: new Date().toLocaleString()
    };
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return booking;
}

// Get all bookings
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

// Store user data
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Get user data
function getUserData() {
    return JSON.parse(localStorage.getItem('userData')) || {};
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

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        background-color: #4CAF50;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .notification.show {
        opacity: 1;
    }

    .notification.error {
        background-color: #f44336;
    }

    .notification.info {
        background-color: #2196F3;
    }

    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
        }
    }
`;
document.head.appendChild(style);
