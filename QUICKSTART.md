# StayInn - Quick Start Guide

## Getting Started in 5 Minutes

### Option 1: Run Frontend Only (No Backend Required)

1. **Open the website**
   ```bash
   # Navigate to the frontend folder
   cd frontend
   
   # Open index.html in your browser (Chrome/Firefox/Safari)
   # Or use a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

2. **Features Available:**
   - ✅ Browse home page with hero section
   - ✅ View guest reviews
   - ✅ Browse all 7 room types
   - ✅ Complete booking process
   - ✅ View booking history (stored locally)
   - ✅ Contact form submission
   - ✅ Sign in/Registration system
   - ✅ Download booking details

**Note:** Data is stored in browser's Local Storage. Closing browser or clearing storage will reset data.

---

### Option 2: Full Stack Setup (Frontend + Backend + Database)

#### Step 1: Database Setup

```bash
# Open MySQL Command Line
mysql -u root -p

# Run schema
source path/to/database/schema.sql

# Run sample data (optional)
source path/to/database/sample_data.sql

# Verify installation
USE stayinn;
SELECT COUNT(*) FROM rooms;  -- Should show 7 rooms
```

#### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=stayinn

# Start server
npm start

# Server should run on http://localhost:5000
# Test: http://localhost:5000/api/health
```

#### Step 3: Frontend Setup

```bash
cd frontend

# Start a local server
python -m http.server 8000

# Or use Node.js:
npx http-server

# Visit: http://localhost:8000
```

---

## Testing the Application

### Test Account (Frontend Only)
- Email: demo@stayinn.com
- Password: demo123456

### Test Booking Flow
1. Go to home page
2. Fill booking form (any future dates)
3. Click "Search"
4. Select a room and click "View Details"
5. Click "Proceed to Booking"
6. Fill guest information
7. Select payment method
8. Click "Confirm Booking"
9. See confirmation popup
10. Go to "My Bookings" to view booking

### Test Contact Form
1. Go to "Contact" page
2. Fill contact form
3. Click "Send Message"
4. See success notification

---

## API Testing (Postman/cURL)

### Get All Rooms
```bash
curl http://localhost:5000/api/rooms
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "guestPhone": "9876543210",
    "roomId": 1,
    "checkin": "2026-01-25",
    "checkout": "2026-01-28",
    "nights": 3,
    "totalPrice": 15000,
    "paymentMethod": "credit-card"
  }'
```

### Get Bookings for Guest
```bash
curl http://localhost:5000/api/bookings/john@example.com
```

---

## File Structure Overview

```
StayInn/
├── frontend/
│   ├── index.html              # Home page
│   ├── css/                    # Stylesheets
│   │   ├── style.css           # Main styles
│   │   ├── rooms.css
│   │   ├── booking.css
│   │   ├── my-bookings.css
│   │   ├── contact.css
│   │   └── signin.css
│   ├── js/                     # JavaScript files
│   │   ├── main.js
│   │   ├── rooms.js
│   │   ├── booking.js
│   │   ├── my-bookings.js
│   │   ├── contact.js
│   │   └── signin.js
│   └── pages/                  # Additional pages
│       ├── rooms.html
│       ├── booking.html
│       ├── my-bookings.html
│       ├── contact.html
│       ├── signin.html
│       └── dining.html
├── backend/
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env.example
├── database/
│   ├── schema.sql              # Database schema
│   └── sample_data.sql         # Sample data
└── README.md                   # Full documentation
```

---

## Features Quick Reference

### 🏠 Home Page
- Welcome message and hero section
- Booking search form
- 5 guest reviews
- Promotional banner
- Call to action

### 🛏️ Rooms Page
- 7 room types with prices
- Room details modal
- Price calculation for selected nights
- Add to booking

### 📝 Booking Page
- Guest information form
- Payment method selection
- Card details form
- Booking confirmation
- Download receipt

### 📋 My Bookings
- View all bookings
- Booking details
- Modify booking option
- Cancel booking
- Download booking

### 📞 Contact Page
- Contact form
- Hotel contact information
- Operating hours
- Our story section

### 🔐 Sign In Page
- Login with email/password
- Registration form
- Remember me option
- Guest continue option

---

## Color Scheme

- **Primary**: #1a1a2e (Dark Blue)
- **Secondary**: #d4af37 (Gold)
- **Accent**: #c41e3a (Red)
- **Background**: #f8f8f8 (Light Gray)

---

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile Browsers

---

## Troubleshooting

### Issue: "Cannot find module"
**Solution:**
```bash
cd backend
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
Edit `.env` and change PORT to 5001 or higher

### Issue: "MySQL Connection Error"
**Solution:**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists: `CREATE DATABASE stayinn;`

### Issue: "CORS Error"
**Solution:**
- Make sure backend is running
- Frontend and backend URLs are correct

---

## Next Steps

1. **Customize Design**: Edit colors in `frontend/css/style.css`
2. **Add More Rooms**: Insert in database or frontend array
3. **Integrate Payment Gateway**: Add Razorpay/Stripe API
4. **Email Notifications**: Configure nodemailer in backend
5. **Admin Dashboard**: Create admin panel
6. **Mobile App**: Convert to React Native

---

## Contact & Support

For issues or questions, contact StayInn:
- 📧 Email: info@stayinn.in
- 📞 Phone: +91-8384-123456 (24/7)
- 🏢 Address: Kalburgi, Karnataka, India

---

## Version Info

- **Version**: 1.0.0
- **Last Updated**: January 19, 2026
- **Status**: Production Ready
- **License**: ISC

---

Happy Booking! 🎉
