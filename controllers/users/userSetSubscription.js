import User from "#service/schemas/users.js";
import Joi from "joi";

const schemaValidation = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const userSetsSubscription = async (req, res, next) => {
  const resultValidate = schemaValidation.validate(req.body);

  if (resultValidate.error) {
    return res.status(400).json({
      message: resultValidate.error.message,
    });
  }

  const { email, subscription } = req.body;
  const user = await User.findOne({ email });
  const id = user.id;

  if (!user) {
    return res.status(409).json({ message: "no user with this email", id: id });
  }

  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { subscription: subscription },
      { new: true }
    );

    res.status(200).json({
      user: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
