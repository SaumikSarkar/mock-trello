const { MongoClient } = require('mongodb');

let database = null;

async function startDatabase() {
    const mongoDBURL = 'mongodb+srv://krotinox:me@Thane@cluster0-skmxe.mongodb.net/test?retryWrites=true&w=majority';
    const connection = await MongoClient.connect(mongoDBURL, { useNewUrlParser: true });
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};