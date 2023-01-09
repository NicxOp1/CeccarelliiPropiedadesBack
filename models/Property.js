const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  active: {type: Boolean, required: true},
  action: {type: String, required: true},
  value: {type: Number, required: true},
  typeProperty: {type: String, required: true},
  typeValue: {type: String, required: true},
  title: {type: String, required: true},
  mt2Total: {type: Number, required: true},
  mt2Build: {type: Number, required: true},
  rooms: {type: Number, required: true},
  bedrooms: {type: Number, required: true},
  antiquity: {type: Number, required: true},
  description: {type: String, required: true},
  adress: {type: String, required: true},
  location:{type : String, required: true},
  photoProperties: [{type: String}],
  photoBluePrints: [{type: String}],
});
const Property = mongoose.model("Properties", schema);

module.exports = Property;
