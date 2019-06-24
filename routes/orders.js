
const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.use(function(req, res, next){
  console.log('gatitos bonitos')
  next()
})

  router.get('/', (req, res) => {
       res.send('aquí estás');
// res.json(message, 'Aqui estas');
   });

 

module.exports = router;
