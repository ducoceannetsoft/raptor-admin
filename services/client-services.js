const Client = require("../models/Client");
const get = async (searchText) => {
  if (!searchText) return await Client.find({});
  const res = await Client.find({
    $or: [
      { first_name: { $regex: searchText } },
      { last_name: { $regex: searchText } },
      { address: { $regex: searchText } },
      { phone: { $regex: searchText } },
    ],
  });
  return res;
};

const getById = async (args) => {
  const { id } = args;
  return Client.find({ id: id });
};

const deleteClient = (id) => {
  return Client.findByIdAndRemove(id);
};

module.exports = { get, getById, deleteClient };
