import { getUserById, updateUserProfile } from "../services/userService.js";

export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    await updateUserProfile(req.user.id, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
