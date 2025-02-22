import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const exploreProfiles = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the current user's profile
    const currentUser = await User.findById(userId).select('preferences skills location');

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all users excluding the current user and populate posts
    // let users = await User.find({ id: { $ne: userId } })
    //   .populate('posts')
    //   .select('-password') // Exclude password from the response
    //   .lean();

    const users = await User.aggregate([
      {
        $match: { id: { $ne: userId } }
      },
      {
        $lookup: {
          from: 'posts',  // Collection name for posts
          localField: '_id',
          foreignField: 'userId',
          pipeline: [
            {
              $project: {
                image: 1,
                content: 1
              }
            },
            { $sort: { createdAt: -1 } }
          ],
          as: 'posts'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          profilePhoto: 1,
          experience: 1,
          location: 1,
          preferences: 1,
          skills: 1,
          profileViews: 1,
          interests: 1,
          posts: 1,
          createdAt: 1,
          updatedAt: 1,
          password: 1  // Exclude password
        }
      }
    ]);
    // .select('name location profilePhoto preferences skills')


    // Categorize users into three sections
    let preferencesProfiles = [];
    let skillsProfiles = [];
    let locationProfiles = [];

    for (let user of users) {
      let userPosts = user.posts || [];

      // Profiles Based on Preference
      if (user.preferences && currentUser.preferences) {
        const commonPreferences = user.preferences.filter((pref) =>
          currentUser.preferences.includes(pref)
        );

        if (commonPreferences.length > 0) {
          preferencesProfiles.push({
            id: user.id,
            name: user.name,
            location: user.location,
            profilePhoto: user.profilePhoto,
            posts: userPosts,
          });
        }
      }

      // Profiles Based on Skills
      if (user.skills && currentUser.skills) {
        const commonSkills = user.skills.filter((skill) =>
          currentUser.skills.includes(skill)
        );

        if (commonSkills.length > 0) {
          skillsProfiles.push({
            id: user.id,
            name: user.name,
            location: user.location,
            profilePhoto: user.profilePhoto,
            posts: userPosts,
          });
        }
      }

      // Profiles Based on Location
      if (user.location && currentUser.location && user.location === currentUser.location) {
        locationProfiles.push({
          id: user.id,
          name: user.name,
          location: user.location,
          profilePhoto: user.profilePhoto,
          posts: userPosts,
        });
      }
    }

    res.status(200).json({
      preferencesProfiles,
      skillsProfiles,
      locationProfiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
