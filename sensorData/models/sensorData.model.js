const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const sensorDataSchema = new Schema({
    date: { type: Date, default: Date.now }
}, { strict: false });

sensorDataSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

sensorDataSchema.set('toJSON', {
    virtuals: true
});

exports.createSensorData = (pSensorData, sensorId) => {
    const SensorData = mongoose.model(sensorId, sensorDataSchema);
    console.log(pSensorData);
    const data = new SensorData(pSensorData);
    return data.save();
};

exports.list = (perPage, page, sensorId) => {
    const SensorData = mongoose.model(sensorId, sensorDataSchema);
    return new Promise((resolve, reject) => {
        SensorData.find()
            .sort({date: -1})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    }).catch((error) => {
        assert.isNotOk(error, 'Promise error');
        done();
    });;
};

exports.removeBySensorId = (sensorId) => {
    return new Promise((resolve, reject) => {
        const SensorData = mongoose.model(sensorId, sensorDataSchema);
        SensorData.collection.deleteMany({}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.dropBySensorId = (sensorId) => {
    return new Promise((resolve, reject) => {
        const SensorData = mongoose.model(sensorId, sensorDataSchema);
        SensorData.collection.deledropteMany({}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.count = (sensorId) => {
    const SensorData = mongoose.model(sensorId, sensorDataSchema);
    return new Promise((resolve, reject) => {
        SensorData.countDocuments({}, function (err, count) {
            if (err) {
                reject(err);
            } else {
                resolve(count);
            }
        });
    });
};

exports.insertMany = (pSensorData, sensorId) => {
    const SensorData = mongoose.model(sensorId, sensorDataSchema);
    return new Promise((resolve, reject) => {
        SensorData.insertMany(pSensorData).then(function (docs) {
            resolve(docs);
        }).catch(function (error) {
            reject(error);
        });
    });
};

exports.findById = (id, sensorId) => {
    const SensorData = mongoose.model(sensorId, sensorDataSchema);
    return new Promise((resolve, reject) => {
        SensorData.findOne({ '_id': id})
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    }).catch((error) => {
        assert.isNotOk(error, 'Promise error');
        done();
    });
};