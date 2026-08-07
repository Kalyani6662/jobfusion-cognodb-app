const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { driver } = require('../config/db');

const GOOGLE_CLIENT_ID = "943441311326-3fhru1fpcdcpu7vilue30mn98kjjnvuq.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const session = driver.session();
  try {
    const { token } = req.body;
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
    });
    
    const { name, email } = ticket.getPayload();

    // Check if user exists in CognoDB using Cypher query
    const findResult = await session.run(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );

    let user;
    if (findResult.records.length === 0) {
      // Create user node in CognoDB graph database
      const createResult = await session.run(
        'CREATE (u:User {name: $name, email: $email, password: "", profileCompleted: false}) RETURN u',
        { name, email }
      );
      user = createResult.records[0].get('u').properties;
    } else {
      user = findResult.records[0].get('u').properties;
    }

    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });

    res.status(200).json({
      message: "Google Login Successful",
      token: jwtToken,
      user: {
        name: user.name,
        email: user.email,
        profileCompleted: user.profileCompleted
      }
    });

  } catch (err) {
    console.error("Google Token Verification Failed:", err);
    res.status(400).json({ 
      message: "Google Authentication Failed", 
      error: err.message 
    });
  } finally {
    await session.close();
  }
});

router.get('/google', (req, res) => {
  res.status(200).json({
    message: "Google Auth endpoint initialized successfully.",
    redirectUrl: "http://localhost:5173/dashboard"
  });
});

router.get('/google/callback', (req, res) => {
  res.redirect('http://localhost:5173/dashboard');
});

module.exports = router;