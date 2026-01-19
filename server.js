// ===== STAYINN BACKEND SERVER =====
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'stayinn',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
app.get('/api/health', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT 1');
        conn.release();
        res.json({ status: 'OK', message: 'Database connected' });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
});

// ===== ROOMS API =====
app.get('/api/rooms', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rooms] = await conn.query('SELECT * FROM rooms');
        conn.release();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/rooms/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [room] = await conn.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        conn.release();
        
        if (room.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== BOOKINGS API =====
app.post('/api/bookings', async (req, res) => {
    const { guestName, guestEmail, guestPhone, roomId, checkin, checkout, nights, totalPrice, specialRequests, paymentMethod } = req.body;

    try {
        const conn = await pool.getConnection();
        
        const bookingId = 'BK' + Date.now();
        const bookingDate = new Date();

        const [result] = await conn.query(
            'INSERT INTO bookings (booking_id, guest_name, guest_email, guest_phone, room_id, check_in, check_out, nights, total_price, special_requests, payment_method, booking_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [bookingId, guestName, guestEmail, guestPhone, roomId, checkin, checkout, nights, totalPrice, specialRequests || null, paymentMethod, bookingDate, 'confirmed']
        );

        conn.release();
        
        res.status(201).json({
            message: 'Booking created successfully',
            bookingId,
            booking: {
                bookingId,
                guestName,
                guestEmail,
                guestPhone,
                roomId,
                checkin,
                checkout,
                nights,
                totalPrice,
                bookingDate
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/bookings/:guestEmail', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [bookings] = await conn.query('SELECT * FROM bookings WHERE guest_email = ? ORDER BY booking_date DESC', [req.params.guestEmail]);
        conn.release();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/bookings/:bookingId', async (req, res) => {
    const { checkin, checkout, nights, totalPrice } = req.body;

    try {
        const conn = await pool.getConnection();
        
        await conn.query(
            'UPDATE bookings SET check_in = ?, check_out = ?, nights = ?, total_price = ? WHERE booking_id = ?',
            [checkin, checkout, nights, totalPrice, req.params.bookingId]
        );

        conn.release();
        res.json({ message: 'Booking updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/bookings/:bookingId', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        
        await conn.query('UPDATE bookings SET status = ? WHERE booking_id = ?', ['cancelled', req.params.bookingId]);

        conn.release();
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== CONTACT FORM API =====
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    try {
        const conn = await pool.getConnection();
        
        const contactId = 'CM' + Date.now();
        const submittedDate = new Date();

        await conn.query(
            'INSERT INTO contact_messages (contact_id, name, email, phone, subject, message, submitted_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [contactId, name, email, phone || null, subject, message, submittedDate, 'new']
        );

        conn.release();
        
        // TODO: Send email notification
        
        res.status(201).json({
            message: 'Contact message sent successfully',
            contactId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/contact', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [messages] = await conn.query('SELECT * FROM contact_messages ORDER BY submitted_date DESC');
        conn.release();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== USERS API =====
app.post('/api/users/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const conn = await pool.getConnection();
        
        // Check if user exists
        const [existing] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (existing.length > 0) {
            conn.release();
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = 'USER' + Date.now();
        const registeredDate = new Date();

        await conn.query(
            'INSERT INTO users (user_id, name, email, phone, password, registered_date) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, email, phone, hashedPassword, registeredDate]
        );

        conn.release();
        
        res.status(201).json({
            message: 'User registered successfully',
            userId,
            user: { userId, name, email, phone }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const conn = await pool.getConnection();
        
        const [users] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        conn.release();

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];
        const bcrypt = require('bcryptjs');
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { userId: user.user_id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// ===== 404 HANDLING =====
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`StayInn Backend Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
