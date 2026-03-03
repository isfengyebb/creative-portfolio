const express = require('express');
const { profileController, resumeController, projectController } = require('../controllers');

const router = express.Router();

router.get('/profile', profileController.getProfile);
router.get('/resume', resumeController.getResume);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);

module.exports = router;
