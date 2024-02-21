Fully Automated E-commerce Website project
============================================

(Currently a work in progress)

**_Most recent changes/progress (02/11/24) VERY CLOSE TO PRODUCTION!_**
--------
I've overhauled the webhook to seamlessly process orders with multiple products, eliminating the need for separate handling. This enhancement ensures that both the order confirmation page and order history page display accurate data, thanks to the improved checkout and order sending functionality. Furthermore, my API now efficiently communicates with both Stripe and Prifntify, dynamically assigning price IDs to each product SKU. This streamlines the process and removes the necessity for hard-coded values, ensuring precise tracking of costs by Stripe.

Users can now cancel and track orders via the My orders page.

I've also made significant improvements to session handling, switching to more robust cookies to maintain user and web app data persistence even after browser closure. Additionally, I've migrated my database to the cloud, a crucial step towards production readiness.

In addition to these backend enhancements, I've implemented various UI enhancements and layout adjustments for a smoother user experience. With these upgrades in place, I'm confident that the hosted version will be fully operational by next week.

also I am now learning setting cookies is an absolute nightmare

Changes/progress (02/05/24)
--------
Order Confirmation Page: Completed the order confirmation page with comprehensive order details after they complete a purchase.

My Orders Page: Implemented a new "My Orders" page that leverages session tracking to provide users with up-to-date order information. Users can now conveniently view their current and past orders, along with tracking details. (Note: Order cancellation feature is planned for future implementation.)

UI Enhancements:
Navigation Bar Redesign: Revamped the navigation bar for improved navigation and aesthetics.

User Interface Tweaks: Made several small UI adjustments to enhance the overall look and feel of the application.

Changes/progress (02/02/24)
--------
I've recently enhanced the user experience on this project by introducing loading state indicators and adding visually appealing animations to confirm successful actions or to tell the user something is loading.

Additionally, I've introduced an intuitive order summary page that the user gets redirected to automatically after completing a purchase. This page offers detailed insights into their order, including a breakdown of purchased items, costs, and a unique order number for reference. implementing this required backend modifications and new frontend utilities to ensure accurate presentation of user-specific information.

I have encountered persistent challenges related to unnecessary session creation. To address this, I optimized our route organization and refined our middleware implementation to minimize the accumulation of session data in the database. However, ongoing feature additions continue to introduce potential complications, necessitating ongoing efforts to manage session data effectively.

Lastly, I dedicated resources to improving the user interface of our product pages. These enhancements aim to enhance usability and visual appeal, creating a more seamless browsing experience for future customers.

Changes/progress (01/31/24)
--------
Complete UI overhaul on the home page, making it more responsive and adding animations with react-spring (I integrated TypeScript into my project to facilitate adding animations easier). Variant buttons on the product pages are now better and more user-friendly. Updated the home page gallery section to include links to individual prints based on the photo the user was interacting with.

Fixed the shipping cost API request (a string in the request was supposed to be an integer). Resolved an issue with the shipping info not being passed correctly through the Stripe session and webhook. Previously, since shipping data was collected before the Stripe session, users had to input shipping info twice. Now, it is passed as metadata in the Stripe session and sent out properly with the webhook. Additionally, addressed an issue where the webhook was creating multiple uninitialized sessions. Cart items are now removed after a checkout session is completed successfully.

Future plans:

Checkout success page
UI improvements (navigation and store page)
Image optimizations, database collection, and CDNs
Printify API admin utilities (Delete and publish products, order confirmation)



Changes/progress (01/25/24)
--------
I added a shipping address collection page before initializing a Stripe session. This enables me to submit a request to Printify with the user's order and shipping data, resulting in a precise shipping cost calculation. Now, when the Stripe session commences, the checkout process will reflect the accurate shipping price. To facilitate this, I expanded the scope of data collected from Printify when a product is added to the cart, prompting me to make slight modifications to the database structure and expand the server to handle and process more data coming from the client and api requests. 

I implemented a method to manage duplicate products in the shopping cart. Instead of duplicating the same product, the system checks whether the user already has the item in the cart. If so, it simply adjusts the quantity. Users can now manually increase or decrease the quantity of each item through the user interface.

I addressed a few issues related to user sessions. Some requests within the app inadvertently created uninitialized sessions, leading to the accumulation of unused sessions in the database. While this had no significant impact beyond being an inconvenience and increasing database storage usage, I resolved the issue to optimize the system.

Looking ahead, my next focus is on further refining product and API setup to facilitate testing of the checkout process with a diverse range of products. Adjustments may be necessary in how shipping is calculated during this phase.

(As of now, this web store should be significantly more cost-effective than platforms such as Shopify, considering the estimated monthly expenses.)


Change/progress (01/23/24)
--------
Implemented user sessions, enabling session-based shopping carts for a personalized user experience. The decision to avoid user authentication through account creation was made to streamline the user journey, eliminating the need for unnecessary account setup. Currently, each item added to the cart is stored individually in the collection, requiring requests to filter through all items to find those associated with the correct sessionID.

Future plans include optimizing this process by creating individual carts where a user's items are stored in a single document. This improvement aims to reduce the request's workload, as it will only need to filter through the relevant cart items rather than the entire cart collection, resulting in a more efficient data retrieval process.

Introduction
------------

Welcome to the Fully Automated E-commerce Website project---Integrated Stripe's API for secure payment processing and leveraged Printify's API to efficiently list products and manage order fulfillment. The checkout process seamlessly stores user carts in the database, directing them to a secure Stripe page for payment and shipping details. Upon checkout, a webhook triggers a streamlined request to Printify, automating the production and shipment of orders for a seamless end-to-end user experience.


Features
--------

-   Photography Portfolio: Navigate through a curated collection of visually stunning photographs, thoughtfully categorized for easy exploration.

-   E-commerce Integration: Effortlessly browse and purchase high-quality prints of showcased photographs directly from the website.

-   Product Variants: Explore different print sizes, styles, and customization options for each photograph, providing a diverse range of choices.

-   Shopping Cart: Add desired prints to the shopping cart, ensuring a streamlined and user-friendly checkout experience.

-   Printify Integration: Leveraging Printify's API for automation ensures a consistent and reliable product offering, enhancing the overall e-commerce process.

Technologies Used
-----------------

-   React.js: Frontend development for a responsive and interactive user interface.
-   Node.js: Backend server environment for handling server-side logic.
-   Express.js: Web application framework for Node.js, facilitating server-side development.
-   MongoDB: Database management for storing and retrieving data efficiently.
-   Printify API: Integration for streamlined e-commerce operations, including product customization and order processing.
-   Stripe: Easy and secure payment proccessing.
-   Netlify: Hosting service for frontend deployment.
-   Heroku: Cloud platform for backend deployment.
-   MongoDB Atlas: Cloud-based database service for MongoDB, ensuring data scalability and reliability.
-   Amazon S3: Cloud storage service for securely storing and serving images.