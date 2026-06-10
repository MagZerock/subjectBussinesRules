const SubjectModel = require('../models/Subject');
const mongoose = require('mongoose');

function debugQuery(operation, filter) {
  const dbName = mongoose.connection.name;
  const collectionName = SubjectModel.collection.collectionName || 'subject';
  console.log(`[DB DEBUG] ${operation} -> db: "${dbName}", collection: "${collectionName}"${filter ? `, filter: ${JSON.stringify(filter)}` : ''}`);
}

class SubjectRepository {
  async create(data) {
    debugQuery('CREATE');
    const document = await SubjectModel.create(data);
    return document.toObject();
  }

  async findById(id) {
    debugQuery('FINDBYID', { _id: id });
    return SubjectModel.findById(id).lean();
  }

  async findAll() {
    debugQuery('FINDALL');
    return SubjectModel.find().lean();
  }

  async update(id, data) {
    debugQuery('UPDATE', { _id: id });
    return SubjectModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  }

  async delete(id) {
    debugQuery('DELETE', { _id: id });
    const result = await SubjectModel.findByIdAndDelete(id);
    return result !== null;
  }
}

module.exports = SubjectRepository;
