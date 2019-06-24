const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//models
const Product = require('../models/Products');

router.use(function(req, res, next){
    console.log('aquí los productos')
    next()
});

router.get('/', (req, res) => {
    //aquí deberían aparecer todos los productos
    res.send('productooooos');
 });

router.get('/:productid', (req, res)=> {
    //aquí deberia aparecer el producto solicitado
});

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

        res.send('producto registrado existosamente')
    });

    /* 
    category: {type: String, enum: ['Desayuno', 'Normal']},
    img: String,//url de imagen
    price: {type:Number, default: 0},
    product: String, //nombre de */
});

router.put('/', (req, res)=>{
    //modifica el elemento
    //modificar el estatus 
});

router.delete('/:productid', (req, res)=>{
    //borrar el producto
})




module.exports = router;