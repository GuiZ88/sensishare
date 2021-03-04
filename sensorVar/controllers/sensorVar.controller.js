const SensorVarModel = require('../models/sensorVar.model');
const SensorModel = require('../../sensor/models/sensor.model');
const config = require('../../common/config/env.config.js');

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;

    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    SensorVarModel.list(limit, page, req.params.sensorId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
};

exports.upinsert = (req, res) => {
    SensorModel.findById(req.params.sensorId)
        .then((sensor) => {
            if (req.header('Secret-Key') != sensor.secretKey) {
                res.status(401).send();
                return;
            }
            SensorVarModel.patchVar(req.body, req.params.sensorId)
                .then((result) => {
                    console.log(result);
                    res.status(201).send({ id: result._id, key: result.key, value: result.value });
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        }).catch((error) => {
            res.status(400).send(error);
        });
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

    SensorVarModel.removeBySensorId(req.params.sensorId)
        .then((result) => {
            res.status(204).send({});
        }).catch((error) => {
            res.status(500).send(error);
        });
};

exports.removeBySensorKey = (req, res) => {
    //auth by key or secret
    if (req.header('Auth-Key') != config.AdminAuthKey) {
        SensorModel.findById(req.params.sensorId)
            .then((sensor) => {
                if (req.header('Secret-Key') != sensor.secretKey) {
                    res.status(401).send();
                    return;
                }
            }).catch((error) => {
                res.status(500).send(error);
            });
    }

    SensorVarModel.removeBySensorKey(req.params.key, req.params.sensorId)
        .then((result) => {
            res.status(204).send({});
        }).catch((error) => {
            res.status(500).send(error);
        });
};


exports.findBySensorKey = (req, res) => {
    SensorVarModel.findByKey(req.params.key, req.params.sensorId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
};