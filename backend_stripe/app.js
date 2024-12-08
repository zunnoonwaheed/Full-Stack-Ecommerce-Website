const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');

const app = express();

// Middleware configurations
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/payment', paymentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;