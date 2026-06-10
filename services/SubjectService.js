const SubjectRepository = require('../repositories/SubjectRepository');
const Subject = require('../domain/Subject');

class SubjectService {
  constructor() {
    this.repository = new SubjectRepository();
  }

  async createSubject(data) {
    const doc = await this.repository.create(data);
    return new Subject(doc);
  }

  async getSubjectById(id) {
    const doc = await this.repository.findById(id);
    if (!doc) return null;
    return new Subject(doc);
  }

  async getAllSubjects() {
    const docs = await this.repository.findAll();
    return docs.map(doc => new Subject(doc));
  }

  async updateSubject(id, data) {
    const doc = await this.repository.update(id, data);
    if (!doc) return null;
    return new Subject(doc);
  }

  async deleteSubject(id) {
    return this.repository.delete(id);
  }
}

module.exports = SubjectService;
