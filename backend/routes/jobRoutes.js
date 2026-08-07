const express = require('express');
const router = express.Router();
const { getJobs } = require('../controllers/jobController');

// Ensure getJobs is passed correctly as a function
router.get('/', getJobs);

module.exports = router;