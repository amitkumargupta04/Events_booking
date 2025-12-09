# Admin Events Dashboard

A responsive Admin Dashboard for managing events built with **React**, **Tailwind CSS**, **Axios**, **Framer Motion**, and **SweetAlert2**.  
Supports **desktop table view** with horizontal scroll and **mobile card view**. Includes **modal form** for creating and editing events.

---

## Features

- Admin can create, edit, and delete events.
- Event details include:
  - Title, Date, Location, Description
  - Total Seats, Available Seats, Price
  - Image URL
- Responsive design:
  - Desktop: table view with horizontal scroll
  - Mobile: stacked cards with scroll
- Modal form with animations (Framer Motion)
- Sweet alert notifications for CRUD actions
- Token-based authentication for admin
- Backend: Node.js + Express + MySQL

---

## Tech Stack

**Frontend:**

- React
- Tailwind CSS
- Axios
- Framer Motion
- SweetAlert2
- React Icons
- React Toastify

**Backend:**

- Node.js
- Express
- MySQL
- JWT (for authentication)
- dotenv

---

## Backend API Endpoints

| Method | Endpoint                        | Description                       | Auth Required |
|--------|---------------------------------|-----------------------------------|---------------|
| GET    | `/events/all-events`             | Get all events                    | ✅ Yes        |
| POST   | `/events/create`                 | Create a new event                | ✅ Yes        |
| PUT    | `/events/update/:id`             | Update an existing event          | ✅ Yes        |
| DELETE | `/events/delete/:id`             | Delete an event                   | ✅ Yes        |

**Request Headers for Auth:**

```http
Authorization: Bearer <token>
