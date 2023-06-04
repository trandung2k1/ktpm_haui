const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const Producer = require('./producer');
const producer = new Producer();
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('combined'));
app.get('/', async (req, res) => {
    await producer.publishMessage('Info', 'Dowload successfully');
    return res.status(200).json({
        message: 'Welcome to the server',
    });
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
