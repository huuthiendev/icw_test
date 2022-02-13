module.exports = function (req, res, next) {
  // Check socket request
  if (!req.isSocket) {
    return res.badRequest({
      errorCode: 'INVALID_SOCKET',
      message: 'Your request is not a socket request.'
    });
  }
  next();
}