const Site = require("../models/Site");
const get = async (searchText) => {
  if (!searchText) return await Site.find({});
  const res = await Site.find({
    $or: [{ first_name: { $regex: searchText, $options: "i" } }],
  });
  return res;
};

const getById = async (id) => {
  return await Site.find({ id: id });
};

const getByClient = async (clientId) => {
  return await Site.find({ client_id: clientId });
};

const deleteSite = (id) => {
  return Site.findByIdAndRemove(id);
};

module.exports = { get, getById, deleteSite, getByClient };
