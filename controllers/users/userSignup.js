import User from "#service/schemas/users.js";
import Joi from "joi";

const schemaValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userSignup = async (req, res, next) => {
  const resultValidate = schemaValidation.validate(req.body);

  if (resultValidate.error) {
    return res.status(400).json({
      message: resultValidate.error.message,
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }, { _id: 1 }).lean();

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
