import User from "#service/schemas/users.js";

export const userLogout = async (req, res, next) => {
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
    const id = user.id;
    console.log(id);
    await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });

    return res.json({
      data: {
        status: "Success",
        code: 200,
        message: "User successfully logged out",
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
