const auth = require('./auth');
const users = require('./users');
//order
const order = require('./orders');
//products
const products = require('./products');



const root = (app, next) => {
  const pkg = app.get('pkg');
  //console.log(' aqui el pkg ', pkg); //regresa el json de la app
  //esto es lo que se ve en el localhost
  app.get('/', (req, res) => res.json({ name: pkg.name, version: pkg.version }));
  app.all('*', (req, resp, next) => next(404));
  return next();
};


const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, (err) => {
    if (err) {
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};


module.exports = (app, next) => register(app, [
  auth,
  users,
  products,
  order,
  root
], next);
