const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  company_name: {
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
  shipping_address: {
    type: String,
  },
  website_url: {
    type: String,
  },
  company_size: {
    type: Number,
  },
  integrator_id: {
    type: String,
  },
  integrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Integrator",
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  status: {
    type: String,
  },
});
module.exports = Client = mongoose.model("client", schema);
