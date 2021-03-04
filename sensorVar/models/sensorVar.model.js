const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const sensorVarSchema = new Schema({
    sensor_id: { type: String, required: [true, 'Why no sensor_id?'] },
    key: { type: String, required: [true, 'Why no key?'] },
    value: { type: String, required: [true, 'Why no value?'] },
});

sensorVarSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

sensorVarSchema.set('toJSON', {
    virtuals: true
});

exports.patchVar = (pSensorVar, sensorId) => {
    const SensorVar = mongoose.model('vars', sensorVarSchema);
    return new Promise((resolve, reject) => {
        SensorVar.findOneAndUpdate({
            key: pSensorVar.key,
            sensor_id: sensorId
        }, pSensorVar, {new: true, upsert: true, context: 'query', runValidators: true }).then(function (docs) {
            resolve(docs);
        }).catch(function (error) {
            reject(error);
        });
    });
};

exports.list = (perPage, page, sensorId) => {
    const SensorVar = mongoose.model('vars', sensorVarSchema);
    return new Promise((resolve, reject) => {
        SensorVar.find()
            .select("id key value")
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
    });
};

exports.removeBySensorId = (sensorId) => {
    return new Promise((resolve, reject) => {
        const SensorVar = mongoose.model('vars', sensorVarSchema);
        SensorVar.collection.deleteMany({
            sensor_id: sensorId
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


exports.removeBySensorKey = (key, sensorId) => {
    console.log(key);
    return new Promise((resolve, reject) => {
        const SensorVar = mongoose.model('vars', sensorVarSchema);
        SensorVar.collection.deleteMany({
            key: key,
            sensor_id: sensorId
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.findByKey = (key, sensorId) => {
    const SensorVar = mongoose.model('vars', sensorVarSchema);
    return new Promise((resolve, reject) => {
        SensorVar.findOne({ 'key': key, "sensor_id": sensorId })
            .select("id key value")
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