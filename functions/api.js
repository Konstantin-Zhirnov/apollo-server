const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const serverless = require('serverless-http');
// const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

// const corsOptions = {
//   origin(origin, callback) {
//     callback(null, true);
//   },
//   credentials: true
// };
// app.use(cors(corsOptions));
// const allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,token');
//   next();
// }
// app.use(allowCrossDomain);

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));


module.exports.handler = serverless(app);