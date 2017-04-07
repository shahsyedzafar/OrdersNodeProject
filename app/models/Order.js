var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var OrderSchema   = new Schema({
    OrderDate: String,
    Region: String,
    Rep: 	String,
    Item: String,
    Units: Number,
    UnitCost: Number,
    Total: Number

});

module.exports = mongoose.model('Order', OrderSchema);