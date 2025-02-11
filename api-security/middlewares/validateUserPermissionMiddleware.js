const validateUserPermissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    const { user } = req;

    if(!user.permissions.includes(requiredPermission)) {
      console.error('User does not have permissions')
      return res.status(403).send({
        success: false,
        error: 'Forbidden'
      })
    }

    next();
  }
};

module.exports = {
  validateUserPermissionMiddleware
}