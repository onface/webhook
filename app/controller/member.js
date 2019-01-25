'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5')
class HomeController extends Controller {
  async renderLogin() {
    const { ctx } = this
    await ctx.render('login.html', {});
  }
  async login() {
    const { ctx, service, app } = this
    const user = await app.service.user.find({name: ctx.request.body.name})
    if (user) {
    }
    if (user) {
      if (user.password === md5(user.id + ':' + ctx.request.body.password)) {
        ctx.session.user = user.id
        ctx.body = app.res('pass')
      }
      else {
        ctx.body = app.res('fail', '密码错误')
      }
    }
    else {
      ctx.body = app.res('fail', '用户不存在')
    }
  }
}

module.exports = HomeController;
