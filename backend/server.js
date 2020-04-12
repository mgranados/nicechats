const Koa = require('koa');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = new Koa();
const router = require('./router');

app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(compress());
app.use(responseTime());
app.use(logger());

let mongoUrl;

if (process.env.MONGO_USER) {
  mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${
    process.env.MONGO_HOST
  }:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
} else {
  mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
    process.env.MONGO_DB
  }`;
}
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(router.routes());

app.listen(4000);
console.log('API up => http://localhost:4000');
