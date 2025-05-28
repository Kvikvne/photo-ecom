# Fully Automated E-commerce Web App

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
