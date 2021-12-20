const Client = require("./models/Client");
const Site = require("./models/Site");

module.exports = (intergratorService, clientService, siteService) => {
  const { get: getIntegrators } = intergratorService;
  const { get: getClients, getById, deleteClient } = clientService;
  const { get: getSites, getByClient, update: updateSite } = siteService;
  return {
    Query: {
      integrators: (___, args, _, __) => {
        const { first_name } = args;
        return getIntegrators().filter(
          (item) => item.first_name.indexOf(first_name) !== -1
        );
      },
      clients: async (___, args, _, __) => {
        const { searchText } = args;
        return await getClients(searchText);
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
      integrator: (client) => {
        return getIntegators().find((i) => i.id === client.integrator_id);
      },
      sites: async (client) => {
        return await getByClient(client.id);
      },
    },
    Site: {
      client: (site) => getSites().find((i) => i.id === site.client_id),
    },
    Mutation: {
      login: async (_, args) => {
        const { email, password } = args;
        if (email === "admin@raptorvision.com" && password === "123456") {
          return {
            success: true,
            message: JSON.stringify(args),
          };
        }
        return {
          success: false,
        };
      },
      upsertIntegrator: async (_, args) => {
        console.log("integrator", args);
        return {
          success: true,
          message: JSON.stringify(args),
        };
      },
      createClient: async (parent, args) => {
        const { clientInput } = args;
        let client = new Client(clientInput);
        return await client.save();
      },
      deleteClient: async (parent, args) => {
        const { id } = args;
        return await deleteClient(id);
      },
      updateClient: async (parent, args) => {
        const { id, clientInput } = args;
        console.log(args);
        return await Client.findByIdAndUpdate(id, clientInput, { new: true });
      },
      createSite: async (parent, args) => {
        const { siteInput } = args;
        let site = new Site(siteInput);
        console.log("site input", siteInput);
        return await site.save();
      },
      deleteSite: async (parent, args) => {
        const { id } = args;
        return await deleteSite(id);
      },
      updateSite: async (parent, args) => {
        const { id, siteInput } = args;
        console.log("updateSite args", args);
        return await Site.findByIdAndUpdate(id, siteInput, { new: true });
      },
    },
  };
};
