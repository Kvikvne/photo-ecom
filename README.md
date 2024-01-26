Fully Automated E-commerce Website project
============================================

(Currently a work in progress)

**_Most recent changes/progress (01/25/24)_**
--------
I added a shipping address collection page before initializing a Stripe session. This enables me to submit a request to Printify with the user's order and shipping data, resulting in a precise shipping cost calculation. Now, when the Stripe session commences, the checkout process will reflect the accurate shipping price. To facilitate this, I expanded the scope of data collected from Printify when a product is added to the cart, prompting me to make slight modifications to the database structure and expand my server to handle an process more data coming from the client and api requests. 

I implemented a methode to manage duplicate products in the shopping cart. Instead of duplicating the same product, the system checks whether the user already has the item in the cart. If so, it simply adjusts the quantity. Users can now manually increase or decrease the quantity of each item through the user interface.

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