class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.projects = [];
  }
}

export default User;