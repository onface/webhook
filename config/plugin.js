'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
exports.session = true;
