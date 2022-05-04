const { response } = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get( (req, response) => {
    let db_connect = dbo.getDb("items");
    db_connect.collection("items").find({}).toArray((err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/add").post((req, response) => {
    let db_connect = dbo.getDb();
    let myobj = {
        itemName: req.body.itemName,
    };
    console.log(myobj);
    db_connect.collection("items").insertOne(myobj, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});


module.exports = recordRoutes;