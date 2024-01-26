class ValueRepository {
  constructor() {
    this.values = [];
  }

  save(project, value) {
    project.values.push(value);
    return value;
  }

  update(existingValue, updatedValue) {
    Object.assign(existingValue, updatedValue);
  }

  getAllValues(project) {
    return project.values;
  }

  findByAttributes(project, attributes) {
    return project.values.find((value) => {
      for (const key in attributes) {
        if (attributes[key] !== value[key]) {
          return false;
        }
      }
      return true;
    });
  }
}

export default ValueRepository;