-- ===== STAYINN SAMPLE DATA =====
-- This file contains sample data for testing the StayInn application

-- Sample Users (passwords are hashed in real implementation)
INSERT INTO users (user_id, name, email, phone, password, registered_date, status) VALUES
('USER001', 'John Doe', 'john.doe@email.com', '+91-9876543210', 'hashedpassword123', NOW(), 'active'),
('USER002', 'Sarah Johnson', 'sarah.johnson@email.com', '+91-9123456789', 'hashedpassword456', NOW(), 'active'),
('USER003', 'Michael Chen', 'michael.chen@email.com', '+91-8888888888', 'hashedpassword789', NOW(), 'active');

-- Sample Bookings
INSERT INTO bookings (booking_id, guest_name, guest_email, guest_phone, room_id, check_in, check_out, nights, total_price, special_requests, payment_method, payment_status, booking_date, status) VALUES
('BK20260115001', 'John Doe', 'john.doe@email.com', '+91-9876543210', 5, '2026-01-20', '2026-01-23', 3, 45000.00, 'Early check-in if possible', 'credit-card', 'completed', NOW(), 'confirmed'),
('BK20260116002', 'Sarah Johnson', 'sarah.johnson@email.com', '+91-9123456789', 2, '2026-01-25', '2026-01-28', 3, 24000.00, 'Vegetarian meals preferred', 'debit-card', 'completed', NOW(), 'confirmed'),
('BK20260117003', 'Michael Chen', 'michael.chen@email.com', '+91-8888888888', 1, '2026-02-01', '2026-02-05', 4, 20000.00, NULL, 'upi', 'completed', NOW(), 'confirmed'),
('BK20260118004', 'Emily Rodriguez', 'emily.rodriguez@email.com', '+91-9999999999', 6, '2026-02-10', '2026-02-12', 2, 20000.00, 'High floor preferred', 'credit-card', 'pending', NOW(), 'pending'),
('BK20260119005', 'David Thompson', 'david.thompson@email.com', '+91-8765432109', 7, '2026-03-01', '2026-03-04', 3, 21000.00, 'Business meetings setup needed', 'net-banking', 'completed', NOW(), 'confirmed');

-- Sample Contact Messages
INSERT INTO contact_messages (contact_id, name, email, phone, subject, message, submitted_date, status) VALUES
('CM20260115001', 'Priya Patel', 'priya@email.com', '+91-9988776655', 'Group Booking Inquiry', 'We are planning a corporate retreat for 25 people. Could you provide group rates?', NOW(), 'new'),
('CM20260116002', 'Robert Smith', 'robert@email.com', '+91-9876543200', 'Event Hosting', 'Interested in hosting a wedding reception at your venue. Can we get details?', NOW(), 'new'),
('CM20260117003', 'Ananya Singh', 'ananya@email.com', '+91-8899776655', 'Room Facilities Feedback', 'Had an amazing stay! The service was exceptional.', NOW(), 'read'),
('CM20260118004', 'James Wilson', 'james@email.com', '+91-9988776600', 'Dining Reservation', 'Would like to make a reservation for dinner on 2026-01-25 for 6 people', NOW(), 'new');

-- Sample Payments
INSERT INTO payments (payment_id, booking_id, amount, payment_method, transaction_id, payment_date, status) VALUES
('PAY001', 'BK20260115001', 45000.00, 'credit-card', 'TXN123456789', NOW(), 'success'),
('PAY002', 'BK20260116002', 24000.00, 'debit-card', 'TXN123456790', NOW(), 'success'),
('PAY003', 'BK20260117003', 20000.00, 'upi', 'UPI987654321', NOW(), 'success'),
('PAY004', 'BK20260118004', 20000.00, 'credit-card', 'TXN123456791', NOW(), 'pending'),
('PAY005', 'BK20260119005', 21000.00, 'net-banking', 'NB123456792', NOW(), 'success');

-- Sample Reviews
INSERT INTO reviews (review_id, booking_id, guest_email, rating, comment, review_date) VALUES
('REV001', 'BK20260115001', 'john.doe@email.com', 5, 'Exceptional service and luxurious accommodations. The Presidential Suite was beyond expectations!', NOW()),
('REV002', 'BK20260116002', 'sarah.johnson@email.com', 5, 'Best hotel experience ever. Staff was very attentive to our needs.', NOW()),
('REV003', 'BK20260117003', 'michael.chen@email.com', 5, 'Perfect for business travel. All facilities available for meetings. Highly recommend!', NOW());

-- Verify Data
SELECT 'Users Count:' AS Record, COUNT(*) FROM users
UNION ALL
SELECT 'Rooms Count:', COUNT(*) FROM rooms
UNION ALL
SELECT 'Bookings Count:', COUNT(*) FROM bookings
UNION ALL
SELECT 'Contact Messages Count:', COUNT(*) FROM contact_messages
UNION ALL
SELECT 'Payments Count:', COUNT(*) FROM payments
UNION ALL
SELECT 'Reviews Count:', COUNT(*) FROM reviews;

-- Sample Query: Get available rooms for dates
-- CALL GetAvailableRooms('2026-02-15', '2026-02-18');

-- Sample Query: Get booking history for a guest
-- SELECT * FROM bookings WHERE guest_email = 'john.doe@email.com' ORDER BY booking_date DESC;

-- Sample Query: Get total revenue
-- SELECT SUM(total_price) as Total_Revenue FROM bookings WHERE status = 'confirmed';

-- Sample Query: Get recent contact messages
-- SELECT * FROM contact_messages ORDER BY submitted_date DESC LIMIT 10;
