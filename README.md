# MediQueue: Doctor Appointment Booking and Queue Management (Prototype)

A browser-based prototype with two parts that will share one data model in the full system:

- **Patient website** (`patient/`): sign up, log in, choose locality, filter clinics and hospitals, view live queue, book a slot, get a token, see "My appointments".
- **Doctor dashboard** (`doctor/`): doctor login, today's queue, call next patient, complete or no-show, walk-ins, slot blocking, pause bookings, statistics.

All clinics, doctors, patients and queue numbers are **sample data**.

## Folder structure

```
mediqueue/
├── index.html                 Landing page: choose patient or doctor
├── README.md
├── assets/
│   └── css/
│       └── base.css           Shared design tokens, reset, typography, focus, labels
├── patient/
│   ├── index.html             Patient website (login/sign-up + app + dialogs)
│   ├── css/
│   │   └── patient.css        Patient-only styles
│   └── js/
│       ├── storage.js         Helpers ($, esc), localStorage wrapper, password hashing
│       ├── data.js            Sample localities, clinics, hospitals and doctors
│       ├── auth.js            Sign up, log in, session, log out
│       ├── booking.js         Filters, doctor list, booking dialog, token, My appointments
│       └── app.js             Start-up: show login or restore session
├── doctor/
│   ├── index.html             Doctor login + dashboard
│   ├── css/
│   │   └── doctor.css         Doctor-only styles
│   └── js/
│       ├── utils.js           Helpers ($, esc, patient factory)
│       ├── data.js            Four sample doctors: patients, slots, durations
│       ├── auth.js            Demo accounts list, sign in / sign out
│       └── queue.js           Call next, complete, no-show, slots, walk-ins, stats, render
└── docs/
    ├── MediQueue-Report.docx
    └── MediQueue-Presentation.pptx
```

Scripts are plain (non-module) scripts loaded in the order shown in each `index.html`, so the project works by double-clicking `index.html`, without a server.

## Run

1. Open `index.html` in a browser (or use VS Code Live Server / `npx serve`).
2. Pick **Patient website** or **Doctor dashboard**.

Fonts load from Google Fonts; without internet the page falls back to system fonts.

## Demo logins (doctor dashboard)

| Doctor ID | Password | Doctor |
|---|---|---|
| ananya | ananya@123 | Dr. Ananya Rao, General Physician, Sunrise Care Hospital |
| mahesh | mahesh@123 | Dr. Mahesh Gowda, Cardiologist, Sunrise Care Hospital |
| fatima | fatima@123 | Dr. Fatima Sheikh, Pediatrician, Lakeview Clinic |
| ravi | ravi@123 | Dr. Ravi Kumar, Orthopedic, City Central Hospital |

Patients create their own account on the sign-up form (10-digit mobile number and a password of at least 6 characters).

## How data is stored (prototype)

- Patient accounts: browser `localStorage` key `mq_users` (name, salt, SHA-256 hash; never the plain password).
- Session: `mq_session`. Appointments: `mq_appts_<mobile>`. Chosen locality: `mq_area`.
- Doctor dashboards keep their state in memory only, so refreshing resets them.
- The patient site and the doctor dashboard are **not connected** yet.

## Moving to the full MERN system

| Prototype file | Becomes |
|---|---|
| `patient/js/data.js`, `doctor/js/data.js` | MongoDB collections: hospitals, doctors, slots, appointments, patients |
| `patient/js/auth.js`, `doctor/js/auth.js` | `POST /api/auth/signup`, `POST /api/auth/login` with bcrypt and JWT |
| `patient/js/booking.js` | `GET /api/doctors?locality=&type=&specialty=`, `POST /api/appointments` |
| `doctor/js/queue.js` | `GET /api/doctor/queue`, `PATCH /api/appointments/:id/status`, `POST /api/walkins`, `PATCH /api/slots/:id` |
| HTML + CSS | React components (Login, DoctorList, BookingDialog, QueuePanel, SlotsPanel) |

Suggested backend layout: `server/` with `models/`, `routes/`, `controllers/`, `middleware/auth.js`, and `client/` for the React app.
