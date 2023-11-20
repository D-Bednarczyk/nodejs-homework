import User from "#service/schemas/users.js";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";

const tmpDir = path.join(process.cwd(), "tmp");
const publicDir = path.join(process.cwd(), "public");
const avatarDir = path.join(publicDir, "avatars/");

export const userAvatarUpdate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(404).json("Error! User not found!");
  }

  const { path: temporaryName, originalname } = req.file;
  const tmpFile = path.join(tmpDir, originalname);

  const { _id } = user;

  const avatarFileName = _id;
  const avatarFileNamePath = `${avatarDir}${avatarFileName}.jpg`;

  try {
    await fs.rename(temporaryName, tmpFile);
    const avatarPic = await Jimp.read(tmpFile);
    avatarPic.resize(250, 250).write(avatarFileNamePath);
    user.avatarURL = avatarFileNamePath;
    await user.save();
    await fs.unlink(tmpFile);
    const { avatarURL } = user;

    return res.status(200).json({ avatarURL });
  } catch (err) {
    console.error("An error occurred while updating avatar: ", err);
    throw err;
  }
};
