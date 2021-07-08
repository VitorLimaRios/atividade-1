const MONGO_DB_URL = 'mongodb://localhost:27017/leilao';
const DB_NAME = 'leilao';

const { MongoClient } = require('mongodb');

const OPTIONS = {
useNewUrlParser: true,
useUnifiedTopology: true,
};

let db = null;

const connection = () => {
return db
? Promise.resolve(db)
: MongoClient.connect(MONGO_DB_URL, OPTIONS)
.then((conn) => {
db = conn.db(DB_NAME);
return db;
})
.catch((err) => {
console.error(err);
process.exit(1);
});
};

module.exports = connection;
