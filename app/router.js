'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const auth = app.middleware.auth()
  const { router, controller } = app;
  router.post('/trigger/:platform/:id', controller.trigger.index);
  router.get('/login', controller.member.renderLogin);
  router.post('/login', controller.member.login);

  router.get('/', auth, controller.hook.homeRender);
  router.get('/hook', controller.hook.homeRender);
  router.get('/hook/create', auth, controller.hook.createRender);
  router.post('/hook/del', auth, controller.hook.del);
  router.post('/hook/create', auth, controller.hook.create);
};
