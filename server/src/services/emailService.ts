import nodemailer from "nodemailer";
import { OrderDocument } from "../models/order";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendConfirmationEmailDev(order: OrderDocument) {
    if (!order.email) {
        console.warn(`No email found for order ${order._id}`);
        return;
    }

    const mailOptions = {
        from: "noreply@kvikvne.com",
        to: order.email,
        subject: "Your order has been received!",
        text: `Thanks for your order!\n\nOrder ID: ${order._id}\nItems: ${order.lineItems.length}\n\nWe'll notify you once it's shipped.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${order.email}`);
}

export async function sendShippingEmail(
    order: OrderDocument,
    trackingUrl: string
) {
    if (!order.email) {
        console.warn(`No email found for order ${order._id}`);
        return;
    }

    const mailOptions = {
        from: "noreply@kvikvne.com",
        to: order.email,
        subject: "Your order has shipped!",
        html: `
      <p>Your order <strong>${order._id}</strong> has shipped!</p>
      <p>You can track it here:</p>
      <a href="${trackingUrl}">${trackingUrl}</a>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Shipping email sent to ${order.email}`);
}
