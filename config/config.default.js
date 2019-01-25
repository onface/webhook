'use strict';
const path = require('path')
const deploy = require('./deploy.json')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548300109198_6851';
  config.setupPassword = deploy.setupPassword
  if (config.setupPassword === '90b50271-ce0d-414d-8847-bfd14d86a665') {
    throw new Error('deploy.json setupPassword canot equal "90b50271-ce0d-414d-8847-bfd14d86a665" \r\m Please create a new password https://www.uuidgenerator.net/')
  }
  // add your config here
  config.middleware = [];
  exports.cluster = {
    listen: {
      port: parseInt(deploy.port)
    }
  }
  exports.security = {
    csrf: {
      enable: false
    },
  };
  exports.mysql = {
    // 单数据库信息配置
    client: deploy.mysql,
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
