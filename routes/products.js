const express = require('express');
const mongoose = require('mongoose');
//const router = express.Router();


const {
    requireAuth,
    requireAdmin,
    isAuthenticated,
    isAdmin,
  } = require('../middleware/auth');
  const {
    createPrivatePropsFilter,
    getPaginationParamsFromRequest,
    buildLinkHeader,
  } = require('../lib/util');
  

//models
const Product = require('../models/Products');

module.exports = (app, next, secondNext) => {

    /*
    router.use(function(req, res, next){
        console.log('/product entrando')
        next()
    }); 
    */

    //all products
    app.get('/product', requireAuth, (req, res) => {
        Product.find({}, (err, products)=>{
            if(err) return res.send({message: `Error al realizar la petición ${err}`});
            if (!products) return res.send({message: `no existen los productos`});

            res.json({products});
        });
    });

    

    //an especific product
    app.get('/product/:productId', requireAuth, (req, res, next)=> {
        console.log('estoy entrando');
        let productId = req.params.productId;
        console.log(productId);
        
        Product.findById(productId, (err, product)=> {
            if(err) return res.send({message: `error al realizar la petición`}); 
            if(!product) return res.send({message: `el producto no existe`});

            res.json({product:product});
        });
    }); 

    //create and save new product
    app.post('/product/', requireAuth, (req, res)=>{
        //const { category, img, price, product  } = req.body;
        //creas un nuevo producto 
        //price y name son necesarios
        console.log(req.body);
        let product = new Product()

        product.category= req.body.category
        product.img= req.body.img
        product.price= req.body.price
        product.product= req.body.product
        
        product.save((err, productstored)=>{
            if(err) res.send('error al registrar producto');

            res.json({product});
        });

    });

    //modify product
    app.put('/product/:productId', requireAuth, (req, res)=>{
        //modifica el elemento
        //modificar el estatus
        let productId = req.params.productId;
        let update = req.body;
        console.log(update);
        Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
            if(err) res.send({message: `Error al actualizar el producto ${err}`});
            res.json({product: productUpdated})
        }); 
    });

    //delete product
    app.delete('/product/:productId', requireAuth, (req, res)=>{
        //borrar el producto
        let productId = req.params.productId;
        
        Product.findById(productId, (err, product)=> {
            if(err) res.send({message: `Error al borrar el producto ${err}`});

            product.remove(err => {
                if(err) res.json({message: `Error al borrar el producto: ${err}`});
                res.json({message: `El producto ha sido eliminado`});
            });
        });

    });



    return typeof next === "function" ? next () : secondNext ();

};



/*




module.exports = router;*/