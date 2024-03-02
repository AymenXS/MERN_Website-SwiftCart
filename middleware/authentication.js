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

// (...roles) Rest Operator
const authorizePermissions = (...roles) => {
  // Returning a function as callback
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomAPIError.UnauthenticatedError('Unauthorized to access this route');
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
