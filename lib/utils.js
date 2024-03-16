// Utility function for sending errors
const sendError = (res, err, statusCode = 500, message = null) => {
  res.status(statusCode).send({
    message:
      message || err.message || "An error occurred during the operation.",
  });
};

// Utility for validating request body
const validateRequest = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return false;
  }
  return true;
};

export { sendError, validateRequest };
