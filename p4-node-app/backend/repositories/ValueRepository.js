import mongoose from 'mongoose';

class ValueRepository {
  async save(project, value) {
    try {
      const savedValue = await value.save();

      project.values.push(savedValue._id);
      await project.save();

      return savedValue;
    } catch (error) {
      throw new Error(`Error saving value: ${error.message}`);
    }
  }

  async update(existingValue, updatedValue) {
    try {

      const updated = await Value.updateOne({ _id: existingValue._id }, updatedValue);
      return updated;
    } catch (error) {
      throw new Error(`Error updating value: ${error.message}`);
    }
  }

  getAllValues(project) {
    return project.values;
  }

  async findByAttributes(attributes) {
    try {
      const foundValues = await Value.find(attributes);
      return foundValues;
    } catch (error) {
      throw new Error(`Error finding values: ${error.message}`);
    }
  }
}

export default ValueRepository;
