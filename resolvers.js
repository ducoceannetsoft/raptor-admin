const Client = require("./models/Client");

module.exports = (intergratorService, clientService, siteService) => {
  const { get: getIntegrators } = intergratorService;
  const { get: getClients } = clientService;
  const { get: getSites } = siteService;
  return {
    Query: {
      integrators: (___, args, _, __) => {
        const { first_name } = args;
        return getIntegrators().filter(
          (item) => item.first_name.indexOf(first_name) !== -1
        );
      },
      clients: () => {
        return getClients();
      },
      sites: () => {
        return getSites();
      },
      client: (parent, args) => {
        const { id } = args;
        return Client.findById(id);
      },
      clientSearch: async (parent, args) => {
        const { txtSearch } = args;
        const allClient = await Client.find({});
        console.log("@@allClient", allClient);
        return allClient.filter(
          (item) => 1 == 1
          // item.first_name.indexOf(txtSearch) !== -1 ||
          // item.last_name.indexOf(txtSearch) !== -1 ||
          // item.shipping_address.indexOf(txtSearch) !== -1
        );
      },
    },
    Integrator: {
      clients: (integrator) =>
        getClients().filter((c) => c.integrator_id === integrator.id),
    },
    Client: {
      integrator: (client) =>
        getIntegators().find((i) => i.id === client.integrator_id),
    },
    Site: {
      client: (site) => getSites().find((i) => i.id === site.client_id),
    },
    Mutation: {
      upsertIntegrator: async (_, args) => {
        console.log("integrator", args);
        return {
          success: true,
          message: JSON.stringify(args),
        };
      },
      createClient: (parent, args) => {
        const { clientInput } = args;
        let client = new Client(clientInput);
        return client.save();
      },
      deleteClient: (parent, args) => {
        const { id } = args;
        return Client.findByIdAndRemove(id);
      },
      updateClient: (parent, args) => {
        const { id, clientInput } = args;
        return Client.findByIdAndUpdate(id, clientInput, { new: true });
      },
    },
  };
};
