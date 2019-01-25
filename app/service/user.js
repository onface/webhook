const Service = require('egg').Service;

class UserService extends Service {
  async find(info) {
    // info is {name: 'admin', password: 'password',id: 'asdasdsad'}
    const user = await this.ctx.db.get('user', info);
    return user;
  }
}

module.exports = UserService;
