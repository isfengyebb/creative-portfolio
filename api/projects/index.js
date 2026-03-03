const path = require('path');
const fs = require('fs');

module.exports = function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'backend', 'data', 'projects.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message, statusCode: 500 } });
  }
};
