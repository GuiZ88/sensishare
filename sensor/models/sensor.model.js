// require
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

// schema of sensor
const sensorSchema = new Schema({
    name: { type: String, required: [true, 'Why no name?'] },
    description: String,
    email: String,
    position: String,
    secretKey: { type: String, required: [true, 'Why no secretKey?'] }
});

sensorSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

/*
sensorSchema.virtual('domain').get(function () {
    return this.email.slice(this.email.indexOf('@') + 1);
});*/

// Ensure virtual fields are serialised.
sensorSchema.set('toJSON', {
    virtuals: true
});

sensorSchema.findById = function (cb, isAdmin) {
    return this.model('Sensors').find({ id: this.id }, cb).select((isAdmin ? "" : "-secretKey"));
};

const Sensor = mongoose.model('Sensors', sensorSchema);

exports.createSensor = (sensorData) => {
    const sensor = new Sensor(sensorData);
    return sensor.save();
};

exports.findByName = (name) => {
    return Sensor.find({ name: name });
};

exports.findById = (id) => {
    return Sensor.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.list = (perPage, page, isAdmin) => {
    return new Promise((resolve, reject) => {
        Sensor.find()
            .select((isAdmin ? "" : "-secretKey"))
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


exports.patchSensor = (id, sensorData) => {
    const sensor = new Sensor(sensorData);
    return Sensor.findOneAndUpdate({
        _id: id
    }, sensorData, { new: true, runValidators: true });
};

exports.removeById = (sensorId) => {
    return new Promise((resolve, reject) => {
        Sensor.deleteMany({ _id: sensorId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

