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
        html: `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #06151c;">Your KVIKVNE order has been received!</h2>
        <p>Hi there,</p>
        <p>Just wanted to let you know that your order <strong>#${order._id} has been confimed.</p>
        <p>We will let you know as soon as your order ships.</p>
        <p style="margin-top: 24px;">Thanks again for shopping with KVIKVNE!</p>
        <p>- The KVIKVNE Team</p>
      </div>
    `,
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
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #06151c;">Your KVIKVNE order has shipped!</h2>
        <p>Hi there,</p>
        <p>We're excited to let you know that your order <strong>#${
            order._id
        }</strong> is on its way.</p>
        ${
            trackingUrl
                ? `<p>You can track it here:</p>
               <a href="${trackingUrl}" style="color: #007BFF;">Track your package</a>`
                : `<p>If you have any questions or concerns, feel free to reach out to us.</p>`
        }
        <p style="margin-top: 24px;">Thanks again for shopping with KVIKVNE!</p>
        <p>- The KVIKVNE Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Shipping email sent to ${order.email}`);
}
export async function sendDeliveredEmail(
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
        subject: "Your order has been delivered!",
        html: `
      <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #06151c;">Your KVIKVNE order has been delivered!</h2>
        <p>Hi there,</p>
        <p>We're excited to let you know that your order <strong>#${
            order._id
        }</strong> has arrived.</p>
        ${
            trackingUrl
                ? `<p>You can confirm delivery or revisit the tracking page using the link below:</p>
               <a href="${trackingUrl}" style="color: #007BFF;">Track your package</a>`
                : `<p>Your order has been marked as delivered. If you have any questions or concerns, feel free to reach out to us.</p>`
        }
        <p style="margin-top: 24px;">Thanks again for shopping with KVIKVNE!</p>
        <p>- The KVIKVNE Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Shipping email sent to ${order.email}`);
}

export async function sendCanceledEmail(order: OrderDocument) {
    if (!order.email) {
        console.warn(`No email found for order ${order._id}`);
        return;
    }

    const refundAmount = order.totalAmountPaidInCents
        ? `$${(order.totalAmountPaidInCents / 100).toFixed(2)}`
        : null;

    const mailOptions = {
        from: "noreply@kvikvne.com",
        to: order.email,
        subject: "Your KVIKVNE order has been canceled and refunded",
        html: `
      <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto; padding: 16px;">
        <h2 style="color: #06151c;">Your KVIKVNE order has been canceled</h2>
        <p>Hi there,</p>
        <p>Your order <strong>#${
            order._id
        }</strong> has been successfully canceled.</p>
        ${
            refundAmount
                ? `<p>A refund of <strong>${refundAmount}</strong> has been issued to your card.</p>`
                : `<p>A refund has been issued to your card.</p>`
        }
        <p>If you have any questions or need assistance, feel free to reply to this email or reach out to our support team at <a href="mailto:support@kvikvne.com">support@kvikvne.com</a>.</p>
        <p style="margin-top: 24px;">Thanks for choosing KVIKVNE.</p>
        <p>- The KVIKVNE Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${order.email}`);
}
