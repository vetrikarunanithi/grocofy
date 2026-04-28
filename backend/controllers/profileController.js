import userModel from "../models/userModel.js";

// Get user profile (name, email, phone, addresses)
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

// Update profile (name, email, phone)
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.body.userId,
      { name, email, phone },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating profile" });
  }
};

// Add new address
export const addAddress = async (req, res) => {
  try {
    const { street, city, state, zipcode, country } = req.body;
    const user = await userModel.findById(req.body.userId);

    if (!user.addresses) user.addresses = [];
    user.addresses.push({ street, city, state, zipcode, country });
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding address" });
  }
};

// Delete address by index
export const deleteAddress = async (req, res) => {
  try {
    const index = req.params.index;
    const user = await userModel.findById(req.body.userId);

    if (!user.addresses || user.addresses.length <= index) {
      return res.json({ success: false, message: "Address not found" });
    }

    user.addresses.splice(index, 1);
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error deleting address" });
  }
};
