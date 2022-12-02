const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const uv = require('../validation/userValidation');
const uc = require('../controllers/userController');

const router = express.Router();


router.post('/create', auth('manageUsers'),validate(uv.createUser), uc.createUser);

router.route('/')
.post(auth('manageUsers'),validate(uv.createUser), uc.createUser)
.get( uc.getUsers);
  // .post(auth('manageUsers'), validate(uv.createUser), uc.createUser)
  // .get(auth('getUsers'), validate(uv.getUsers), uc.getUsers);

// router.route('/:userId')
//   .get(auth('getUsers'), validate(uv.getUser), uc.getUser)
//   .patch(auth('manageUsers'), validate(uv.updateUser), uc.updateUser)
//   .delete(auth('manageUsers'), validate(uv.deleteUser), uc.deleteUser);

module.exports = router;
