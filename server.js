import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js";
import sequelize from "./utility/database.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors({ origin: "*" }));

app.use("/api", router);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database", err);
  });

app.listen(PORT, () => {
  console.log(`Server Running Successfully... on Port : ${PORT}`);
});
