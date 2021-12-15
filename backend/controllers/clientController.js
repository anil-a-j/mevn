import asyncHandler from "express-async-handler";
import Client from "../models/clientModel.js";

// @desc Fetch all clients
// @route GET /api/clients
// @access public
const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});

  res.json(clients);
});

// @desc add new client
// @route POST /api/clients/add
// @access public
const addNewClient = asyncHandler(async (req, res) => {
  const { name, email, phone, providers } = req.body;

  const clientExists = await Client.findOne({ email });

  if (clientExists) {
    res.status(400);
    throw new Error("Client already exists");
  }

  const newClient = await Client.create({
    name,
    email,
    phone,
    providers,
  });

  if (newClient) {
    // const providersDetails = await Client.findById(newClient._id).populate({
    //   path: "providers",
    //   select: "_id name",
    // });
    res.status(201).json({
      _id: newClient._id,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      providers: newClient.providers,
    });
  } else {
    res.status(400);
    throw new Error("Invalid client data");
  }
});

// @desc Update client data
// @route PUT /api/clients/update
// @access Public
const updateClient = asyncHandler(async (req, res) => {
  const { id, name, email, phone, providers } = req.body;

  const client = await Client.findById(id);

  if (client) {
    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.providers = providers || client.providers;

    const updatedClient = await client.save();

    res.json({
      name: updatedClient.name,
      email: updatedClient.email,
      phone: updatedClient.phone,
      providers: updatedClient.providers,
    });
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

// @desc Delete user account
// @route DELETE /api/clients/delete/:id
// @access private
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    await client.remove();
    res.status(200).json({ message: "Client has been deleted!" });
  } else {
    res.status(404);
    throw new Error("Client not found!");
  }
});

export { getClients, addNewClient, deleteClient, updateClient };
