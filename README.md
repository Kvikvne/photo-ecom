Fully Automated E-commerce Website project
============================================

(Currently a work in progress)

Most recent changes/progress (01/23/24)
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