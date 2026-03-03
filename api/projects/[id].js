const path = require('path');
const fs = require('fs');

module.exports = function handler(req, res) {
  try {
    const { id } = req.query;
    const filePath = path.join(process.cwd(), 'backend', 'data', 'projects.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(raw);
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ success: false, error: { message: 'Project not found', statusCode: 404 } });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message, statusCode: 500 } });
  }
};
