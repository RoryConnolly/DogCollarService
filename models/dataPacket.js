const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataModel = new Schema(
  {
    Collar: { type: String },
    DogName: { type: String },
    Barking: { type: String },
    Activity: { type: String },
    Location: { type: String },
  }
);

module.exports = mongoose.model('dataPacket', dataModel);
