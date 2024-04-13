import express from "express";
import {
  addAsset,
  deleteAsset,
  editAsset,
  getAsset,
  getAssetDropDown,
  searchAsset,
} from "../controller/assetController.js";
import {
  addEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
  searchEmployee,
  getEmployeeDropDown,
} from "../controller/employeeController.js";
import { getDashboard } from "../controller/dashboardController.js";
import {
  editAssetCategory,
  deleteAssetCategory,
  getAssetCategory,
  getAssetCategoryDrop,
  addAssetCategory,
} from "../controller/assetCategoryController.js";
import { addAssetIssue, getAssetIssue, test } from "../controller/assetAsignController.js";

const router = express.Router();

/*Dashboard_Details*/
router.get("/get_dashboard", getDashboard);

/*Asset_Master*/
router.post("/add_asset", addAsset);
router.get("/get_asset", getAsset);
router.get("/search_asset", searchAsset);
router.patch("/edit_asset", editAsset);
router.patch("/delete_asset", deleteAsset);
router.get("/get_Asset_DropDown", getAssetDropDown);

/*Employee_Master*/
router.post("/add_employee", addEmployee);
router.get("/get_employee", getEmployee);
router.get("/search_employee", searchEmployee);
router.patch("/delete_employee", deleteEmployee);
router.patch("/edit_employee", editEmployee);
router.get("/get_Employee_DropDown", getEmployeeDropDown);

/*Asset_Category*/
router.post("/add_assetCategory", addAssetCategory);
router.patch("/edit_assetCategory", editAssetCategory);
router.patch("/delete_assetCategory", deleteAssetCategory);
router.get("/get_assetCategory", getAssetCategory);
router.get("/get_assetCategoryDrop", getAssetCategoryDrop);

/*Asset_Issue*/
router.post("/add_assetIssue", addAssetIssue);
router.get("/get_assetIssue", getAssetIssue);
router.get("/test", test);

/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/
/*Asset_Master*/

export default router;
