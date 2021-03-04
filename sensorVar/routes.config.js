const SensorVarController = require('./controllers/sensorVar.controller');
const config = require('../common/config/env.config');


exports.routesConfig = function (app) {
    app.get('/sensor/var/:sensorId', [
        SensorVarController.list 
    ]);
    app.get('/sensor/var/:sensorId/:key', [
        SensorVarController.findBySensorKey 
    ]);
    app.patch('/sensor/var/:sensorId', [
        SensorVarController.upinsert
    ]); 
    app.delete('/sensor/var/:sensorId', [
        SensorVarController.removeBySensorId
    ]);
    app.delete('/sensor/var/:sensorId/:key', [
        SensorVarController.removeBySensorKey
    ]);
};
