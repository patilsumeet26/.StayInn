-- ===== STAYINN DATABASE SCHEMA =====

-- Create Database
CREATE DATABASE IF NOT EXISTS stayinn;
USE stayinn;

-- ===== USERS TABLE =====
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== ROOMS TABLE =====
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10, 2) NOT NULL,
    capacity INT DEFAULT 2,
    size_sqft INT,
    amenities TEXT,
    availability_status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== BOOKINGS TABLE =====
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(15) NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    special_requests TEXT,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'pending', 'cancelled', 'completed') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- ===== CONTACT MESSAGES TABLE =====
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    submitted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'read', 'resolved') DEFAULT 'new',
    response TEXT,
    response_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== PAYMENTS TABLE =====
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id VARCHAR(50) UNIQUE NOT NULL,
    booking_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- ===== REVIEWS TABLE =====
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id VARCHAR(50) UNIQUE NOT NULL,
    booking_id VARCHAR(50) NOT NULL,
    guest_email VARCHAR(100) NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- ===== INDEXES =====
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_booking_email ON bookings(guest_email);
CREATE INDEX idx_room_availability ON rooms(availability_status);
CREATE INDEX idx_booking_status ON bookings(status);
CREATE INDEX idx_booking_dates ON bookings(check_in, check_out);

-- ===== INSERT SAMPLE DATA =====

-- Insert Rooms
INSERT INTO rooms (room_name, description, price_per_night, capacity, size_sqft, amenities, availability_status, image_url) VALUES
('Deluxe', 'Elegant room with modern amenities and city view', 5000.00, 2, 300, 'Flat-screen TV, Premium bedding, Rainfall shower, Mini bar, Work desk, City view', 'available', 'deluxe.jpg'),
('King Suite', 'Spacious suite with king bed and living area', 8000.00, 2, 450, 'Separate living area, King-size bed, Luxury bath, Complimentary breakfast, Business center access, Garden view', 'available', 'king-suite.jpg'),
('Executive Double Room', 'Premium room perfect for business travelers', 6500.00, 2, 350, 'Executive desk, Double bed, Priority concierge, Lounge access, Complimentary snacks, Premium toiletries', 'available', 'executive.jpg'),
('Standard Queen Room', 'Comfortable room with essential amenities', 4500.00, 2, 280, 'Queen-size bed, Attached bathroom, LED TV, Air conditioning, Phone and safe, Wake-up service', 'available', 'standard.jpg'),
('Presidential Suite', 'Ultimate luxury experience with premium services', 15000.00, 2, 800, 'Two bedrooms, Living and dining area, Jacuzzi bathtub, Private butler service, Premium bar, Panoramic view, Spa access', 'available', 'presidential.jpg'),
('Family Suite', 'Perfect for families with multiple rooms', 10000.00, 4, 600, 'Two bedrooms, Game room, Family bathroom, Kids welcome package, Kitchenette, Family activities access', 'available', 'family.jpg'),
('Business Class Room', 'Designed for professionals with full work facilities', 7000.00, 2, 400, 'High-speed internet, Full office setup, Conference call facility, Ergonomic desk chair, Meeting room access, Complimentary printing', 'available', 'business.jpg');

-- Insert Sample Guest Reviews (for display on homepage)
INSERT INTO reviews (review_id, booking_id, guest_email, rating, comment, review_date) VALUES
('REV1', 'BK_SAMPLE_1', 'sarah@example.com', 5, 'An absolutely magnificent stay! The staff was incredibly attentive, and the room was luxuriously appointed. I felt like royalty!', NOW()),
('REV2', 'BK_SAMPLE_2', 'michael@example.com', 5, 'The Presidential Suite exceeded all expectations. The view, the amenities, the service - everything was perfect. Highly recommended!', NOW()),
('REV3', 'BK_SAMPLE_3', 'emily@example.com', 5, 'Best hotel experience I\'ve had! The dining was exquisite, the spa was relaxing, and the entire staff made us feel welcome.', NOW()),
('REV4', 'BK_SAMPLE_4', 'david@example.com', 5, 'Impeccable service and world-class amenities. This is the perfect destination for a romantic getaway. Will definitely return!', NOW()),
('REV5', 'BK_SAMPLE_5', 'jessica@example.com', 5, 'Stayed here with my family and we loved every minute. Kids had a blast at the pool, and parents enjoyed the spa. Unforgettable!', NOW());

-- Create Views for Common Queries
CREATE VIEW available_rooms AS
SELECT * FROM rooms WHERE availability_status = 'available';

CREATE VIEW upcoming_bookings AS
SELECT * FROM bookings WHERE check_in >= CURDATE() AND status = 'confirmed';

CREATE VIEW booking_summary AS
SELECT 
    COUNT(*) as total_bookings,
    SUM(total_price) as total_revenue,
    AVG(total_price) as avg_booking_value
FROM bookings WHERE status = 'confirmed';

-- ===== STORED PROCEDURES =====

-- Procedure to get available rooms for specific dates
DELIMITER //
CREATE PROCEDURE GetAvailableRooms(IN p_check_in DATE, IN p_check_out DATE)
BEGIN
    SELECT r.* FROM rooms r
    WHERE r.id NOT IN (
        SELECT room_id FROM bookings 
        WHERE status IN ('confirmed', 'pending')
        AND check_in < p_check_out 
        AND check_out > p_check_in
    );
END //
DELIMITER ;

-- Procedure to create a new booking
DELIMITER //
CREATE PROCEDURE CreateBooking(
    IN p_booking_id VARCHAR(50),
    IN p_guest_name VARCHAR(100),
    IN p_guest_email VARCHAR(100),
    IN p_guest_phone VARCHAR(15),
    IN p_room_id INT,
    IN p_check_in DATE,
    IN p_check_out DATE,
    IN p_nights INT,
    IN p_total_price DECIMAL(10, 2),
    IN p_special_requests TEXT,
    IN p_payment_method VARCHAR(50)
)
BEGIN
    INSERT INTO bookings (
        booking_id, guest_name, guest_email, guest_phone,
        room_id, check_in, check_out, nights,
        total_price, special_requests, payment_method, status
    ) VALUES (
        p_booking_id, p_guest_name, p_guest_email, p_guest_phone,
        p_room_id, p_check_in, p_check_out, p_nights,
        p_total_price, p_special_requests, p_payment_method, 'confirmed'
    );
END //
DELIMITER ;

-- ===== END OF DATABASE SCHEMA =====
