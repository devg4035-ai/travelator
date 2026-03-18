const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic routes
app.get('/', (req, res) => {
    res.send('Welcome to the Travelator API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
