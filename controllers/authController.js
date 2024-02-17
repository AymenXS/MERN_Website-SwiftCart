const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require('../errors');

const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  // {...} From the front-end endpoint.
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // {...} From the User Schema; MongoDB.
  const user = await User.create({ email, name, password, role });

  const tokenUser = { name: user.name, userID: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

};

const login = async (req, res) => {
  res.send('login user');
};

const logout = async (req, res) => {
  res.send('logout user');
};

module.exports = {
  register,
  login,
  logout,
};
