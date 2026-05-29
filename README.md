# TransitPass – Passenger Booking System

A full-featured CRUD web application for managing passenger ticket reservations,
built with **React** + **JSON Server**.

---

## Features

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

## Tech Stack

- **React 18** – UI library
- **JSON Server 0.17** – Fake REST API (reads/writes `db.json`)
- **CSS Grid** – Responsive layout system
- **Concurrently** – Runs both servers at once
- **Custom CSS** – Industrial/utilitarian dark theme with orange accents

---

## Getting Started

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

