import express from "express";
import { addAsset, deleteAsset, editAsset, getAsset, searchAsset } from "../controller/assetController.js";
import {
  addEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
  searchEmployee,
} from "../controller/employeeController.js";
import { getDashboard } from "../controller/dashboardController.js";

const router = express.Router();

/*Dashboard_Details*/
router.get("/get_dashboard", getDashboard);
/*Asset_Master*/
router.post("/add_asset", addAsset);
router.get("/get_asset", getAsset);
router.get("/search_asset", searchAsset);
router.patch("/edit_asset", editAsset);
router.patch("/delete_asset", deleteAsset);

/*Employee_Master*/
router.post("/add_employee", addEmployee);
router.get("/get_employee", getEmployee);
router.get("/search_employee", searchEmployee);
router.patch("/delete_employee", deleteEmployee);
router.patch("/edit_employee", editEmployee);
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/

export default router;
