import mongoose from 'mongoose';

function valueCheckerMiddleware(req, res, next) {
  const { user } = req.session;
  const { projectName } = req.params;

  try {
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const project = user.projects.find(p => p.projectName === projectName);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const ValueModel = mongoose.model('Value');
    const values = Array.isArray(req.body) ? req.body : [req.body];

    for (const currentReqValue of values) {
      if (currentReqValue._id && !mongoose.Types.ObjectId.isValid(currentReqValue._id)) {
        return res.status(400).json({ error: 'Invalid _id format in values array.' });
      }
    }

    for (const currentReqValue of values) {
      if (currentReqValue._id) {
        const existingValueIndex = project.values.findIndex(value =>
          value._id.equals(currentReqValue._id)
        );

        if (existingValueIndex !== -1) {
          const updatedValue = ValueModel.findOneAndUpdate(
            { _id: currentReqValue._id },
            {
              volume: currentReqValue.volume,
              cement: currentReqValue.cement,
              gravel: currentReqValue.gravel,
              sand: currentReqValue.sand,
              chb: currentReqValue.chb,
              area: currentReqValue.area,
              mortarCement: currentReqValue.mortarCement,
              plasterCement: currentReqValue.plasterCement,
              mortarSand: currentReqValue.mortarSand,
              plasterSand: currentReqValue.plasterSand,
            },
            { new: true }
          );
          project.values[existingValueIndex] = updatedValue;
        }
      }
    }

    project.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default valueCheckerMiddleware;
