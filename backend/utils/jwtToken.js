//   Create Token and Saving in Cookie
const sendToken = async (user, statusCode, res) => {
  const token = user.getJWTToken();

  //   Options for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendToken;
