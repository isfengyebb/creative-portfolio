const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');

function readJsonFile(filename) {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

const profileController = {
  getProfile(req, res) {
    const data = readJsonFile('profile.json');
    res.json({ success: true, data });
  },
};

const resumeController = {
  getResume(req, res) {
    const data = readJsonFile('resume.json');
    res.json({ success: true, data });
  },
};

const projectController = {
  getAllProjects(req, res) {
    const data = readJsonFile('projects.json');
    res.json({ success: true, data });
  },

  getProjectById(req, res) {
    const data = readJsonFile('projects.json');
    const project = data.find((p) => p.id === req.params.id);

    if (!project) {
      const err = new Error('项目未找到');
      err.statusCode = 404;
      throw err;
    }

    res.json({ success: true, data: project });
  },
};

module.exports = { profileController, resumeController, projectController };
