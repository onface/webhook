'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548300109198_6851';
  config.setupPassword = '90b50271-ce0d-414d-8847-bfd14d86a665'
  // add your config here
  config.middleware = [];
  exports.security = {
    csrf: {
      enable: false
    },
  };
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '',
      // 端口号
      port: '',
      // 用户名
      user: '',
      // 密码
      password: '',
      // 数据库名
      database: '',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.view = {
    mapping: {
      '.html': 'ejs'
    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(',')
  };
  return config;
};
