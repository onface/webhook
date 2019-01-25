'use strict';
const Controller = require('egg').Controller;
const uuid = require('uuid')
class HookController extends Controller {
  async createRender () {
    const { ctx } = this
    await ctx.render('hook_create.html', {});
  }
  async homeRender () {
    const { ctx, app } = this
    let items = await app.mysql.select('hook', {
      columns: ['id', 'name', 'platform', 'repository_url', 'branch', 'event', 'token', 'run']
    })
    await ctx.render('hook.html', { items });
  }
  async del () {
    const { ctx, app } = this
    if (!ctx.request.body.id) {
      ctx.body = app.res('fail', 'id is required')
      return
    }
    console.log(
      {
        id: ctx.request.body.id
      }
    )
    await app.mysql.delete('hook', {
      id: ctx.request.body.id
    })
    ctx.body = app.res('pass')
  }
  async create () {
    const { ctx, app } = this
    const data = {}
    const copyKeys = ['name', 'platform', 'repository_url', 'branch', 'event', 'token', 'run']
    let keyCheckBreak = false
    copyKeys.some(function (key) {
      if (!ctx.request.body[key]) {
        ctx.body = app.res('fail', key + ' is required!')
        keyCheckBreak = true
        return true
      }
      data[key] = ctx.request.body[key]
    })
    if (keyCheckBreak) { return }
    data.id = uuid()
    await app.mysql.insert('hook', data)
    ctx.body = app.res('pass')
  }
}

module.exports = HookController;
