const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  country: {
    type: String,
  },
  status: {
    type: Number,
  },
  client_id: {
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});
module.exports = Site = mongoose.model("site", schema);
