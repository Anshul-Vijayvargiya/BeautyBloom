# Bloom & Blush - Premium Salon & Spa

A complete front-end implementation and architecture reference for a luxury salon and spa website.

## Features

- **Responsive Landing Page:** High-end aesthetic using modern UI/UX principles (plush colors, sophisticated typography, subtle animations).
- **Dynamic Services & Gallery:** Handled via JavaScript (`js/data.js`), making it easy to swap content or connect to an API later.
- **6-Step Booking Wizard:** A fully functional front-end booking flow:
  1. Service Selection
  2. Date Selection (Custom Calendar)
  3. Time Slot Selection
  4. User Details
  5. Payment Options
  6. Confirmation
- **Admin Dashboard Mockup:** A reference HTML file (`admin.html`) showing how the salon owner manages appointments.
- **Backend Reference:** Express.js boilerplate (`backend-example.js`) outlining how to receive booking POST requests, handle validations, and send emails.

## File Structure

```text
/
├── index.html           # Main Landing Page & Booking Modal
├── admin.html           # Admin Dashboard Mockup
├── email-templates.html # Transactional Email HTML Template
├── css/
│   ├── style.css        # Core styles, variables, typography, layouts
│   └── booking.css      # Booking wizard specific styles
├── js/
│   ├── data.js          # Centralized data (services, gallery, team)
│   ├── main.js          # Core interactions (tabs, lightbox, nav)
│   └── booking.js       # 6-Step Wizard state machine and DOM manipulation
├── package.json         # Backend dependencies
├── .env.example         # Environment variables reference
├── README.md            # Project Overview
└── DEPLOYMENT.md        # Deployment guidelines
```

## Running Locally

Because this relies purely on Vanilla HTML/CSS/JS for the front-end, you can simply open `index.html` in your browser.
For local testing (if dealing with CORS or modules later), use a simple HTTP server:
```bash
npx serve
# or
python3 -m http.server 8000
```

## Integrating with a Backend

The current booking wizard stops at Step 6 and generates a local reference. To wire this up to a real database:
1. Open `js/booking.js`.
2. Locate the `handleConfirm()` function.
3. Replace the `setTimeout` simulation with a `fetch()` call to your API (e.g., `POST /api/bookings`).
4. Read `backend-example.js` for an example of how the server should handle that request.
