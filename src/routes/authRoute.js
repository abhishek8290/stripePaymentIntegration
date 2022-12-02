const express = require('express');
const v = require('../../middlewares/validate');
const av = require('../../validations/auth.validation');
const ac = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();


router.post('/register', v(av.register), ac.register); // done 
router.post('/login', v(av.login), ac.login); // 
router.post('/logout', v(av.logout), ac.logout);
router.post('/refreshtoken', v(av.refreshTokens), ac.refreshTokens);
router.post('/forgotpassword', v(av.forgotPassword), ac.forgotPassword);
router.post('/resetpassword', v(av.resetPassword), ac.resetPassword);
router.post('/sendVerifyEmail', auth(), ac.sendVerificationEmail);
router.post('/verifyemail', v(av.verifyEmail), ac.verifyEmail);

module.exports = router;

