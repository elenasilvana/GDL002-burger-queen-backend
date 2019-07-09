
const express = require('express');
//const router = express.Router();

const Order = require('../models/Orders');

module.exports = (app, next, secondNext)=>{


  app.get('/order', (req, res) => {
    //aquí deberían aparecer todas las ordenes
      Order.find({}, (err, orders)=>{
        if(err) return res.send({message: `error al mostrar productos ${err}`});
        res.json({orders});
      })

    });

  app.get('/order/:orderId', (req, res)=>{
    //recibe id y le hace get al elemento que corresponde al id
    //devuelve el elemento que se mandó a llamar
    let orderId= req.params.orderId;

    Order.findById(orderId, (err, order)=>{
      if(err) return res.send({message: `error al realizar la petición ${err}`});
      if (!order) return res.send({message: `la orden que buscas no existe`});
      res.json({order});
    })
  });

  app.post('/order', (req, res)=>{
    //crea un nuevo pedido con status pending
    //objeto con keys: status, id, items, items guarda la orden
    let order = new Order();
    console.log(req.body);

    order.clientname=req.body.clientname
    order.status=req.body.status
    order.order=req.body.order

    order.save((err, productstored)=>{
      if(err) res.send('error al registrar producto');
      res.json({order});
    });
  });

    //clientName: String,
    // status: {type: String, enum: ['pending', 'preparing', 'delivering', 'delivered']},
    //order: Array

  app.put('/order/:orderId', (req, res)=>{
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

  app.delete('/order/:orderId', (req, res)=>{
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

  return typeof next === 'function' ? next() : secondNext();

};

/*


module.exports = router;
*/