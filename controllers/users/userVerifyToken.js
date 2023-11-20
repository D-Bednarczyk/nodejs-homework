import User from "#service/schemas/users.js";
export const userVerifyToken = async (req, res, next) => {
  const userFound = await User.findOne({
    verificationToken: req.params.verificationToken,
  });

  if (!userFound) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  const id = userFound.id;
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { $set: { verificationToken: null, verify: true } },
      { new: true }
    );
    return res.status(200).json({
      message: "Verification successful",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};
