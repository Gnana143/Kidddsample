const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
AWS.config.update({ region: process.env.REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
var app = express();
app.use(awsServerlessExpressMiddleware.eventContext({ deleteHeaders: false }), bodyParser.json(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

//Get function invoked to get the data
app.get('/KiddoD/ITEMS', function(req, res) {
  dynamodb.scan({ TableName:  'kiddd-mobilehub-773472619-sample'}, function(err, data) {
    if (err) {
        console.log(err)
        res.status(500).json({
            message: "Could not load items"
        }).end()
    } else {
        res.json(data['Items'])
    }
})
//res.json({"hello":"this is API"});
});

//To get details of specific user
app.post('/KiddoD/USER/', function(req, res) {
    var userinfo=req.params.user; 
    var params = {
        TableName : 'kiddd-mobilehub-773472619-sample',
        Key: req.body
      };
    
    dynamodb.get(params, function(err, data) {
        
        console.log(req)
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "Could not load user data"
            }).end()
        } else {
            if (data['Item']) {
                res.json(data['Item'])
            } else {
                res.status(404).json({
                    message: "user data not exist"
                })
            }
        }
    })
});
//POST Function invoked to put the data

app.post('/KiddoD/PUT', function(req, res) {
    var order = {}
    
    order.userId = req.body.userId;
    order.userName= req.body.userName;
    order.user =req.body.user;
    order.date=req.body.date;
    params={
        TableName: 'kiddd-mobilehub-773472619-kidd2',
        Item :order
    }
    console.log(order);
    dynamodb.put(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "Could not load table"
            }).end()
        } else {
            res.json(order)
        }
    })
});

app.post('/KiddoD/UPDATE', function(req, res) {
    var params = {
        TableName:'kiddd-mobilehub-773472619-sample',
        Key:req.body.key,
        UpdateExpression: "set BMI.height = :h, BMI.weight=:w, BMI.rate=:r ,updated_date=:Date",
        ExpressionAttributeValues:{
            ":r":req.body.rate,
            ":h": req.body.height,
            ":w": req.body.weight,
            ":Date":req.body.date
        },
        ReturnValues:"UPDATED_NEW"
    };
    dynamodb.update(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "Could not load table"
            }).end()
        } else {
            res.json(data)
        }
    })
});

app.post('/KiddoD/updateCRON', function(req, res) {
    var params = {
        TableName:'kiddd-mobilehub-773472619-sample',
        Key:req.body.key,
        UpdateExpression: "set conditions.HeartRate = :rate, conditions.activity=:activity, conditions.skintemp=:skintemp ,conditions.updated_date=:Date ,conditions.steps =:steps ,conditions.gst=:gst",
        ExpressionAttributeValues:{
            ":rate":req.body.HeartRate,
            ":activity": req.body.activity,
            ":skintemp": req.body.skintemp,
            ":steps":req.body.steps,
            ":gst":req.body.gst,
            ":Date":req.body.Updateddate
        },
        ReturnValues:"UPDATED_NEW"
    };
    dynamodb.update(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "Could not load table"
            }).end()
        } else {
            res.json(data)
        }
    })
});


console.log('API is invoked');
module.exports = app

