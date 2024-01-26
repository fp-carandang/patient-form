class UserRepository {
  constructor() {
    this.users = [];
  }

  save(user) {
    this.users.push(user);
    return user;
  }

  getAllUsers() {
    return this.users;
  }

  findByUsername(username) {
    const user = this.users.find(function (user) {
      return user.username === String(username);
    });

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}

export default UserRepository;
