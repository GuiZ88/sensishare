const SensorDataModel = require('../models/sensorData.model');
const SensorModel = require('../../sensor/models/sensor.model');
const config = require('../../common/config/env.config.js');


exports.insert = (req, res) => {
    SensorModel.findById(req.params.sensorId)
        .then((sensor) => {
            if (req.header('Secret-Key') != sensor.secretKey) {
                res.status(401).send();
                return;
            }
            SensorDataModel.createSensorData(req.body, req.params.sensorId)
                .then((result) => {
                    res.status(201).send({ id: result._id });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send(error);
                });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
};

exports.insertMany = (req, res) => {
    SensorModel.findById(req.params.sensorId)
        .then((sensor) => {
            if (req.header('Secret-Key') != sensor.secretKey) {
                res.status(401).send();
                return;
            }
            SensorDataModel.insertMany(req.body, req.params.sensorId)
                .then((result) => {
                    res.status(201).send({ id: result._id });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send(error);
                });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
};

exports.list = (req, res) => {

    let limit = req.query.limit && req.query.limit <= 10000 ? parseInt(req.query.limit) : 10;

    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    SensorDataModel.list(limit, page, req.params.sensorId)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.removeBySensorId = (req, res) => {
    //auth by key or secret
    if (req.header('Auth-Key') != config.AdminAuthKey) {
        SensorModel.findById(req.params.sensorId)
            .then((sensor) => {
                if (req.header('Secret-Key') != sensor.secretKey) {
                    res.status(401).send();
                    return;
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send(error);
            });
    }

    SensorDataModel.removeBySensorId(req.params.sensorId)
        .then((result) => {
            res.status(204).send({});
        }).catch((error) => {
            res.status(500).send(error);
        });
};

exports.dropBySensorId = (req, res) => {
    //auth by key or secret
    if (req.header('Auth-Key') != config.AdminAuthKey) {
        res.status(401).send();
        return;

    }

    SensorDataModel.dropBySensorId(req.params.sensorId)
        .then((result) => {
            res.status(204).send({});
        }).catch((error) => {
            res.status(500).send(error);
        });
};

exports.count = (req, res) => {
    SensorDataModel.count(req.params.sensorId)
        .then((result) => {
            console.log(result);
            res.status(201).send({ count: result });
        }).catch((error) => {
            res.sendStatus(500).send(error);
        });
}

exports.findById = (req, res) => {
    SensorDataModel.findById(req.params.id, req.params.sensorId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
};