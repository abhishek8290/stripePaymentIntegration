
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
// const passport = require('passport');
const httpStatus = require('http-status');
const port = 8080;
const ApiError = require('./utils/apiError');


const app = express();
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());   

app.get('/healthCheck', (req, res) => res.status(200).send({ message: `Is This Even Working`}))


// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

app.listen(port,() => {
    console.log(port)
    console.log(`server listening at http://localhost:${port}`);
})
module.exports = app;