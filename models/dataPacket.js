const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataModel = new Schema(
  {
    collarId: { type: String },
    collarResp: { type: String },
    dogName: { type: String },
    barking: { type: String },
    activity: { type: String },
    location: { type: String },
  }
);

module.exports = mongoose.model('dataPacket', dataModel);
