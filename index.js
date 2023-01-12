const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors')
const schema = require('./schema/schema');

const app = express();

const PORT = process.env.PORT || 80

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};
app.use(cors(corsOptions));
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  next();
}
app.use(allowCrossDomain);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, error => {
  error ? console.log(error) : console.log(`Server has been started! Port - ${PORT}`);
})