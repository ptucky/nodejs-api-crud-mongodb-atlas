const express = require("express");

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://[USER]:[PASS]@cluster0.g9o3s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//const router = express.Router();
const application = express();
const bodyParser = require('body-parser');

application.use(bodyParser.urlencoded({ extend: true }));
application.use(bodyParser.json()); // json for api

application.get("/", (req, res) => {
    res.send("index")
});

application.get('/list-db', async (req, res) => {

    try {
        await client.connect();
        const databasesList = await client.db().admin().listDatabases();

        //let dbLists  = databasesList.databases.forEach(db => ` - ${db.name}`);
        res.send(databasesList.databases);

    } catch (e) {
        res.status(500).send({
             message: e.message || "Some error occurred while retrieving notes."
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }

});

application.get('/get-list/:propertyType', async (req, res) => {
    //House, //Apartment, //Condominium
    //Infinite Views
    try {

        await client.connect();

        const maximumNumberOfResults = 5;
        const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .findOne({ property_type: req.params.propertyType });
        //.findOne({ name: req.params.propertyType });
       
        res.send(result);

    } catch (e) {
        res.status(500).send({
             message: e.message || "Some error occurred while retrieving notes."
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }

});

application.get('/list-types/:propertyType', async (req, res) => {
    
    try {

        await client.connect();

        const maximumNumberOfResults = 5;
        const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: 4 },
            bathrooms: { $gte: 5 }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

        const results = await cursor.toArray();
        res.send(results);

    } catch (e) {
        res.status(500).send({
             message: e.message || "Some error occurred while retrieving notes."
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }

});

application.get('/list-id/:roomId',async (req, res) => {
    
    try {

        await client.connect();

        const maximumNumberOfResults = 5;
        const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: 4 },
            bathrooms: { $gte: 5 }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

        const results = await cursor.toArray();
        res.send(results);

    } catch (e) {
        res.status(500).send({
             message: e.message || "Some error occurred while retrieving notes."
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }

});


application.post('/property',async (req, res, next) => {

    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }
    
    try {

        await client.connect();

        const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .insertOne(req.body);

        res.send(`New listing created Id: ${result.insertedId}`);

    } catch (e) {
        await res.status(500).send({
             message: e.message || "Some error occurred while retrieving notes."
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }

});


application.put('/property/:propertyId', async (req, res) => {

    // Validate request
    if(!req.params.propertyId) {
        return res.status(400).send({
            message: "Update propertyId can not be empty"
        });
    }
       
    try {

        await client.connect();

        const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .updateOne({ _id: req.params.propertyId }, { $set: req.body });

        //console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        //console.log(`${result.modifiedCount} document(s) was/were updated.`);

        res.send(req.body);
 
    } catch (e) {
        await res.status(500).send({
             message: e.message || "Error updating note with id " + req.params.propertyId
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }
    
});


application.delete('/property/:propertyId', async (req, res) => {

    // Validate request
    if(!req.params.propertyId) {
        return res.status(400).send({
            message: "Delete propertyId can not be empty"
        });
    }

    try {

        await client.connect();

        const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteOne({  _id: req.params.propertyId });

        res.send(`${result.deletedCount} document(s) was/were deleted.`);

    } catch (e) {
        await res.status(500).send({
            message: e.message || "Error delete with id " + req.params.propertyId
        });
    } finally {
        // Close the connection to the MongoDB cluster
        // await client.close();
    }
    
});


application.listen("3000", () => {
    console.log("Server started: http://localhost:3000/");
});