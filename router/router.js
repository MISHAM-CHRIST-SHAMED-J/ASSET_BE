import express from "express";
import { addAsset, getAsset } from "../controller/assetController.js";
import {
  addEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
} from "../controller/employeeController.js";

const router = express.Router();

/*Asset_Master*/
router.post("/add_asset", addAsset);
router.get("/get_asset", getAsset);
/*Employee_Master*/
router.post("/add_employee", addEmployee);
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/

export default router;
