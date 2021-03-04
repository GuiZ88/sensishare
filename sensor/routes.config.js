const SensorController = require('./controllers/sensor.controller');
const auth = require('../common/auth/auths.js');


exports.routesConfig = function (app) {
    app.post('/sensor',
        auth.admin,
        SensorController.insert
    );
    app.get('/sensors',
        SensorController.list
    );
    app.get('/sensor/:sensorId',
        SensorController.getById
    );
    app.patch('/sensor/:sensorId',
        auth.admin,
        SensorController.patchById
    );
    app.delete('/sensor/:sensorId',
        auth.admin,
        SensorController.removeById
    );
};
