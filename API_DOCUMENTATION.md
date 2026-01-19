# StayInn API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
- JWT Token-based authentication
- Token sent in Authorization header: `Authorization: Bearer <token>`

---

## Endpoints

### Health Check

#### Check Server Status
```
GET /api/health
```

**Response (200):**
```json
{
  "status": "OK",
  "message": "Database connected"
}
```

---

## Rooms API

### Get All Rooms
```
GET /api/rooms
```

**Response (200):**
```json
[
  {
    "id": 1,
    "room_name": "Deluxe",
    "description": "Elegant room with modern amenities and city view",
    "price_per_night": 5000,
    "capacity": 2,
    "size_sqft": 300,
    "amenities": "Flat-screen TV, Premium bedding, Rainfall shower, Mini bar, Work desk, City view",
    "availability_status": "available",
    "image_url": "deluxe.jpg"
  },
  ...
]
```

### Get Room Details
```
GET /api/rooms/:id
```

**Path Parameters:**
- `id` (integer, required) - Room ID

**Response (200):**
```json
{
  "id": 1,
  "room_name": "Deluxe",
  "description": "Elegant room with modern amenities and city view",
  "price_per_night": 5000,
  "capacity": 2,
  "size_sqft": 300,
  "amenities": "Flat-screen TV, Premium bedding, Rainfall shower, Mini bar, Work desk, City view",
  "availability_status": "available",
  "image_url": "deluxe.jpg"
}
```

**Response (404):**
```json
{
  "error": "Room not found"
}
```

---

## Bookings API

### Create New Booking
```
POST /api/bookings
```

**Request Body:**
```json
{
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "+91-9876543210",
  "roomId": 1,
  "checkin": "2026-01-25",
  "checkout": "2026-01-28",
  "nights": 3,
  "totalPrice": 15000,
  "specialRequests": "Early check-in if possible",
  "paymentMethod": "credit-card"
}
```

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "bookingId": "BK1705592156789",
  "booking": {
    "bookingId": "BK1705592156789",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "guestPhone": "+91-9876543210",
    "roomId": 1,
    "checkin": "2026-01-25",
    "checkout": "2026-01-28",
    "nights": 3,
    "totalPrice": 15000,
    "bookingDate": "2026-01-19T10:30:00.000Z"
  }
}
```

### Get Guest Bookings
```
GET /api/bookings/:guestEmail
```

**Path Parameters:**
- `guestEmail` (string, required) - Guest's email address

**Response (200):**
```json
[
  {
    "id": 1,
    "booking_id": "BK20260115001",
    "guest_name": "John Doe",
    "guest_email": "john@example.com",
    "guest_phone": "+91-9876543210",
    "room_id": 1,
    "check_in": "2026-01-25",
    "check_out": "2026-01-28",
    "nights": 3,
    "total_price": 15000,
    "special_requests": "Early check-in if possible",
    "payment_method": "credit-card",
    "payment_status": "completed",
    "booking_date": "2026-01-19T10:30:00.000Z",
    "status": "confirmed"
  },
  ...
]
```

### Update Booking
```
PUT /api/bookings/:bookingId
```

**Path Parameters:**
- `bookingId` (string, required) - Booking ID

**Request Body:**
```json
{
  "checkin": "2026-01-26",
  "checkout": "2026-01-29",
  "nights": 3,
  "totalPrice": 15000
}
```

**Response (200):**
```json
{
  "message": "Booking updated successfully"
}
```

### Cancel Booking
```
DELETE /api/bookings/:bookingId
```

**Path Parameters:**
- `bookingId` (string, required) - Booking ID

**Response (200):**
```json
{
  "message": "Booking cancelled successfully"
}
```

---

## Contact API

### Submit Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "subject": "Inquiry about group bookings",
  "message": "We are planning a corporate retreat for 25 people. Could you provide group rates?"
}
```

**Response (201):**
```json
{
  "message": "Contact message sent successfully",
  "contactId": "CM1705592156789"
}
```

### Get All Contact Messages
```
GET /api/contact
```

**Response (200):**
```json
[
  {
    "id": 1,
    "contact_id": "CM1705592156789",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "subject": "Inquiry about group bookings",
    "message": "We are planning a corporate retreat for 25 people. Could you provide group rates?",
    "submitted_date": "2026-01-19T10:30:00.000Z",
    "status": "new",
    "response": null,
    "response_date": null
  },
  ...
]
```

---

## Users API

### Register New User
```
POST /api/users/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "USER1705592156789",
  "user": {
    "userId": "USER1705592156789",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  }
}
```

**Response (400):**
```json
{
  "error": "Email already registered"
}
```

### User Login
```
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "USER1705592156789",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Data Models

### Room
```javascript
{
  id: integer,
  room_name: string,
  description: string,
  price_per_night: decimal,
  capacity: integer,
  size_sqft: integer,
  amenities: string,
  availability_status: enum['available', 'occupied', 'maintenance'],
  image_url: string
}
```

### Booking
```javascript
{
  id: integer,
  booking_id: string,
  guest_name: string,
  guest_email: string,
  guest_phone: string,
  room_id: integer,
  check_in: date,
  check_out: date,
  nights: integer,
  total_price: decimal,
  special_requests: string,
  payment_method: string,
  payment_status: enum['pending', 'completed', 'failed'],
  booking_date: datetime,
  status: enum['confirmed', 'pending', 'cancelled', 'completed']
}
```

### Contact Message
```javascript
{
  id: integer,
  contact_id: string,
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  submitted_date: datetime,
  status: enum['new', 'read', 'resolved'],
  response: string,
  response_date: datetime
}
```

### User
```javascript
{
  id: integer,
  user_id: string,
  name: string,
  email: string,
  phone: string,
  password: string (hashed),
  registered_date: datetime,
  last_login: datetime,
  status: enum['active', 'inactive', 'suspended']
}
```

---

## Rate Limiting

Currently not implemented. Can be added using `express-rate-limit`.

---

## CORS

CORS is enabled for all origins. Update in production for security.

```javascript
app.use(cors());
```

---

## Testing with cURL

### Test Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

### Test Get Rooms
```bash
curl -X GET http://localhost:5000/api/rooms
```

### Test Create Booking
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

---

## Future Enhancements

- [ ] Implement rate limiting
- [ ] Add caching (Redis)
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Webhook support
- [ ] GraphQL API
- [ ] API versioning
- [ ] Comprehensive logging

---

**API Version**: 1.0.0  
**Last Updated**: January 19, 2026
