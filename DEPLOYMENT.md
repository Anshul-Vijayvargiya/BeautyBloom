# Deployment Guide

This document outlines how to take the Bloom & Blush front-end and deploy it to production, alongside recommendations for backend hosting.

## 1. Deploying the Static Front-End

Since the frontend is built using standard HTML, CSS, and Vanilla JavaScript, it can be hosted on any static file hosting service.

### Option A: Netlify / Vercel (Recommended)
These platforms provide free tier static hosting with built-in CDN, SSL, and continuous deployment from GitHub.

**Steps:**
1. Push this repository to GitHub/GitLab/Bitbucket.
2. Log into Netlify or Vercel.
3. Select "Add New Site" and choose your repository.
4. Leave the build command empty (or `npm run build` if you later add bundlers).
5. Set the publish directory to the root `/` (or `/dist` if bundling).
6. Click Deploy.

### Option B: AWS S3 + CloudFront
For higher traffic or enterprise scale:
1. Create an S3 Bucket and enable Static Website Hosting.
2. Upload the `index.html`, `css/`, and `js/` folders to the bucket.
3. Setup CloudFront pointing to the S3 Bucket for global caching and HTTPS.

## 2. Deploying the Backend

If you choose to implement the Node.js API (referenced in `backend-example.js`), you will need a server environment.

### Option A: Render / Heroku
Great for simple Node.js APIs.
1. Create a new Web Service.
2. Connect the repository.
3. Set the start command to `node backend-example.js`.
4. Add environment variables (from `.env.example`).

### Option B: Serverless (AWS Lambda / Vercel Functions)
If using Next.js or Vercel, you can convert `backend-example.js` endpoints into Serverless Functions.

## 3. Connecting Frontend to Backend in Production

Currently, `js/booking.js` uses `setTimeout` to simulate an API request.
Before going live:
1. Deploy the backend API and get the production URL (e.g., `https://api.bloomandblush.com`).
2. In `js/booking.js`, replace the simulation with:
```javascript
const response = await fetch('https://api.bloomandblush.com/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingState)
});
if (response.ok) {
   goToStep(6);
}
```
3. Ensure CORS is correctly configured on your backend to accept requests from your frontend domain.

## 4. Email Configuration
Make sure your SMTP or API credentials for SendGrid/Mailgun are added to the backend environment variables in production. Test the email flow thoroughly using the `email-templates.html` layout.
