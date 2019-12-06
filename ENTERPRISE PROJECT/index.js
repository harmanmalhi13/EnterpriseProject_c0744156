const express = require('express')
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./html_data'))

app.get('/menu',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");	
		dbo.collection('Dessert').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION
app.post('/menu_data',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var doc = { '_id':req.body.menu_id,
        'Name':req.body.menu_name,
        'Price':req.body.menu_price,
        'Desc':req.body.menu_descs};
		dbo.collection('Dessert').insertOne(doc,function(err, result) 
		{
			if (err) throw err
			res.send("Data is inserted to menu");
			db.close();
		});
	});
});


  
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}..'));








