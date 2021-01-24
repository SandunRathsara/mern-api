class UserResponse {
  constructor(user) {
    this.email = user.email;
    this.mobile = user.mobile;
    this.fname = user.fname;
    this.lname = user.lname;
  }
}

module.exports = UserResponse;
