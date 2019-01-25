'use strict';
const ejs = require('ejs')
const process = require('child_process')
const Controller = require('egg').Controller;
const uuid = require('uuid')
const execScript = function (script, hook, request, app) {
  return new Promise(async function (resolve) {
    process.exec(script, async function (error, stdout, stderr) {
          let response = {}
          if (error !== null) {
            response = {
              type: 'fail',
              msg: error.message
            }
          }
          else {
            response = {
              type: 'pass'
            }
          }
          let data = {
            id: uuid(),
            hook_id: hook.id,
            // 插入hook_name 是为了减少在 log 时查询 hook_name
            // 但是专业做 hook_name 是快照，不是最新的 hook_name
            hook_name: hook.name,
            request: JSON.stringify(request),
            response: JSON.stringify(response),
            run_log: JSON.stringify({
              stdout: stdout,
              stderr: stderr
            })
          }
          await app.mysql.insert('log', data)
          resolve(response)
    });
  })
}

class TriggerController extends Controller {
  async index() {
    const { ctx, app } = this
    const hook = await app.mysql.get('hook', {
      'id': ctx.params.id
    })
    if (hook) {
      if (ctx.headers['x-gitlab-token'] === hook.token) {
        const result = await execScript(
          ejs.render(hook.run, ctx.request.body),
          hook,
          {
            headers: ctx.headers,
            body: ctx.request.body,
            query: ctx.query
          },
          app
        )
        ctx.body = result
      }
      else {
        ctx.body = app.res('fail', 'error token')
      }
    }
    else {
      ctx.body = app.res('fail', 'not found hook')
    }
  }
}

module.exports = TriggerController;
