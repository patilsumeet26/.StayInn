// ===== ROOMS PAGE JAVASCRIPT =====

const rooms = [
    {
        id: 1,
        name: 'Deluxe',
        price: 5000,
        image: '<i class="fas fa-bed"></i>',
        description: 'Elegant room with modern amenities and city view',
        features: ['300 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Flat-screen TV',
            'Premium bedding',
            'Rainfall shower',
            'Mini bar',
            'Work desk',
            'City view'
        ]
    },
    {
        id: 2,
        name: 'King Suite',
        price: 8000,
        image: '<i class="fas fa-crown"></i>',
        description: 'Spacious suite with king bed and living area',
        features: ['450 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Separate living area',
            'King-size bed',
            'Luxury bath',
            'Complimentary breakfast',
            'Business center access',
            'Garden view'
        ]
    },
    {
        id: 3,
        name: 'Executive Double Room',
        price: 6500,
        image: '<i class="fas fa-door-open"></i>',
        description: 'Premium room perfect for business travelers',
        features: ['350 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Executive desk',
            'Double bed',
            'Priority concierge',
            'Lounge access',
            'Complimentary snacks',
            'Premium toiletries'
        ]
    },
    {
        id: 4,
        name: 'Standard Queen Room',
        price: 4500,
        image: '<i class="fas fa-home"></i>',
        description: 'Comfortable room with essential amenities',
        features: ['280 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Queen-size bed',
            'Attached bathroom',
            'LED TV',
            'Air conditioning',
            'Phone and safe',
            'Wake-up service'
        ]
    },
    {
        id: 5,
        name: 'Presidential Suite',
        price: 15000,
        image: '<i class="fas fa-star"></i>',
        description: 'Ultimate luxury experience with premium services',
        features: ['800 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Two bedrooms',
            'Living and dining area',
            'Jacuzzi bathtub',
            'Private butler service',
            'Premium bar',
            'Panoramic view',
            'Spa access'
        ]
    },
    {
        id: 6,
        name: 'Family Suite',
        price: 10000,
        image: '<i class="fas fa-family"></i>',
        description: 'Perfect for families with multiple rooms',
        features: ['600 sq ft', 'WiFi', 'AC'],
        amenities: [
            'Two bedrooms',
            'Game room',
            'Family bathroom',
            'Kids welcome package',
            'Kitchenette',
            'Family activities access'
        ]
    },
    {
        id: 7,
        name: 'Business Class Room',
        price: 7000,
        image: '<i class="fas fa-briefcase"></i>',
        description: 'Designed for professionals with full work facilities',
        features: ['400 sq ft', 'WiFi', 'AC'],
        amenities: [
            'High-speed internet',
            'Full office setup',
            'Conference call facility',
            'Ergonomic desk chair',
            'Meeting room access',
            'Complimentary printing'
        ]
    }
];

// Search criteria from home page
let searchCriteria = getSearchCriteria();

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayRooms();
    setupModal();
});

// Display rooms
function displayRooms() {
    const container = document.getElementById('roomsContainer');
    
    if (!container) return;

    container.innerHTML = rooms.map(room => `
        <div class="room-card" onclick="openRoomDetails(${room.id})">
            <div class="room-image">${room.image}</div>
            <div class="room-info">
                <h3 class="room-name">${room.name}</h3>
                <div class="room-price">
                    ${formatPrice(room.price)}
                    <span class="room-price-label">/night</span>
                </div>
                <div class="room-features">
                    ${room.features.map(f => `
                        <span class="room-feature">
                            <i class="fas fa-check"></i> ${f}
                        </span>
                    `).join('')}
                </div>
                <p class="room-description">${room.description}</p>
                <button class="btn-secondary">View Details</button>
            </div>
        </div>
    `).join('');
}

// Open room details modal
function openRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.getElementById('roomModal');
    const modalBody = document.getElementById('modalBody');
    
    let nightsCount = 1;
    if (searchCriteria) {
        nightsCount = calculateNights(searchCriteria.checkin, searchCriteria.checkout);
    }

    const totalPrice = room.price * nightsCount;

    modalBody.innerHTML = `
        <div class="room-detail-header">
            <h2>${room.name}</h2>
            <div class="room-detail-price">${formatPrice(room.price)}/night</div>
        </div>
        <div class="room-detail-body">
            <div class="room-detail-section">
                <h3>Description</h3>
                <p class="room-detail-description">${room.description}</p>
            </div>

            <div class="room-detail-section">
                <h3>Amenities</h3>
                <div class="amenities-list">
                    ${room.amenities.map(a => `
                        <div class="amenity-item">
                            <i class="fas fa-check-circle"></i> ${a}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="room-detail-section">
                <h3>Booking Details</h3>
                <div class="booking-details">
                    <div class="booking-row">
                        <label>Check-in:</label>
                        <input type="date" id="modalCheckin" value="${searchCriteria?.checkin || ''}" onchange="updatePrice(${room.price})">
                    </div>
                    <div class="booking-row">
                        <label>Check-out:</label>
                        <input type="date" id="modalCheckout" value="${searchCriteria?.checkout || ''}" onchange="updatePrice(${room.price})">
                    </div>
                    <div class="booking-row">
                        <label>Number of Nights:</label>
                        <input type="number" id="nightsInput" value="${nightsCount}" min="1" onchange="updatePrice(${room.price})">
                    </div>
                </div>

                <div class="price-calculation" id="totalPrice">
                    Total: ${formatPrice(totalPrice)}
                </div>
            </div>

            <div class="modal-actions">
                <button class="modal-actions button btn-book" onclick="proceedToBooking(${roomId}, '${room.name}')">
                    Proceed to Booking
                </button>
                <button class="modal-actions button btn-cancel" onclick="closeRoomDetails()">
                    Cancel
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Update price calculation
function updatePrice(pricePerNight) {
    const nights = parseInt(document.getElementById('nightsInput').value) || 1;
    const totalPrice = pricePerNight * nights;
    document.getElementById('totalPrice').innerHTML = `Total: ${formatPrice(totalPrice)}`;
}

// Close room details
function closeRoomDetails() {
    const modal = document.getElementById('roomModal');
    modal.style.display = 'none';
}

// Proceed to booking
function proceedToBooking(roomId, roomName) {
    const room = rooms.find(r => r.id === roomId);
    const nights = parseInt(document.getElementById('nightsInput').value) || 1;
    const checkin = document.getElementById('modalCheckin').value;
    const checkout = document.getElementById('modalCheckout').value;

    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }

    const bookingData = {
        roomId,
        roomName,
        price: room.price,
        nights,
        checkin,
        checkout,
        totalPrice: room.price * nights
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    window.location.href = 'booking.html';
}

// Setup modal close button
function setupModal() {
    const modal = document.getElementById('roomModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = closeRoomDetails;
    }

    if (modal) {
        window.onclick = (event) => {
            if (event.target === modal) {
                closeRoomDetails();
            }
        };
    }
}

// Helper functions (from main.js)
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

function calculateNights(checkin, checkout) {
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
}

function getSearchCriteria() {
    const stored = localStorage.getItem('searchCriteria');
    return stored ? JSON.parse(stored) : null;
}
