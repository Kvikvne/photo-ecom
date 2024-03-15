const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const printifyApi = require("../services/printifyService");

// Endpoint to handle Printify webhook shipping notifications
router.post("/shipped", async (req, res) => {
  const { body } = req;

  // Check if this is a shipping notification
  if (body.type === "order:shipment:created") {
    // Extract relevant information from the webhook payload
    const { id } = body.resource;
    const { shipped_at, carrier } = body.resource.data;
    const { code, tracking_number, tracking_url } = carrier;
    try {
      // Get order email
      const order = await getOrder(id);
      // const { shipments } = order;

      

      // const shippingInfo = shipments.map((item) => {
      //   const { carrier, number, url } = item;
      //   return {
      //     carrier,
      //     number,
      //     url,
      //   };
      // });
      // console.log(shippingInfo);
      
      const products = order.line_items.map((item) => {
        const { quantity, metadata } = item;
        const { title, variant_label } = metadata;
        return {
          quantity,
          title,
          variant_label,
        };
      });

      const orderEmail = order.address_to.email;
      const name = order.address_to.first_name;
      // Send shipping notification email
      sendShippingNotificationEmail(
        orderEmail,
        name,
        id,
        tracking_number,
        code,
        shipped_at,
        products,
        tracking_url
      );
    } catch (error) {
      console.error("Error processing shipping notification:", error);
    }
  }

  res.sendStatus(200);
});

// Endpoint to handle Printify webhook order confirmation notifications
router.post("/created", async (req, res) => {
  const { body } = req;

  // Check if this is a shipping notification
  if (body.type === "order:created") {
    // Extract relevant information from the webhook payload
    const { id } = body.resource;

    try {
      // Get order email
      const order = await getOrder(id);

      const orderEmail = order.address_to.email;
      const name = order.address_to.first_name;

      const products = order.line_items.map((item) => {
        const { quantity, metadata } = item;
        const { title, variant_label } = metadata;
        return {
          quantity,
          title,
          variant_label,
        };
      });

      // Send shipping notification email
      await sendOrderConfirmationEmail(orderEmail, name, id, products);
    } catch (error) {
      console.error(
        "Error processing order confirmaation notification:",
        error
      );
    }
  }

  res.sendStatus(200);
});

// Function to send order confirmation email using Nodemailer (pseudo-code)
async function sendOrderConfirmationEmail(email, name, orderId, products) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kvikvne.prints@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "noreply@kvikvne.com",
      to: email,
      subject: "KVIKVNE - Order confirmed",
      html: `
      <html>
  <head>
    <style>
      body {
        font-family: "Outfit", sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: auto;
      }
      .logo-container {
        width: 100%;
      }
      .logo-container img {
        pointer-events: none;
      }
      .header {
        background-color: #06151c;
        color: #f0ede6;
        padding: 10px 0;
        text-align: center;
        border-radius: 4px 4px 0 0;
        -webkit-box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
        -moz-box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
        box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
      }
  
      .header img {
        max-width: 50%;
      }
      .content {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 0 0 4px 4px;
      }
      .detail-header {
        background-color: #06151c;
        color: #f0ede6;
        border-radius: 4px 4px 0 0;
        padding: 2px;
      }
      .detail-header h3 {
        margin-left: 4px;
      }
      .detail-header p {
        margin-left: 4px;
      }
      .detail-products {
        padding: 4px 12px;
      }
      .order-detail {
        background-color: #f0ede6;
        border-radius: 0 0 4px 4px;
        -webkit-box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
        -moz-box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
        box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
      }
      .links{ 
        text-align: center;
        margin-top: 18px;
      }
      .links a{
        text-decoration: none;
        color: #ccc;
        margin: 0 16px;

      }

    </style>
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="https://www.kvikvne.com/canvas-logo-2-white.png" alt="">
        </div>
        <h2>Order Confirmed</h2>
      </div>
      <div class="content">
        <p><strong>Your order has been received!</strong></p>
        <p>Thank you for your order ${name},</p>
        <p>
          We will keep you updated on the progress of your order via email. In
          the meantime, if you have any questions, please do not hesitate to
          message us
          <span
            ><a href="http://192.168.1.104:5173/contact-support">here</a></span
          >.
        </p>
        <!-- Product information -->

        <div class="order-detail">
          <div class="detail-header">
            <h3>Order Details</h3>
            <p><strong>Order #:</strong> ${orderId}</p>
            
          </div>

          <div class="detail-products">
            ${products
              .map(
                (product) => `
            <p>
              ${product.quantity} x <strong>${product.title}</strong>
              ${product.variant_label}
            </p>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="links">
          <a href="https://www.kvikvne.com/">Home</a>
          <a href="https://www.kvikvne.com/products/Canvas">Art & Wall Decor</a>
          <a href="https://www.kvikvne.com/products/Accessories">Accessories</a>
          <a href="https://www.kvikvne.com/faq">FAQ</a>
        </div>
      </div>
    </div>
  </body>
</html>


      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

// Function to send shipping notification email using Nodemailer (pseudo-code)
async function sendShippingNotificationEmail(
  email,
  name,
  orderId,
  trackingNumber,
  carrier,
  shipped_at,
  products,
  tracking_url
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "kvikvne.prints@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "noreply@kvikvne.com",
      to: email,
      subject: "KVIKVNE - Your order has shipped!",
      html: `
      <html>
  <head>
    <style>
      body {
        font-family: "Outfit", sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: auto;
      }
      .logo-container {
        width: 100%;
      }
      .logo-container img {
        pointer-events: none;
      }
      .header {
        background-color: #06151c;
        color: #f0ede6;
        padding: 10px 0;
        text-align: center;
        border-radius: 4px 4px 0 0;
        -webkit-box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
        -moz-box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
        box-shadow: -2px 10px 131px -44px rgba(6, 21, 28, 0.61);
      }

      .header img {
        max-width: 50%;
      }
      .content {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 0 0 4px 4px;
      }
      .detail-header {
        background-color: #06151c;
        color: #f0ede6;
        border-radius: 4px 4px 0 0;
        padding: 2px;
      }
      .detail-header h3 {
        margin-left: 4px;
      }
      .detail-header p {
        margin-left: 4px;
      }
      .detail-products {
        padding: 4px 12px;
      }
      .order-detail {
        background-color: #f0ede6;
        border-radius: 0 0 4px 4px;
        -webkit-box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
        -moz-box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
        box-shadow: -2px 0px 131px -44px rgba(6, 21, 28, 0.3);
      }
      .links {
        text-align: center;
        margin-top: 18px;
      }
      .links a {
        text-decoration: none;
        color: #ccc;
        margin: 0 16px;
      }
      button {
        background-color: #e1ad81;
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        margin: 8px;
    }
    </style>
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="https://www.kvikvne.com/canvas-logo-2-white.png" alt="" />
        </div>
        <h2>We've just shipped your order!</h2>
      </div>
      <div class="content">
        <p><strong>Your order has shipped</strong></p>
        <p>Hey ${name},</p>
        <p>
          This is just a quick update to let you know that your order is now in
          the mail and on its way to you.

        </p>
        <!-- Product information -->

        <div class="order-detail">
          <div class="detail-header">
            <h3>Order Details</h3>
            <p><strong>Order #:</strong> ${orderId}</p>
            <p><strong>Carrier:</strong> ${carrier}</p>
            <p><strong>Tracking #:</strong> ${trackingNumber}</p>
            <a href=${tracking_url}><button>Track your order</button></a>
          </div>

          <div class="detail-products">
            ${products
              .map(
                (product) => `
            <p>
              ${product.quantity} x <strong>${product.title}</strong>
              ${product.variant_label}
            </p>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="links">
          <a href="https://www.kvikvne.com/">Home</a>
          <a href="https://www.kvikvne.com/products/Canvas">Art & Wall Decor</a>
          <a href="https://www.kvikvne.com/products/Accessories">Accessories</a>
          <a href="https://www.kvikvne.com/faq">FAQ</a>
        </div>
      </div>
    </div>
  </body>
</html>



      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

async function getOrder(id) {
  try {
    // Get all orders from the Printify API
    const order = await printifyApi.getOrdersById(id);

    // if (order) {
    //   console.log(order)
    // }

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return order;
  } catch (error) {
    throw new Error(`Error fetching order with ID ${id}: ${error.message}`);
  }
}

module.exports = router;
