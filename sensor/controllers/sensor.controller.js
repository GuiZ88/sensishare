const SensorModel = require('../models/sensor.model');
const config = require('../../common/config/env.config.js');

exports.insert = (req, res) => {
    SensorModel.createSensor(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.list = (req, res) => {
    var isAdmin = false;
    if (req.header('Auth-Key') == config.AdminAuthKey) {
        isAdmin = true;
    }

    let limit = req.query.limit && req.query.limit <= 10000 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    SensorModel.list(limit, page, isAdmin)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    SensorModel.findById(req.params.sensorId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
};


exports.patchById = (req, res) => {
    SensorModel.patchSensor(req.params.sensorId, req.body)
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });

};

exports.removeById = (req, res) => {
    SensorModel.removeById(req.params.sensorId)
        .then((result) => {
            res.status(204).send({});
        }).catch((error) => {
            res.status(500).send(error);
        });
};