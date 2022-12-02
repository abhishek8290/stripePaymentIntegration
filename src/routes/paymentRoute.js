const express = require('express');
const v = require('../../middlewares/validate');
const av = require('../../validations/auth.validation');
const ac = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();


router.post('/register', v(av.register), ac.register);