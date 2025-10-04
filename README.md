# Healthcare Appointment System – Backend

A full-featured **backend system** for managing healthcare appointments, patients, doctors, and medical records. This system uses **PostgreSQL** for structured relational data and **MongoDB** for unstructured patient history and prescriptions.


## Tech Stack

* **Backend**: Node.js, Express.js
* **Databases**: PostgreSQL (relational), MongoDB (NoSQL)
* **Authentication**: JWT, bcrypt  
* **Environment Management**: dotenv

---

## Features

* **Authentication & Authorization**

  * JWT-based access & refresh tokens
  * Role-based access: Admin, Doctor, Patient
  * Password hashing with bcrypt 

* **Doctor Management**

  * Add/update availability
  * List doctors by specialization

* **Patient Management**

  * View profile and medical history
  * Book and cancel appointments

* **Appointment & Payment Management**

  * Schedule appointments with conflict checks
  * Link payments to appointments
  * Track payment status

* **Medical History**

  * Flexible records stored in MongoDB
  * Prescriptions, visit notes, and audit logs

---
 

## API Endpoints

### Auth

* `POST /auth/register` – Patient/Doctor signup
* `POST /auth/login` – Login
* `POST /auth/refresh` – Refresh JWT

### Doctor

* `GET /doctors` – List doctors by specialization
* `POST /doctors/availability` – Set working hours

### Patient

* `GET /patients/:id` – Profile + history from MongoDB

### Appointments

* `POST /appointments` – Book appointment with conflict check
* `GET /appointments/:id` – Appointment details
* `PUT /appointments/:id/cancel` – Cancel appointment

### Payments

* `POST /payments` – Initiate payment
* `GET /payments/:id` – Payment details

---

## Optimization & Scalability

* **Indexes**

  * PostgreSQL: `appointments.date, doctorId` for fast queries
  * MongoDB: compound index `patientId + doctorId` 
  * **Connection Pooling**: pg-pool for Postgres, connection pooling for MongoDB
  * **Rate Limiting**: To avoid abuse in APIs
---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/inkersal501/healthcare-appointment-system.git
cd healthcare-appointment-system
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env` (see below).

4. Start the server:

```bash
npm start
```

---

## Environment Variables

```env
# PostgreSQL
POSTGRESQL_USER
POSTGRESQL_PASSWORD
POSTGRESQL_DATABASE
POSTGRESQL_HOST
POSTGRESQL_PORT

# MongoDB
MONGODB_URI

# JWT
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
JWT_ACCESS_EXPIRATION
JWT_REFRESH_EXPIRATION

# Other configs
PORT
NODE_ENV
```

---

## Future Improvements

* Implement **real-time notifications** for appointments (Socket.IO)
* Add **email/SMS notifications**
* Add **analytics dashboard** for admins
* Integrate **full audit logging** for sensitive actions
* Support **multi-clinic scheduling** and **time zones**
