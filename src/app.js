const createConnection = require('typeorm').createConnection;
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const {ConnectionStringParser} = require("connection-string-parser");
const {NotFoundError} = require('./errors');
const ormconfig = require('../ormconfig');
const app = express();
require("reflect-metadata");


// parse connection string if present
const connectionStringParser = new ConnectionStringParser({
  scheme: "mysql",
  hosts: []
});

let connectionObject;
if (process.env.DATABASE_URL) {
  connectionObject = connectionStringParser.parse(process.env.DATABASE_URL);
}

// create assets folder if not found
if (!fs.existsSync(path.join(__dirname, '..', 'assets'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'assets'));
}

// initialize typeorm connection
createConnection(process.env.DATABASE_URL ?
  ormconfig.connectionString(connectionObject) :
  ormconfig.normal
).then(async () => {

  // initialize db and register job workers
  await require('./jobs')();

  // configure middleware
  app.enable("trust proxy");
  app.use(bodyParser.json());
  app.use(fileUpload());

  // register routes
  app.use('/api', require('./api/schedule'));
  app.use('/api/admin', require('./api/admin'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/news', require('./api/news'));
  app.all('*', (req, res) => {
    res.status(404).send({
      status: 'error',
      name: "NotFoundError",
      message: "API endpoint not found"
    })
  });

  // handle errors in routes
  app.use((err, req, res, next) => {
    res.status(err.statusCode ? err.statusCode : 400).send({
      status: 'error',
      name: err.name,
      message: err.message
    })
  });

  // start server
  app.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.error(error);
      process.exit(1);
      return;
    }
    console.log(`Server listening on port: ${process.env.PORT || 3000}`)
  });
}).catch(error => {
  console.error(error);
  process.exit(1);
});