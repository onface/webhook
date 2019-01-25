module.exports = options => {
  return async function auth(ctx, next) {
    if (!ctx.session.user) {
      if (ctx.isAjax) {
        ctx.body = ctx.app.res('fail', "请先登录")
      }
      else {
        ctx.redirect('/login')
      }
      return
    }
    else {
      let userInfo = await ctx.app.mysql.get('user', {id: ctx.session.user})
      if (!userInfo) {
        ctx.body = ctx.app.res('fail', "请先登录,用户id未找到")
        return
      }
    }
    await next();
  };
};
