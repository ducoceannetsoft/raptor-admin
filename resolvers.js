const Client = require("./models/Client");

module.exports = (intergratorService, clientService, siteService) => {
  const { get: getIntegrators } = intergratorService;
  const { get: getClients, getById, deleteClient } = clientService;
  const { get: getSites } = siteService;
  return {
    Query: {
      integrators: (___, args, _, __) => {
        const { first_name } = args;
        return getIntegrators().filter(
          (item) => item.first_name.indexOf(first_name) !== -1
        );
      },
      clients: (___, args, _, __) => {
        const { txtSearch } = args;
        return getClients(txtSearch);
      },
      sites: () => {
        return getSites();
      },
      client: (parent, args) => {
        const { id } = args;
        return Client.findById(id);
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
        return deleteClient(id);
      },
      updateClient: (parent, args) => {
        const { id, clientInput } = args;
        return Client.findByIdAndUpdate(id, clientInput, { new: true });
      },
    },
  };
};
