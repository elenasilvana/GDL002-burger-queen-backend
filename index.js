const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const cors = require('cors');
//para prender el server
//sudo service mongod start 

//parar server
//sudo service mongod stop

const { mongoUrl, secret } = config;
const app = express();


// Conectar aplicación a MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.set('config', config);
app.set('pkg', pkg);


app.use(express.json());
app.use(authMiddleware(secret));
app.use(cors());


// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  // Registro de "middleware" que maneja posibles errores
  app.use(errorHandler);

  const port = process.env.PORT || 6000;
  app.listen(port, () => console.log(`App listening on port ${port}`));
});

