# Fully Automated E-commerce Web App

## Disclaimer

-   I created this with self taught knowledge and trial and error.
-   I am terrible at UI design.
-   If you encounter any bugs or have any constructive criticism I would love to hear about it!

Welcome to my Fully Automated E-commerce Web App! This project began as a simple photography portfolio and evolved into a robust e-commerce store, seamlessly integrating technologies to provide users with a streamlined and immersive shopping experience.:

# I am currently refactoring the whole codebase because the old was kind of terrible.

## 🚧 Refactor Progress – May 2025

### Order Lifecycle

-   ✅ **Stripe Checkout** integration with shipping info collection
-   ✅ **Webhook listener** for `checkout.session.completed` to store orders
-   ✅ **MongoDB** order persistence with session-based tracking
-   ✅ **Order enrichment** with Printify API after fulfillment
-   ✅ **Email notifications** on payment confirmation, shipping, and delivery
-   ✅ **Cancelation flow** with refund via Stripe and cancel request to Printify
-   ✅ **Printify webhooks** for `order:shipment:created` and `order:fulfilled`
-   ✅ **Order lookup** via session ID or user-supplied order ID

### Store Features

-   ✅ **Product fetching** from Printify API
-   ✅ **ProductVariant model** to cache product details and store Stripe price IDs
-   ✅ **Variant filtering** (e.g. size, style)
-   ✅ **LocalStorage cart** tied to session ID with add/remove support
-   ✅ **Storefront pages** for prints and accessories
-   ✅ **Order success page** with pricing breakdown and user actions
-   ✅ **My Orders page** with both automatic (session-based) and manual lookup

### Backend Infrastructure (Node.js + Express)

-   ✅ **Centralized API server** with routes for orders, checkout, email, and products
-   ✅ **MongoDB collections**: `Orders`, `Emails`, `ProductVariants`
-   ✅ **`node-cron` worker** for polling and dispatching new Printify orders
-   ✅ **Webhook handlers** for Stripe and Printify with logging and validation
-   ✅ **Email subscription endpoint** with conflict handling (409)
-   ✅ **Nodemailer** setup for transactional emails (payment, shipment, cancelation)
-   ✅ **Mongoose schemas** with strict type enforcement

### Frontend Integration (Next.js + TypeScript)

-   ✅ **Session-aware cart/checkout** tied to backend session ID
-   ✅ **Dynamic product rendering** from Printify + local cache fallback
-   ✅ **Validated shipping form** (Zod + React Hook Form)
-   ✅ **Conditional UI** for cancelation and tracking links
-   ✅ **Page structure**: Home, About, Store, Cart, Checkout, My Orders, Success
-   ✅ **Mobile responsive design** using Tailwind CSS

---

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
