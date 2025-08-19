const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure transporter using environment variables for security
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
    }
});

app.get('/sendemail', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: [process.env.EMAIL_USER, 'venugopal.burli@masaischool.com'],
            subject: 'Test Email from NEM Student',
            text: 'This is a testing Mail sent by NEM student, no need to reply.'
        });
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
