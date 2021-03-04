const SensorDataController = require('./controllers/sensorData.controller');
const config = require('../common/config/env.config');


exports.routesConfig = function (app) {
    app.post('/sensor/data/:sensorId', [
        SensorDataController.insert
    ]); 
    app.post('/sensor/bulk-data/:sensorId', [
        SensorDataController.insertMany
    ]);
    app.get('/sensor/data/:sensorId', [
        SensorDataController.list 
    ]);
    app.get('/sensor/data/count/:sensorId', [
        SensorDataController.count
    ]);
    app.delete('/sensor/data/flush/:sensorId', [
        SensorDataController.removeBySensorId
    ]);
    app.delete('/sensor/data/drop/:sensorId', [
        SensorDataController.dropBySensorId
    ]);
    app.get('/sensor/data/:sensorId/:id', [
        SensorDataController.findById
    ]);
};
