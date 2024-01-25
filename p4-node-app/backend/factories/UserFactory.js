import User from '../models/User.js';

class UserFactory {
  create(username, password, email) {
    return new User(username, password, email);
  }
}

export default UserFactory;