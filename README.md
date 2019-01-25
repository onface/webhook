# @onface/webhook

gitlab webhook

### Environment depends on

```bash
node@8.9.0
yarn@1.13.0
mysql@5.7
```

### config

Create File: `/config/deploy.json`
```json
{
  "port": 3212,
  "setupPassword": "90b50271-ce0d-414d-8847-bfd14d86a665",
  "mysql": {
    "host": "",
    "port": "",
    "user": "",
    "password": "",
    "database": "webhook"
  }
}
```

Please create a new `setupPassword`。 [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/)

### Deploy

```bash
$ git clone https://github.com/onface/webhook.git
$ yarn
$ npm start
$ npm stop
```


### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
