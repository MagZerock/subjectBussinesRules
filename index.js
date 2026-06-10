const express = require('express');
const mongoose = require('mongoose');
const subjectRoutes = require('./routes/SubjectRoutes');

const app = express();
const PORT = 3002;

app.use(express.json());

mongoose.connect(
  'mongodb+srv://admin:admin@awd.ypmipjt.mongodb.net/universityESPE'
);

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
