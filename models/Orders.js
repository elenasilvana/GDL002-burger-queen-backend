const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declarates schema

//y si voy a agregar un array como la orden? 
const OrderSchema = new Schema({
    clientName: String,
    order: Array
});

//export module

//const Order = mongoose.model('Order', OrderSchema);
//module.exports = Order;
module.exports = mongoose.model('Order', OrderSchema);