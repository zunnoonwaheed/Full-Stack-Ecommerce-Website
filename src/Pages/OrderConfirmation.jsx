
import React from 'react';
import axios from 'axios';

const OrderConfirmation = () => {
    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/email', {
                email: 'i222591@nu.edu.pk', // Customer email
                name: 'John Doe',             // Customer name
                orderId: 'ORD12345',          // Example Order ID
                total: 250.75,                // Example total amount
            });
    
            console.log(response.data);
            alert('Order confirmation email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error.response || error);
            alert('Failed to send email.');
        }
    };
    

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Order Confirmation</h1>
            <button
                onClick={sendEmail}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Send Confirmation Email
            </button>
        </div>
    );
};

export default OrderConfirmation;

