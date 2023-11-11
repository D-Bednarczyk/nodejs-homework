import User from "#service/schemas/users.js";

export const userSetsSubscription = async (req, res, next) => {
  const { email, subscription } = req.body;
  const user = await User.findOne({ email });
  const id = user.id;

  if (!user) {
    return res.status(409).json({ message: "no user with this email" });
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
