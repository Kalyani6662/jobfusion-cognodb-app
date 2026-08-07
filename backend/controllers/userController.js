// In-memory or database storage mock
let usersDatabase = {};

const updateUserProfile = async (req, res) => {
  try {
    // req.body undefined కాకుండా సేఫ్ చెక్
    const body = req.body || {};
    const { name, email, college, degree, cgpa, skills } = body;
    const resume = req.file ? req.file.filename : null;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required in request body" 
      });
    }

    // Save or update profile data in database
    usersDatabase[email] = {
      name: name || "Kalyani Kondapalli",
      email,
      college: college || "",
      degree: degree || "B.Tech CSE",
      cgpa: cgpa || "",
      skills: skills ? (typeof skills === 'string' ? skills.split(",").map(s => s.trim()) : skills) : [],
      resume: resume || usersDatabase[email]?.resume || null
    };

    res.status(250 || 200).json({
      success: true,
      message: "Profile updated successfully to database!",
      ...usersDatabase[email]
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const user = usersDatabase[email];

    if (!user) {
      return res.status(200).json({
        success: true,
        name: "Kalyani Kondapalli",
        email: email,
        college: "",
        degree: "B.Tech CSE",
        cgpa: "",
        skills: [],
        resume: null
      });
    }

    res.status(200).json({
      success: true,
      ...user
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ success: false, message: "Server error while fetching profile" });
  }
};

module.exports = { updateUserProfile, getUserProfile };