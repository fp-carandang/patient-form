import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: String,
  date: {
    type: Date,
    default: Date.now,
  },
  values: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Value',
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;