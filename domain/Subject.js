class Subject {
  constructor({ _id, id, name, description, workload, difficultyLevel, credits, weeklyHours }) {
    this.id = id || _id;
    this.name = name;
    this.description = description;
    this.workload = workload;
    this.difficultyLevel = difficultyLevel;
    this.credits = credits;
    this.weeklyHours = weeklyHours;
  }

  calculateEffortIndex() {
    return this.credits * this.weeklyHours;
  }

  getLoadStatus() {
    const index = this.calculateEffortIndex();
    if (index <= 10) return 'Low';
    if (index <= 25) return 'Moderate';
    if (index <= 45) return 'High';
    return 'Extreme';
  }

  calculateAcademicLoad() {
    const effortIndex = this.calculateEffortIndex();
    const loadStatus = this.getLoadStatus();
    return {
      effortIndex,
      loadStatus,
      alert: effortIndex > 25
    };
  }

  isOverloaded() {
    return this.calculateEffortIndex() > 25;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      workload: this.workload,
      difficultyLevel: this.difficultyLevel,
      credits: this.credits,
      weeklyHours: this.weeklyHours,
      academicLoad: this.calculateAcademicLoad()
    };
  }
}

module.exports = Subject;
