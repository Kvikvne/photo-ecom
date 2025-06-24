# Photo Ecom: Fully Automated E-commerce Platform

## Overview

**Photo Ecom** is a fully automated e-commerce platform built with Next.js for the frontend and Express.js for the backend. It uses **Stripe** for payment processing and **Printify** for print-on-demand fulfillment. This project is a **showcase of my skills and custom-built to serve my own business needs** — selling photography prints online with minimal overhead.

The core idea is to eliminate reliance on platforms like Shopify or Etsy, allowing full control over the store while keeping hosting costs low and retaining 100% of the profits. Everything from product creation to checkout and fulfillment is handled automatically.

> **Live Example:** [kvikvne.com](https://www.kvikvne.com) — a production version of this app, featuring my photography prints.

---

## Key Highlights

- **Fully Automated After Setup:** Once a product is added, the system handles orders, payments, and shipping without any manual work.
- **Custom Product Creation Script:** A built-in script automatically creates a product in Printify, sets up a matching product and pricing structure in Stripe, and inserts everything into the database — **making product onboarding fast and seamless**.
- **No Platform Fees:** Unlike Shopify or Etsy, you keep all your profits. You only pay Stripe/Printify for payment processing and production.
- **Admin Dashboard (in progress):** A web interface to manage Printify products, pricing, and store settings — no redeploys or third-party dashboards required.
- **CLI Scaffold Coming Soon:** While this repo is tailored to my use case, I'm planning to release a CLI-based framework so others can easily generate and configure their own versions.

---

## Tech Stack

- **Frontend:** Next.js (React) – SSR-enabled UI
- **Backend:** Express.js (Node) – API logic and webhooks
- **Database:** MongoDB – product data, orders, contact submissions, and emails
- **Payments:** Stripe API – checkout sessions and webhooks
- **Fulfillment:** Printify API – print-on-demand integration

---

## Features

### ✅ Full Automation

From order placement to fulfillment, everything runs automatically. Stripe confirms the payment, and Printify fulfills the order without any need for you to step in.

### 💳 Seamless Payments with Stripe

Checkout uses Stripe's secure payment flow. PCI-compliant and customer-friendly.

### 📦 On-Demand Fulfillment via Printify

Printify handles printing and shipping. No need for inventory or manual logistics.

### 📦 Custom Product Fulfillment (Planned)

You’ll soon be able to add non-Printify products that you ship yourself — perfect for handmade items, limited releases, or physical inventory you want to handle in-house. These products will still be processed through Stripe and integrated into the same seamless checkout and order management flow.

### 🧰 Product Creation Script

A single script handles product setup:

1. Creates the product in **Printify**
2. Sets up the product and variants in **Stripe**
3. Inserts the final product into **MongoDB**

### 🛠️ Admin Dashboard (WIP)

Currently in development, the dashboard will let you:

- Sync or update Printify products
- Modify Stripe pricing
- Configure store settings
  All without touching code or external UIs.

### 🛒 Guest Checkout

No login or signup required — shopping is session-based and carts are stored in local storage. Order status is still available post-purchase.

### 💸 Cheap to Host

Designed to run on free or low-cost plans using services like Vercel (frontend), Render (backend), and MongoDB Atlas (database). (Currently costs around $7/month + domain.)

### ⚙️ Developer Friendly

The codebase is clean, modular, and easy to adapt for different niches or product types.

---

## Future Plans

While this repo is a custom implementation, I'm working on a **framework + CLI scaffold** that allows others to set up their own e-commerce store with similar automation. It will:

- Generate a frontend/backend project
- Connect your Printify and Stripe accounts
- Automatically configure products, pricing, and DB setup
- Support both Printify and custom-fulfilled products out of the box

---

## Final Thoughts

This project shows what's possible when you combine automation with modern developer tools. It’s a **low-maintenance, fully automated, and profit-maximizing** solution for solo creators, small businesses, or tech-savvy entrepreneurs.

Feel free to explore the code, open issues, or fork it for inspiration. If you're building something similar or have feedback, I’d love to hear from you.

**Happy building — and happy selling!**

---
