'use strict';
const Controller = require('egg').Controller;
const uuid = require('uuid')
class HookController extends Controller {
  async homeRender () {
    const { ctx, app } = this
    let items = await app.mysql.select('log', {
      columns: ['id', 'hook_id', 'request', 'response', 'run_log']
    })
    await ctx.render('log.html', { items });
  }
}

module.exports = HookController;
