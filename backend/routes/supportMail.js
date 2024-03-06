const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit (adjust as needed)
  },
});


require("dotenv").config();

router.post("/send-email", upload.single("attch"), async (req, res) => {
  const { first_name, last_name, email, subject, description } = req.body;
  const sessionID = req.sessionID;
  console.log(req)
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
      from: "kvikvne.prints@gmail.com",
      to: "kvikvne.prints@gmail.com",
      subject: `SUPPORT TICKET - ${subject}`,
      text: `
        First Name: ${first_name}
        Last Name: ${last_name}
        Email: ${email}
        Description: ${description}
        SessionID: ${sessionID}
      `,
    };

    // Check if an attachment was provided
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ];
    }

    const customerMailOptions = {
      from: "kvikvne.prints@gmail.com",
      to: email,
      subject: "Thank you for contacting us!",
      html: `
    <p style="color: #333; font-size: 16px;">Hello ${first_name},</p>
    <p style="color: #333; font-size: 14px;">Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
    <p style="color: #333; font-size: 14px;">Here are the details you provided:</p>
    <ul style="color: #333; font-size: 14px;">
      <li>First Name: ${first_name}</li>
      <li>Last Name: ${last_name}</li>
      <li>Email: ${email}</li>
      <li>Description: ${description}</li>
    </ul>
    <p style="color: #333; font-size: 14px;">Regards,<br>Kvikvne Support Team</p>
  `,
    };

    if (req.file) {
      customerMailOptions.attachments = [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(customerMailOptions);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  
   
  }
});

module.exports = router;
