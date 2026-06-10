const express = require('express');
const SubjectController = require('../controllers/SubjectController');
const SubjectService = require('../services/SubjectService');

const router = express.Router();
const controller = new SubjectController();
const service = new SubjectService();

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get('/subjects/analysis/overloaded', asyncHandler(async (req, res) => {
  const subjects = await controller.getOverloadedSubjects();
  res.json({ count: subjects.length, data: subjects });
}));

router.get('/subjects/analysis/extreme', asyncHandler(async (req, res) => {
  const subjects = await controller.getSubjectsWithExtremeLoad();
  res.json({ count: subjects.length, data: subjects });
}));

router.get('/subjects/analysis/average-weekly-hours', asyncHandler(async (req, res) => {
  const average = await controller.getAverageWeeklyHours();
  res.json({ average });
}));

router.get('/subjects/analysis/average-credits', asyncHandler(async (req, res) => {
  const average = await controller.getAverageCredits();
  res.json({ average });
}));

router.get('/subjects/analysis/load-status/:status', asyncHandler(async (req, res) => {
  const subjects = await controller.getSubjectsByLoadStatus(req.params.status);
  res.json({ count: subjects.length, data: subjects });
}));

router.get('/subjects/analysis/sort/weekly-hours', asyncHandler(async (req, res) => {
  const order = req.query.order || 'asc';
  const subjects = await controller.sortByWeeklyHours(order);
  res.json({ data: subjects });
}));

router.get('/subjects/analysis/sort/effort-index', asyncHandler(async (req, res) => {
  const order = req.query.order || 'asc';
  const subjects = await controller.sortByEffortIndex(order);
  res.json({ data: subjects });
}));

router.get('/subjects/analysis/filter/difficulty/:level', asyncHandler(async (req, res) => {
  const subjects = await controller.filterByDifficultyLevel(req.params.level);
  res.json({ count: subjects.length, data: subjects });
}));

router.post('/subjects', asyncHandler(async (req, res) => {
  const subject = await service.createSubject(req.body);
  res.status(201).json(subject);
}));

router.get('/subjects', asyncHandler(async (req, res) => {
  const subjects = await service.getAllSubjects();
  res.json({ count: subjects.length, data: subjects });
}));

router.get('/subjects/:id', asyncHandler(async (req, res) => {
  const subject = await service.getSubjectById(req.params.id);
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  res.json(subject);
}));

router.put('/subjects/:id', asyncHandler(async (req, res) => {
  const subject = await service.updateSubject(req.params.id, req.body);
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  res.json(subject);
}));

router.delete('/subjects/:id', asyncHandler(async (req, res) => {
  const deleted = await service.deleteSubject(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Subject not found' });
  res.status(204).send();
}));

module.exports = router;
