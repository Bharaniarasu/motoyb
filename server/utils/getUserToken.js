const GetUserToken = (user, statusCode, message, res) => {
  const token = user.getJwtToken();
  const authUser = { name: user.name, email: user.email, role: user.role };

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    // token,
    message: message,
    user: authUser,
  });
};
module.exports = GetUserToken;
