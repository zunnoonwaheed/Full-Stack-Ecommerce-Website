

const EMAIL_USER="i222591@nu.edu.pk"
const EMAIL_PASS="2250154*Zubair"

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, name, orderId, total } = req.body;
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: `Order Confirmation - Order #${orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <h2 style="text-align: center; color: #4CAF50;">Thank You for Your Order!</h2>
                <p>Hi <b>${name}</b>,</p>
                <p>Your order <b>#${orderId}</b> has been successfully placed. We will notify you once it is shipped.</p>
                <h3>Order Summary:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li><b>Order ID:</b> ${orderId}</li>
                    <li><b>Total Amount:</b> $${total}</li>
                </ul>
                <p>If you have any questions, feel free to contact us.</p>
                <hr>
                <p style="text-align: center;">&copy; 2024 Your Company Name. All Rights Reserved.</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});


module.exports = router;

