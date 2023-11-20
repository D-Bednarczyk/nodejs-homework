import User from "#service/schemas/users.js";
import sendEmail from "../../service/mailer.js";

export const userReVerifyToken = async (req, res, next) => {
  const { email } = req.body;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  if (userFound.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
  const verificationToken = userFound.verificationToken;

  try {
    await sendEmail({ to: email, verificationToken });
    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};
