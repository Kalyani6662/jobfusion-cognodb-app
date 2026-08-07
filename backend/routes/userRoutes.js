const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // uploads folder లో సేవ్ అవ్వడానికి
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const { updateUserProfile, getUserProfile } = require('../controllers/userController');

// Multer middleware 'upload.single("resume")' ఉండటం వల్ల req.body మరియు req.file రెండు వస్తాయి
router.post('/profile', upload.single('resume'), updateUserProfile);
router.get('/profile/:email', getUserProfile);

module.exports = router;