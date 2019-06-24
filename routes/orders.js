
const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.use(function(req, res, next){
  console.log('gatitos bonitos')
  next()
})

router.get('/', (req, res) => {
  //aquí deberían aparecer todas las ordenes
      res.send('aquí estás');
  });

 router.get('/:id', (req, res)=>{
   //recibe id y le hace get al elemento que corresponde al id
   //devuelve el elemento que se mandó a llamar
 });

 router.post('/', (req, res)=>{
   //crea un nuevo pedido con status pending
   //objeto con keys: status, id, items, items guarda la orden
 });

 router.put('/:id', (req, res)=>{
   //modifica un pedido de pending a: preparing, delivergin, delivered.

 });

 router.delete('/:id', (req, res)=>{
   //borra un pedido
 });

module.exports = router;
