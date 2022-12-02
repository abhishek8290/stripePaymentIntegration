
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes');
const { rateLimiter } = require('./middleware/rateLimiter');
const db = require('./models/db');
const ApiError = require('./utils/apiError');
const config = require('./config');



const isProdEnv = config.env === 'production';

const port = 8080;


const app = express();
app.use(helmet());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
if(isProdEnv) app.use('/auth', rateLimiter);
app.get('/healthCheck', (req, res) => res.status(200).send({ message: `Hmmm .. Health Check is Working Foine Though !`}))
app.use('/', routes);
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, 'EndoPoint Not found')));
app.listen(port,() => {
    console.log(port)
    console.log(`server listening at http://localhost:${port}`);
})
module.exports = app;