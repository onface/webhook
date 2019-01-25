'use strict';
const ejs = require('ejs')
const process = require('child_process')
const Controller = require('egg').Controller;

const execScript = function (script) {
  return new Promise(function (resolve) {
    process.exec(script, function (error, stdout, stderr) {
          if (error !== null) {
            resolve({
              type: 'fail',
              msg: error.message
            })
          }
          else {
            resolve({
              type: 'pass',
              data: {
                stdout: stdout,
                stderr: stderr
              }
            })
          }
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
        const result = await execScript(ejs.render(hook.run, ctx.request.body))
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
