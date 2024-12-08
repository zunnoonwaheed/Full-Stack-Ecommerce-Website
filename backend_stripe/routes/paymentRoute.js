const express = require('express');
const payment_route = express.Router();

const paymentController = require('../controllers/paymentController');

payment_route.get('/', paymentController.renderBuyPage);
payment_route.post('/payment', paymentController.payment);
payment_route.get('/success', paymentController.success);
payment_route.get('/failure', paymentController.failure);

module.exports = payment_route;

