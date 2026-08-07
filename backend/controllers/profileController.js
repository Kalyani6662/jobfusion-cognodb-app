// In-memory or database model reference (Replace with your actual DB model e.g., Neo4j / MongoDB)
let usersDatabase = {};

const saveProfile = async (req, res) => {
  try {
    const { name, email, college, degree, cgpa, skills } = req.body;
    const resume = req.file ? req.file.filename : null;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Save/Update user profile in database
    usersDatabase[email] = {
      name: name || "Kalyani Kondapalli",
      email,
      college: college || "VFSTR",
      degree: degree || "B.Tech CSE",
      cgpa: cgpa || "9.0",
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
      resume: resume || usersDatabase[email]?.resumekey || null
    };

    res.status(200).json({
      success: true,
      message: "Profile saved successfully to database",
      user: usersDatabase[email]
    });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ success: false, message: "Server error while saving profile" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const user = usersDatabase[email];

    if (!user) {
      // Default return if not found yet
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

module.exports = { saveProfile, getProfile };