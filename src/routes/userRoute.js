const express = require('express');
const validate = require('../middleware/validate');
const uv = require('../validation/userValidation');
const uc = require('../controllers/userController');

const router = express.Router();


router.post('/create',validate(uv.createUser), uc.createUser);
router.get('/',validate(uv.getUsers),uc.getUsers);


module.exports = router;
