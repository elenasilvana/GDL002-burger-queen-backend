
const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');

router.use(function(req, res, next){
  console.log('/order entrando')
  next()
});

router.get('/', (req, res) => {
  //aquí deberían aparecer todas las ordenes
    Order.find({}, (err, orders)=>{
      if(err) return res.send({message: `error al mostrar productos ${err}`})
      res.send({orders});
    })

  });

 router.get('/:orderId', (req, res)=>{
   //recibe id y le hace get al elemento que corresponde al id
   //devuelve el elemento que se mandó a llamar
   let orderId= req.params.orderId;

   Order.findById(orderId, (err, order)=>{
     if(err) return res.send({message: `error al realizar la petición ${err}`});
     if (!order) return res.send({message: `la orden que buscas no existe`});
     res.send({order});
   })
 });

 router.post('/', (req, res)=>{
   //crea un nuevo pedido con status pending
   //objeto con keys: status, id, items, items guarda la orden
   let order = new Order()

   order.clientname=req.body.clientname
   order.status=req.body.status
   order.order=req.body.order

   order.save((err, productstored)=>{
     if(err) res.send('error al registrar producto');
     res.send({order});
   });
 });

 /* 
    clientName: String,
    status: {type: String, enum: ['pending', 'preparing', 'delivering', 'delivered']},
    order: Array

  */

 router.put('/:id', (req, res)=>{
   //modifica un pedido de pending a: preparing, delivergin, delivered.

 });

 router.delete('/:id', (req, res)=>{
   //borra un pedido
 });

module.exports = router;
