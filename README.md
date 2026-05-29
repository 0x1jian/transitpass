# 🚌 TransitPass – Passenger Booking System

A full-featured CRUD web application for managing passenger ticket reservations,
built with **React** + **JSON Server**.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Create** | Add new passenger bookings via modal form with validation |
| **Read** | View all bookings in a sortable table + dashboard summary |
| **Update** | Edit any booking inline via the same modal |
| **Delete** | Remove bookings with a confirmation dialog |
| **Search** | Real-time search by name, email, route, or seat |
| **Filter** | Filter by Status (Confirmed / Pending / Cancelled) and Ticket Type |
| **Status Badges** | Color-coded badges for each booking status |
| **Dashboard** | Summary cards, status breakdown chart, popular routes, recent bookings |
| **Toasts** | Success/error notifications for every action |
| **Responsive** | CSS Grid layout adapts from desktop → tablet → mobile |

---

## 🛠 Tech Stack

- **React 18** – UI library
- **JSON Server 0.17** – Fake REST API (reads/writes `db.json`)
- **CSS Grid** – Responsive layout system
- **Concurrently** – Runs both servers at once
- **Custom CSS** – Industrial/utilitarian dark theme with orange accents

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the app (React + JSON Server together)
```bash
npm start
```

This runs:
- **React app** → http://localhost:3000
- **JSON Server API** → http://localhost:3001

---

## 📁 Project Structure

```
transit-booking/
├── db.json                        # JSON Server database (seed data)
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.jsx                    # Root component, data fetching, CRUD handlers
    ├── index.js                   # React entry point
    ├── styles/
    │   └── global.css             # Design system & CSS Grid layout
    ├── utils/
    │   └── api.js                 # Fetch wrapper for JSON Server
    ├── hooks/
    │   └── useToast.js            # Toast notification state hook
    ├── components/
    │   ├── Sidebar.jsx            # Navigation sidebar
    │   ├── BookingModal.jsx       # Create / Edit form modal
    │   ├── ConfirmModal.jsx       # Delete confirmation dialog
    │   └── ToastContainer.jsx     # Toast notification renderer
    └── pages/
        ├── Dashboard.jsx          # Summary stats & charts
        └── BookingsPage.jsx       # Main CRUD table page
```

---

## 📊 Data Model (Booking)

```json
{
  "id": 1,
  "passengerName": "Maria Santos",
  "email": "maria@email.com",
  "phone": "+63 912 345 6789",
  "route": "Manila → Batangas",
  "departureDate": "2026-05-25",
  "departureTime": "06:00",
  "seatNumber": "12A",
  "ticketType": "Economy",
  "status": "Confirmed",
  "fare": 250,
  "createdAt": "2026-05-19T08:00:00Z"
}
```

---

## 🎨 Design

**Aesthetic**: Industrial / Utilitarian — dark navy backgrounds, warm orange accents,
monospaced data presentation, clean grid-based layout.

**Fonts**: Syne (display headings) + DM Sans (body text)

**Color Palette**:
- Background: `#0f1117`
- Surface: `#181c27`
- Accent: `#f97316` (orange)
- Success: `#22c55e` · Warning: `#eab308` · Danger: `#ef4444`
