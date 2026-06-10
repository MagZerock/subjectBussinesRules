const SubjectService = require('../services/SubjectService');

class SubjectController {
  constructor() {
    this.service = new SubjectService();
  }

  async getOverloadedSubjects() {
    const subjects = await this.service.getAllSubjects();
    return subjects.filter(subject => subject.isOverloaded());
  }

  async getSubjectsByLoadStatus(status) {
    const subjects = await this.service.getAllSubjects();
    return subjects.filter(subject => subject.getLoadStatus() === status);
  }

  async getSubjectsWithExtremeLoad() {
    return this.getSubjectsByLoadStatus('Extreme');
  }

  async getAverageWeeklyHours() {
    const subjects = await this.service.getAllSubjects();
    if (subjects.length === 0) return 0;
    const total = subjects.reduce((sum, subject) => sum + subject.weeklyHours, 0);
    return total / subjects.length;
  }

  async getAverageCredits() {
    const subjects = await this.service.getAllSubjects();
    if (subjects.length === 0) return 0;
    const total = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    return total / subjects.length;
  }

  async sortByWeeklyHours(order = 'asc') {
    const subjects = await this.service.getAllSubjects();
    const sorted = [...subjects];
    sorted.sort((a, b) => {
      return order === 'desc' ? b.weeklyHours - a.weeklyHours : a.weeklyHours - b.weeklyHours;
    });
    return sorted;
  }

  async sortByEffortIndex(order = 'asc') {
    const subjects = await this.service.getAllSubjects();
    const sorted = [...subjects];
    sorted.sort((a, b) => {
      return order === 'desc'
        ? b.calculateEffortIndex() - a.calculateEffortIndex()
        : a.calculateEffortIndex() - b.calculateEffortIndex();
    });
    return sorted;
  }

  async filterByDifficultyLevel(level) {
    const subjects = await this.service.getAllSubjects();
    return subjects.filter(subject => subject.difficultyLevel === level);
  }
}

module.exports = SubjectController;
