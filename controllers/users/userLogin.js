import User from "#service/schemas/users.js";
import jwt from "jsonwebtoken";

import "dotenv/config";

const SECRET = process.env.SECRET;

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "12h" });

    await User.findByIdAndUpdate(
      { _id: payload.id },
      { token: token },
      { new: true }
    );

    const { email, subscription } = user;
    return res.json({ token, user: { email, subscription } });
  } else {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
};
