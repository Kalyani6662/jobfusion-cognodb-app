const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    return res.status(200).json({
      success: true,
      token: "mock-jwt-token-jobfusion-2026",
      user: {
        email: email || "kalyani@example.com",
        name: "Kalyani Kondapalli",
        role: "Full Stack & AI Developer"
      },
      message: "Login successful!"
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Server error during login" 
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      success: true,
      token: "mock-jwt-token-jobfusion-2026",
      message: "Account created successfully!"
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Server error during signup" 
    });
  }
};

module.exports = { login, signup };