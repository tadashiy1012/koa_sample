'use strict';
const path = require('path');
const koa = require('koa');
const route = require('koa-route');
const views = require('co-views');
const app = koa();
const render = views(path.join(__dirname, 'views'), {ext: 'pug'});

const port = 3000;

app.use(function *(next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(route.get('/', function *() {
  this.body = yield render('index', { title: 'index' });
}));

app.use(route.get('/calc/:a/:b', function *(a, b) {
  this.body = a + ' + ' + b + ' = ' + (parseInt(a, 10) + parseInt(b, 10));
}));

app.listen(port);
console.log('app start at %s', port);