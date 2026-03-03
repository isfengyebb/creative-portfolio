const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
