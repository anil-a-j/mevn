import asyncHandler from "express-async-handler";
import Provider from "../models/providerModel.js";

// @desc Fetch all providers
// @route GET /api/providers
// @access public
const getProviders = asyncHandler(async (req, res) => {
  const providers = await Provider.find({});

  res.json(providers);
});

export { getProviders };
