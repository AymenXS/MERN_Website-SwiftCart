const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserID) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userID === resourceUserID.toString()) return;
  throw new CustomError.UnauthenticatedError('Not authorized to access this route');
};

module.exports = checkPermissions;
