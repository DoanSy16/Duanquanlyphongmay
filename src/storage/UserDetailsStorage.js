class UserDetailsStorage {
  constructor() {
    if (!UserDetailsStorage.instance) {
      this.users = new Map(); // Lưu trữ thông tin người dùng
      UserDetailsStorage.instance = this;
    }
    return UserDetailsStorage.instance;
  }

  // Lấy tất cả người dùng
  getUsers() {
    return this.users;
  }

  // Thêm hoặc cập nhật người dùng
  setUser(userId, userModel) {
    if (!userId) {
      throw new Error('Invalid userId. It must be a non-empty string.');
    }
    if (typeof userModel !== 'object' || userModel === null) {
      throw new Error('Invalid userModel. It must be an object.');
    }

    // if (!this.users.has(userId)) {
    //   console.log(`Adding user with ID: ${userId}`);
    // } else {
    //   console.log(`Updating user with ID: ${userId}`);
    // }
    this.users.set(userId, userModel); 
  }

  // Xóa người dùng
  remove(userId) {
    if (this.users.has(userId)) {
      this.users.delete(userId);
      // console.log(`Removed user with ID: ${userId}`);
    } else {
      console.warn(`User with ID ${userId} does not exist.`);
    }
  }

  // Tìm kiếm người dùng theo điều kiện
  findUsersByCondition(conditionFn) {
    const results = [];
    for (const [userId, userModel] of this.users.entries()) {
      if (conditionFn(userModel, userId)) {
        results.push({ userId, ...userModel });
      }
    }
    return results;
  }

  // Lấy người dùng theo ID
  getUserById(userId) {
    return this.users.get(userId) || null;
  }
}

const instance = new UserDetailsStorage();
Object.freeze(instance);

module.exports = instance;
