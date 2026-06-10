const express = require('express');
const mongoose = require('mongoose');
const subjectRoutes = require('./routes/SubjectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('FATAL: MONGO_URI environment variable is not set.');
  process.exit(1);
}

mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => {
  console.log(`Connected to MongoDB - database: ${mongoose.connection.name}`);
  console.log(`Collection target: subject (in ${mongoose.connection.name}.subject)`);
});

app.use('/University', subjectRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
