
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
      if(err) return res.send({message: `error al mostrar productos ${err}`});
      res.json({orders});
    })

  });

 router.get('/:orderId', (req, res)=>{
   //recibe id y le hace get al elemento que corresponde al id
   //devuelve el elemento que se mandó a llamar
   let orderId= req.params.orderId;

   Order.findById(orderId, (err, order)=>{
     if(err) return res.send({message: `error al realizar la petición ${err}`});
     if (!order) return res.send({message: `la orden que buscas no existe`});
     res.json({order});
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
     res.json({order});
   });
 });

 /* 
    clientName: String,
    status: {type: String, enum: ['pending', 'preparing', 'delivering', 'delivered']},
    order: Array

  */

 router.put('/:orderId', (req, res)=>{
   //modifica un pedido de pending a: preparing, delivergin, delivered.
   let orderId = req.params.orderId;
   console.log(orderId);
   let update = req.body;
   console.log(update);
   Order.findByIdAndUpdate(orderId, update, {new: true}, (err, orderUpdated)=>{
     if(err) res.send({message: `error al actualizar el producto ${err}`});
     res.json({order: orderUpdated});
   });
   

 });

 router.delete('/:orderId', (req, res)=>{
   //borra un pedido
   let orderId = req.params.orderId;

    Order.findById(orderId, (err, order)=>{
    if(err) res.send({message: `error al borrar el producto ${err}`});

      order.remove(err => {
        if(err) res.send({message: `error al borrar la orden ${err}`});
        res.send({message: `la orden ha sido eliminada`});
      });

    })
   

 });

 /*
  //borrar el producto
    let productId = req.params.productId;
    
    Product.findById(productId, (err, product)=> {
        if(err) res.send({message: `Error al borrar el producto ${err}`});

        product.remove(err => {
            if(err) res.send({message: `Error al borrar el producto: ${err}`});
            res.send({message: `El producto ha sido eliminado`});
        });
    });
 */

module.exports = router;
