import User from '../models/user.model.js';

export const exploreProfiles = async (req, res) => {
  try {
    const { skills, interests, location } = req.query;

    let query = {};

    if (skills) query.skills = { $in: skills.split(',') };
    if (interests) query.interests = { $in: interests.split(',') };
    if (location) query.location = location;

    const profiles = await User.find(query).select('-password');

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
