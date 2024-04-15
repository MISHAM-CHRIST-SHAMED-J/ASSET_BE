import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import AssetMgt from "./router/router.js";
import sequelize from "./utility/database.js";
dotenv.config();

const PORT = process.env.PORT || 4998;
const app = express();
app.use(json());
app.use(cors({ origin: "*" }));

app.use("/api", AssetMgt);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
    console.error("Error syncing database", err);
  });

app.listen(PORT, () => {
  console.log(`Server Running Successfully... on Port : ${PORT}`);
});
