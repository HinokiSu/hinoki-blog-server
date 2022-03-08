<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://hinoki-su-github-io.vercel.app/static/Hinoki_logo.png" width="120" alt="Hinoki Logo" /></a>
</p>
<h1 align="center">
 Hinoki's Blog Server
</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="120" alt="Nest Logo" valign="middle"/></a> &nbsp;&nbsp;
  <a href="https://www.mongodb.com/" target="blank"><img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress"  width="150" alt="mongo Logo" valign="middle" /></a>
</p>

# Description

Hinoki's Blog Server is a simple personal blog backend service platform.

# Precondition

- add `env.dev.env` and `env.prod.env` in root direction.

```
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_USER=''
DATABASE_PWD=''
DATABASE_COLLECTION=

JWT_SECRET=
```

## Installation

```bash
$ npm install
```

## Running

- Running the admin app

```bash
$ npm run start admin
```

- Running the server app

```bash
$ npm run start server
```

## Build

```
$ npm run build:all
```

## Preview

> need the `env.prod.env` or `env.prod.env` put in `dist/apps/admin` and `dist/apps/server` dirction. so that it can run.  
> Tip: need copy two files

```bash
$ npm run start prod:server
or
$ npm run start prod:admin
```

## Deploy

> Tips: need to use `pm2`  
> please modify `pm2.admin.config.json` and `pm2.server.config.json`

```bash
$ pm2 start pm2.admin.config.json
or
$ pm2 start pm2.server.config.json
```

## License

[MIT licensed](LICENSE).
