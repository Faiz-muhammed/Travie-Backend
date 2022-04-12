const mongoClient = require("mongodb").MongoClient;
const state = { db: null };
module.exports.connect = function (done) {
  const url ="mongodb+srv://muhammedfaiz:7510455076@travie.kzoue.mongodb.net/Travie?retryWrites=true&w=majority";
  const dbname = "quantiplyDb";

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err);

    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};