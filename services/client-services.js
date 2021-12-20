const Client = require("../models/Client");
const get = async (txtSearch) => {
  const res = Client.find({
    first_name: { $regex: txtSearch },
    last_name: { $regex: txtSearch },
    phone: { $regex: txtSearch },
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
