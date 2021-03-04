const config = require('./common/config/env.config.js');

// framework declaration
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// router declaration
const SensorsRouter = require('./sensor/routes.config');
const SensorDataRouter = require('./sensorData/routes.config');
const SensorVarRouter = require('./sensorVar/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json({limit: '4mb'}));
app.use((err, req, res, next) => {
    if (err) {
      res.status(400).send(err)
    } else {
      next()
    }
  });
  
SensorsRouter.routesConfig(app);
SensorDataRouter.routesConfig(app);
SensorVarRouter.routesConfig(app);

app.listen(config.port, 'localhost', function () {
    console.log('app listening at port %s', config.port);
});