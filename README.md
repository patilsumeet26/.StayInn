# StayInn - Luxury Hotel Booking Website

A premium hotel booking website featuring luxury rooms, seamless booking experience, and exceptional service.

## Project Overview

StayInn is a full-stack hotel booking website designed to provide users with an elegant and intuitive interface for browsing rooms, making reservations, and managing bookings. The platform combines cutting-edge frontend technology with a robust backend API.

## Features

### Frontend Features
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Premium UI**: Elegant design with luxury color scheme
- **Room Browsing**: Browse 7 room types with detailed information
- **Booking System**: Complete booking flow with guest information and payment options
- **Booking Management**: View, modify, and cancel bookings
- **User Authentication**: Sign-in and registration system
- **Contact Form**: Get in touch with hotel staff
- **Reviews Section**: Display guest testimonials

### Room Types
1. **Deluxe** - ₹5,000/night
2. **King Suite** - ₹8,000/night
3. **Executive Double Room** - ₹6,500/night
4. **Standard Queen Room** - ₹4,500/night
5. **Presidential Suite** - ₹15,000/night
6. **Family Suite** - ₹10,000/night
7. **Business Class Room** - ₹7,000/night

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with flexbox and grid
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Playfair Display, Montserrat)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
StayInn/
├── frontend/
│   ├── index.html                 # Home page
│   ├── css/
│   │   ├── style.css             # Main styles
│   │   ├── rooms.css             # Rooms page styles
│   │   ├── booking.css           # Booking page styles
│   │   ├── my-bookings.css       # My Bookings page styles
│   │   ├── contact.css           # Contact page styles
│   │   └── signin.css            # Sign In page styles
│   ├── js/
│   │   ├── main.js               # Main JavaScript
│   │   ├── rooms.js              # Rooms page logic
│   │   ├── booking.js            # Booking logic
│   │   ├── my-bookings.js        # Bookings management
│   │   ├── contact.js            # Contact form
│   │   └── signin.js             # Authentication
│   └── pages/
│       ├── rooms.html            # Browse rooms
│       ├── booking.html          # Booking form
│       ├── my-bookings.html      # Booking history
│       ├── contact.html          # Contact page
│       ├── dining.html           # Dining (placeholder)
│       └── signin.html           # Sign in/register
├── backend/
│   ├── server.js                 # Express server
│   ├── package.json              # Dependencies
│   └── .env.example              # Environment variables
└── database/
    └── schema.sql                # Database schema
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=stayinn
   PORT=5000
   JWT_SECRET=your-secret-key
   ```

5. **Create database**
   ```bash
   mysql -u root -p < ../database/schema.sql
   ```

6. **Start server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Open in browser**
   Simply open `frontend/index.html` in your web browser, or serve via a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server frontend
   ```

2. **Access the website**
   Open `http://localhost:8000` in your browser

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get specific room details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:guestEmail` - Get guest bookings
- `PUT /api/bookings/:bookingId` - Update booking
- `DELETE /api/bookings/:bookingId` - Cancel booking

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

## Design Specifications

### Color Scheme
- **Primary**: #1a1a2e (Dark Blue)
- **Secondary**: #d4af37 (Gold)
- **Accent**: #c41e3a (Crimson Red)
- **Light Background**: #f8f8f8
- **White**: #ffffff

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Montserrat (sans-serif)

### Features
- **Font Icons**: Font Awesome 6.4.0
- **Responsive Breakpoints**: 1024px, 768px, 480px

## Key Features Implementation

### 1. Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Media queries for all breakpoints

### 2. Booking System
- Date selection with validation
- Automatic price calculation
- Guest information form
- Multiple payment methods
- Booking confirmation

### 3. User Management
- Registration and login
- Password hashing
- Session management
- Remember me functionality

### 4. Data Storage
- Local Storage for client-side data
- MySQL database for server-side persistence

## Usage Guide

### For Guests

1. **Browse Rooms**
   - Go to "Rooms" section
   - View room details and amenities
   - Check pricing and availability

2. **Make a Booking**
   - Select check-in and check-out dates
   - Choose number of guests
   - Select a room
   - Fill guest information
   - Complete payment
   - Receive confirmation

3. **Manage Bookings**
   - Visit "My Bookings" section
   - View booking history
   - Modify or cancel bookings
   - Download booking details

4. **Contact Hotel**
   - Fill contact form
   - Reach out to specific departments
   - Get instant confirmation

### For Administrators

1. **Database Management**
   - Add/edit rooms
   - Manage bookings
   - Track payments
   - Monitor contact messages

2. **Backend API**
   - RESTful endpoints for all operations
   - JWT authentication
   - Error handling

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication
- **CORS**: Cross-Origin Resource Sharing enabled
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Prepared statements with parameterized queries

## Performance Considerations

- **Frontend**: Lazy loading, optimized images, minified CSS/JS
- **Backend**: Connection pooling, indexed database queries
- **Database**: Indexes on frequently queried columns

## Future Enhancements

- Email notifications
- Payment gateway integration (Stripe, Razorpay)
- User reviews and ratings
- Room availability calendar
- Admin dashboard
- Analytics and reporting
- Multi-language support
- Mobile app

## Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify credentials in .env file
- Ensure database exists

### Port Already in Use
- Change PORT in .env
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### CORS Issues
- Ensure frontend and backend URLs are configured correctly
- Check CORS headers in Express server

## Support & Contact

**Hotel Information:**
- Address: Kalburgi, Karnataka, India
- Phone: +91-8384-123456 (24/7)
- Email: info@stayinn.in
- Reservations: booking@stayinn.in
- Events: events@stayinn.in

**Hours:**
- Reception: 24/7
- Concierge: 6 AM - 11 PM
- Restaurant: 6 AM - 11 PM

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please follow the project structure and coding standards.

---

**Version**: 1.0.0  
**Last Updated**: January 19, 2026  
**Status**: Production Ready
