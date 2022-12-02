const express = require('express');
// const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const viewRoute = require('./viewRoute');

const config = require('../config');

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/',
    route: viewRoute,
  },

];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
