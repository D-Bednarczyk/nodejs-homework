import User from "#service/schemas/users.js";
import gravatar from "gravatar";

export const userSignup = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, { _id: 1 }).lean();

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    console.log(email);
    const avatarURL = gravatar.url(email, {
      protocol: "http",
      s: "300",
      d: "robohash",
    });
    const newUser = new User({ email, avatarURL });
    await newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      user: {
        email: email,
        subscription: "starter",
        avatarURL: avatarURL,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
