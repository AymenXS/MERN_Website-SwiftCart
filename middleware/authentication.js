const CustomAPIError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomAPIError.UnauthenticatedError('Token missing, Authentication Invalid');
  }

  try {
    const { name, userID, role } = isTokenValid({ token });
    req.user = { name, userID, role };
    next();
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new CustomAPIError.UnauthenticatedError('Unauthorized to access this route');
  }
  
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
