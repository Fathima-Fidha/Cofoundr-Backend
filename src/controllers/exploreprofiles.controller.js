import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const exploreProfiles = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the current user's profile
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all users excluding the current user
    let users = await User.find({ _id: { $ne: userId } });

    // Helper function to fetch posts for a user
    const getUserPosts = async (userId) => {
      return await Post.find({ userId });
    };

    // Categorize users into three sections
    let preferenceProfiles = [];
    let skillsProfiles = [];
    let locationProfiles = [];

    for (let user of users) {
      let posts = await getUserPosts(user._id);

      let filteredPosts = posts.map(post => ({
        content: post.content,
        image: post.image
      }));

      // Profiles Based on Preference
      if (user.preference && currentUser.preference && user.preference === currentUser.preference) {
        preferenceProfiles.push({
          _id: user._id,
          name: user.name,
          location: user.location,
          profilePhoto: user.profilePhoto,
          posts: filteredPosts,
        });
      }

      // Profiles Based on Skills
      if (user.skills && currentUser.skills) {
        const commonSkills = user.skills.filter((skill) => currentUser.skills.includes(skill));
        if (commonSkills.length > 0) {
          skillsProfiles.push({
            _id: user._id,
            name: user.name,
            location: user.location,
            profilePhoto: user.profilePhoto,
            posts: filteredPosts,
          });
        }
      }

      // Profiles Based on Location
      if (user.location && currentUser.location && user.location === currentUser.location) {
        locationProfiles.push({
          _id: user._id,
          name: user.name,
          location: user.location,
          profilePhoto: user.profilePhoto,
          posts: filteredPosts,
        });
      }
    }

    res.status(200).json({
      preferenceProfiles,
      skillsProfiles,
      locationProfiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


