const Site = require("../models/Site");
const get = async (searchText) => {
  if (!searchText) return await Site.find({});
  const res = await Site.find({
    $or: [{ first_name: { $regex: searchText, $options: "i" } }],
  });
  return res;
};

const getById = async (args) => {
  const { id } = args;
  return Site.find({ id: id });
};

const deleteSite = (id) => {
  return Site.findByIdAndRemove(id);
};

module.exports = { get, getById, deleteSite };
