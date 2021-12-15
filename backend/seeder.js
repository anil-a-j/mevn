import dotenv from "dotenv";
import providers from "./data/providers.js";
import Provider from "./models/providerModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Provider.deleteMany();

    await Provider.insertMany(providers);

    console.log("Data Imported.");

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Provider.deleteMany();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
