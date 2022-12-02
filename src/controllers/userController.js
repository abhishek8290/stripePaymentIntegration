const httpStatus = require('http-status');
const {pick,catchAsync} = require('../utils/common');
const {User} = require('../models')
const ApiError = require('../utils/ApiError');
const userService = require('../services/userService');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED)
  return user;
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'phonenumber', 'email']);
  const user = await userService.queryUser(filter);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return  user;
  
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
