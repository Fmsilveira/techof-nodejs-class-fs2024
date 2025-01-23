const validateRequestBodyMiddleware = (req, res, next) => {
  function validateRequestBody(params) {
    if (params.age < 0) {
      return res.status(400).json({
        message: "invalid age"
      })
    }

    if (params.price < 0) {
      return res.status(400).json({
        message: "invalid price"
      })
    }
  }

  validateRequestBody(req.body);
  next();
};

module.exports = {
  validateRequestBodyMiddleware,
}