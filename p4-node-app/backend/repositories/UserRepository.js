import User from '../models/User.js';

class UserRepository {
  async save(user) {
    await user.save();
    return user;
  }

  async getAllUsers() {
    return await User.find({});
  }

  async findByUsername(username) {
    try {
      const user = await User.findOne({ username });
      return user || null;
    } catch (error) {
      console.error('Error in findByUsername:', error);
      throw new Error('An error occurred while searching for the user.');
    }
  }

  async findById(userId) {
    return await User.findById(userId);
  }
}

export default UserRepository;