const {MongoClient} = require("mongodb");
const connString = process.env.ATLAS_URI;
console.log(connString);
const client = new MongoClient(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: callback => {
        client.connect( (err, db) => {
            // Verify we got a good "db" object
            if(db){
                _db = db.db("shoppingListDB");
                console.log("Successfully connected to MongoDB.")
            }
            return callback(err);
        })
    },
    
    getDb: () => {
        return _db;
    },
};