var mongoxlsx = require('mongo-xlsx');
/* Read xlsx file without a model */
/* The library will use the first row the key */

var model = null;
var data = [];
 
var xlsx  = './SampleData.xlsx';
var jsonString;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/telecom/telecomData'); // connect to our database

var Order     = require('./app/models/Order');
 
mongoxlsx.xlsx2MongoData(xlsx, model, function(err, data) {
  //console.log(data);
  /*
  [{ Name: 'Eddie', Email: 'edward@mail' }, { Name: 'Nico', Email: 'nicolas@mail' }]  
  */
   copyData(data);
  //jsonString = JSON.stringify(data);
  // console.log(data)


});
 

function copyData(data) {

	/*for(row in data) {
		console.log("Printing new Row: ")
		console.log(row['Item'])
	}*/

	
	data.forEach( function(arrayItem) {

	var order = new Order();
 
	console.log(arrayItem.Item)
	order.OrderDate = arrayItem.OrderDate;
	order.Region = arrayItem.Region;
	order.Rep = arrayItem.Rep;
	order.Units = arrayItem.Units;
	order.UnitCost = arrayItem.UnitCost;
	order.Total = arrayItem.Total;
	order.Item = arrayItem.Item;

	order.save(function(err) {
        if (err)
            res.send(err);

        console.log("Order Created!")
    });

	});

	
}