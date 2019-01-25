'use strict';
const Controller = require('egg').Controller;
const uuid = require('uuid')
class HookController extends Controller {
  async homeRender () {
    const { ctx, app } = this
    const pageSize = 10
    let queryPage = ctx.query.page || 1
    let total = await app.mysql.count('log', {})
    if (queryPage * pageSize > total) {
      queryPage = parseInt(total/pageSize) + 1
    }
    let resPage = queryPage
    let items = await app.mysql.select('log', {
      columns: ['id', 'hook_id', 'hook_name', 'request', 'response', 'run_log'],
      limit: pageSize,
      offset: (queryPage-1) * pageSize
    })
    if (Array.isArray(items)) {
      if (!items.length) {
        resPage = 10
      }
    }
    await ctx.render('log.html', { items, total: total, page: resPage });
  }
}

module.exports = HookController;
