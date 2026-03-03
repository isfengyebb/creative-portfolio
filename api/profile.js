const path = require('path');
const fs = require('fs');

const SUPPORTED_LANGS = ['zh', 'en'];
const DEFAULT_LANG = 'zh';

module.exports = function handler(req, res) {
  try {
    const lang = SUPPORTED_LANGS.includes(req.query.lang) ? req.query.lang : DEFAULT_LANG;
    const filePath = path.join(process.cwd(), 'backend', 'data', `profile.${lang}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: err.message, statusCode: 500 } });
  }
};
