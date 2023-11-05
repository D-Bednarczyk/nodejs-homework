import User from "#service/schemas/users.js";
export const userCurrent = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json("Error! User not found!");
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        currentUser: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
