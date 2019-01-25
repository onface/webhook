const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const md5 = require('md5')
const getTextContent = function (filePath) {
  filePath = path.join(__dirname, filePath)
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        throw err
      }
      else {
        resolve(data.toString())
      }
    })
  })
}
module.exports = app => {
  app.beforeStart(async () => {
    // 从配置中心获取 MySQL 的配置
    // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
    const mysqlConfig = app.config.mysql.client;
    app.database = app.mysql.createInstance(mysqlConfig);
    await app.database.query(await getTextContent('./config/database/init/1.createHookTable.sql'))
    await app.database.query(await getTextContent('./config/database/init/2.createLogTable.sql'))
    await app.database.query(await getTextContent('./config/database/init/3.createUserTable.sql'))
    const userTable = await app.database.get('user')
    if (!userTable) {
      const insertData = {
        id: uuid(),
        name: 'admin'
      }
      insertData.password = md5(insertData.id + ':' + app.config.setupPassword)
      await app.database.insert('user', insertData)
    }
  });
};
