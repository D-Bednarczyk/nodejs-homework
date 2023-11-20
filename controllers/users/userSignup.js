import User from "#service/schemas/users.js";
import gravatar from "gravatar";
import sendEmail from "../../service/mailer.js";
import { nanoid } from "nanoid";

export const userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const verificationToken = nanoid();
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

    await sendEmail({ to: email, verificationToken });
    const newUser = new User({ email, avatarURL, verificationToken });
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
