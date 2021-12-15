import mongoose from "mongoose";

const providerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
