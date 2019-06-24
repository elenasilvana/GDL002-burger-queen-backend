const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//models
const Product = require('../models/Products');

router.use(function(req, res, next){
    console.log('/product entrando')
    next()
});

//all products
router.get('/', (req, res) => {
    Product.find({}, (err, products)=>{
        if(err) return res.send({message: `Error al realizar la petición ${err}`});
        if (!products) return res.send({message: `no existen los productos`});

        res.send({products});
    });
 });

//an especific product
router.get('/:productId', (req, res)=> {
    let productId = req.params.productId;
    
    Product.findById(productId, (err, product)=> {
        if(err) return res.send({message: `error al realizar la petición`}); 
        if(!product) return res.send({message: `el producto no existe`});

        res.send({product:product});
    });
});

//save product
router.post('/',(req, res)=>{
    //creas un nuevo producto 
    //price y name son necesarios
    let product = new Product()

    product.category= req.body.name
    product.img= req.body.img
    product.price= req.body.price
    product.product= req.body.product
    
    product.save((err, productstored)=>{
        if(err) res.send('error al registrar producto');

        res.send({product});
    });

    /* 
    category: {type: String, enum: ['Desayuno', 'Normal']},
    img: String,//url de imagen
    price: {type:Number, default: 0},
    product: String, //nombre de */
});

router.put('/:productId', (req, res)=>{
    //modifica el elemento
    //modificar el estatus
    let productId = req.params.productId;
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
        if(err) res.send({message: `Error al actualizar el producto ${err}`});
        res.json({product: productUpdated})
    }); 
});

router.delete('/:productid', (req, res)=>{
    //borrar el producto
})




module.exports = router;