# Fully Automated E-commerce Web App

## Disclaimer

-   I created this with self taught knowledge and trial and error.
-   I am terrible at UI design.
-   If you encounter any bugs or have any constructive criticism I would love to hear about it!

Welcome to my Fully Automated E-commerce Web App! This project began as a simple photography portfolio and evolved into a robust e-commerce store, seamlessly integrating technologies to provide users with a streamlined and immersive shopping experience.:

# I am currently refactoring the whole codebase because the old was kind of terrible.

## Current Refactor Progress

### Order Lifecycle

-   ✅ Stripe checkout integration
-   ✅ Webhook to capture successful payments
-   ✅ Order saved to DB after purchase
-   ✅ Email on payment confirmation
-   ✅ Order fulfillment to Printify via cron worker
-   ✅ Email on shipment and delivery
-   ✅ Printify webhook for `shipped` and `delivered` events
-   ✅ Order lookup endpoint

### Store Features

-   ✅ Product fetching from Printify
-   ✅ Variant filtering
-   ✅ Cart system with add/remove
-   ✅ Session ID management
-   ✅ MongoDB persistence

### Infra / Automation

-   ✅ Worker using `node-cron`
-   ✅ Webhooks tested and working
-   ✅ Mongoose schemas defined and enforced
-   ✅ Nodemailer integration

---

## What's Next?

### 1. \*\*Admin Dashboard

-   Admin login & auth (could be simple token auth)
-   View all orders (pending, fulfilled, shipped)
-   Manually retry failed orders
-   Manually resend emails
-   Dashboard stats (orders/day, revenue, top products)

---

### 2. **Frontend Integration**

-   Integrate cart/checkout with session ID
-   Display dynamic product data from Printify
-   Show order status and tracking on user dashboard
-   Use `/api/order/:id` to show past order info

---

### 3. **Analytics & Logs**

-   Save webhook events to a `webhookLogs` collection
-   Log fulfillment attempts/failures
-   Add basic metrics tracking (total orders, total failed)
-   Consider integrating Sentry or LogRocket for production

---

### 4. **Security / Hardening**

-   Rate-limit cart/checkout APIs
-   Validate all input against schemas (Zod or Joi)
-   Add request auth for internal endpoints
-   Lock webhook endpoints with secret tokens (especially Stripe)

---

### 5. **Deployment Planning**

-   Containerize with Docker (optional)
-   Set up environment config for staging/production
-   Deploy to Render, Railway, Vercel (client), etc.
-   Set up email DNS if using custom domain (DKIM/SPF for deliverability)

## Features

-   **Full E-commerce Automation**: Our platform automates the entire e-commerce process, from product browsing to order fulfillment, ensuring a hassle-free experience for both buyers and me.
-   **Stripe API Integration**: Securely process payments using the Stripe API, guaranteeing safe and efficient transactions for our users.
-   **Printify API Integration**: Leverage Printify's API to list products, customize print options, and manage order fulfillment with ease.
-   **Session-Based User Authentication**: Say goodbye to tedious account creation processes. My platform utilizes session-based authentication, eliminating the need for users to create accounts while ensuring data security.
-   **Scalable and Reusable Framework**: Built on a scalable and reusable framework, my web app is equipped to handle growth and adapt to changing needs effortlessly.

## Technology Used

-   **Frontend**: Developed using React.js, offering a dynamic and responsive user interface.
-   **Backend**: Powered by Express.js and Node.js, ensuring robust server-side functionality.
-   **Database**: Utilizing MongoDB Compass for efficient data storage and management.
-   **Hosting**: Hosted on Render, providing a reliable and scalable hosting solution.

## Project Journey

This project started with a passion for photography and a desire to showcase and sell prints of captivating images. As it progressed, it evolved into a full-scale web app, merging two passions into one ambitious endeavor. I decided to try and create my own Shopify like store that would be extremely cost effective. I think I have reached this goal. This web app costs around $2-$5 a month to upkeep(I won't count my time because it was a learning experience). Along the way, I encountered challenges, made enhancements, and continuously refined my platform to offer the best possible experience to my customers.

## Recent Progress

### February 11, 2024

-   Overhauled webhook for seamless order processing with multiple products.
-   Enhanced checkout and order sending functionality for accurate data display.
-   Implemented order tracking and cancellation features for users.

### February 5, 2024

-   Completed order confirmation page with comprehensive details.
-   Introduced "My Orders" page for users to track their orders.
-   Implemented UI enhancements for improved navigation and aesthetics.

### February 2, 2024

-   Enhanced user experience with loading state indicators and animations.
-   Introduced intuitive order summary page for detailed insights.
-   Addressed challenges with session handling and database migration.

### January 31, 2024

-   Overhauled home page UI for responsiveness and added animations.
-   Improved variant buttons and product page navigation.
-   Resolved issues with shipping cost calculation and session management.

### January 25, 2024

-   Implemented shipping address collection for accurate cost calculation.
-   Managed duplicate products in the shopping cart efficiently.
-   Optimized session handling to minimize database usage.

### January 23, 2024

-   Introduced session-based shopping carts for a personalized experience.
-   Planned future optimizations for more efficient data retrieval.

## Future Plans

-   UI improvements for checkout success page and store navigation.
-   Image optimizations, database enhancements, and CDN integration.
-   Printify API admin utilities for streamlined product management.
