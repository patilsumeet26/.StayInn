// ===== MY BOOKINGS PAGE JAVASCRIPT =====

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayBookings();
});

// Display all bookings
function displayBookings() {
    const bookings = getBookings();
    const container = document.getElementById('bookingsContainer');

    if (!container) return;

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="no-bookings">
                <i class="fas fa-calendar-times"></i>
                <h2>No Bookings Found</h2>
                <p>You haven't made any bookings yet. Start planning your luxury stay today!</p>
                <a href="rooms.html" class="btn-primary">Browse Rooms</a>
            </div>
        `;
        return;
    }

    container.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-card-header">
                <div>
                    <div class="booking-id">${booking.bookingId}</div>
                    <small>Booked on ${booking.bookingDate}</small>
                </div>
                <span class="booking-status confirmed">Confirmed</span>
            </div>
            <div class="booking-card-body">
                <div class="booking-info-grid">
                    <div class="booking-info-item">
                        <span class="booking-info-label">Room Type</span>
                        <span class="booking-info-value">${booking.roomName}</span>
                    </div>
                    <div class="booking-info-item">
                        <span class="booking-info-label">Guest Name</span>
                        <span class="booking-info-value">${booking.guestName}</span>
                    </div>
                    <div class="booking-info-item">
                        <span class="booking-info-label">Check-in</span>
                        <span class="booking-info-value">${new Date(booking.checkin).toLocaleDateString()}</span>
                    </div>
                    <div class="booking-info-item">
                        <span class="booking-info-label">Check-out</span>
                        <span class="booking-info-value">${new Date(booking.checkout).toLocaleDateString()}</span>
                    </div>
                </div>

                ${booking.specialRequests ? `
                    <div class="booking-description">
                        <strong>Special Requests:</strong> ${booking.specialRequests}
                    </div>
                ` : ''}

                <div class="booking-info-grid">
                    <div class="booking-info-item">
                        <span class="booking-info-label">Number of Nights</span>
                        <span class="booking-info-value">${booking.nights}</span>
                    </div>
                    <div class="booking-info-item">
                        <span class="booking-info-label">Contact Email</span>
                        <span class="booking-info-value">${booking.guestEmail}</span>
                    </div>
                </div>

                <div class="booking-total">
                    <span>Total Amount:</span>
                    <span>${formatPrice(booking.totalPrice)}</span>
                </div>

                <div class="booking-actions">
                    <button class="btn-action btn-modify" onclick="modifyBooking('${booking.bookingId}')">
                        <i class="fas fa-edit"></i> Modify
                    </button>
                    <button class="btn-action btn-download" onclick="downloadBooking('${booking.bookingId}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn-action btn-cancel-booking" onclick="cancelBooking('${booking.bookingId}')">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modify booking
function modifyBooking(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.bookingId === bookingId);
    
    if (booking) {
        localStorage.setItem('currentBooking', JSON.stringify(booking));
        window.location.href = 'booking.html';
    }
}

// Download booking
function downloadBooking(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.bookingId === bookingId);
    
    if (!booking) return;

    let content = `
STAYINN - BOOKING CONFIRMATION
==============================

Booking Details
===============
Booking ID: ${booking.bookingId}
Booking Date: ${booking.bookingDate}
Status: Confirmed

Guest Information
=================
Name: ${booking.guestName}
Email: ${booking.guestEmail}
Phone: ${booking.guestPhone}

Room Details
============
Room Type: ${booking.roomName}
Price per Night: ${formatPrice(booking.price)}
Number of Nights: ${booking.nights}

Stay Duration
=============
Check-in: ${new Date(booking.checkin).toLocaleDateString()}
Check-out: ${new Date(booking.checkout).toLocaleDateString()}

${booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : ''}

Billing Information
===================
Total Amount: ${formatPrice(booking.totalPrice)}
Payment Method: ${booking.paymentMethod}

Important Information
=====================
- Please arrive 30 minutes before check-in
- Valid ID is required at check-in
- Check-out time is 11:00 AM
- For any changes, contact us 24/7

Contact Us
==========
Phone: +91-8384-123456
Email: info@stayinn.in
Address: Kalburgi, Karnataka

Thank you for choosing StayInn!
    `;

    // Create and download file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `Booking_${bookingId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Cancel booking
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
        const bookings = getBookings();
        const index = bookings.findIndex(b => b.bookingId === bookingId);
        
        if (index > -1) {
            bookings[index].status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            displayBookings();
            showNotification('Booking cancelled successfully', 'success');
        }
    }
}

// Get all bookings
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
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
