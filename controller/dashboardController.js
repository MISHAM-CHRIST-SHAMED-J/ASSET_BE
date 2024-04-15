import AssetAssignment from "../model/assetAssignModel.js";
import Asset from "../model/assetModel.js";
import Employee from "../model/employeeModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";

const getDashboard = async (req, res) => {
  try {
    const currencyConvert = (val) => {
      const formattedNumber = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(val);
      const formattedCurrencyValue = formattedNumber.replace(/₹/, "₹ ");
      return formattedCurrencyValue;
    };
    const empTotCount = await Employee.count({
      where: { status: true },
    });
    const assetTotCount = await Asset.count({
      where: { status: true, isScrap: false },
    });
    const assetTotCost = await Asset.sum("asset_price", {
      where: { status: true, isScrap: false },
    });
    const assetTotIssued = await Asset.count({
      where: { status: true, isScrap: false, already_issued: true },
    });
    const assetTotInventory = await Asset.count({
      where: { status: true, isScrap: false, already_issued: false },
    });
    const scrapCount = await Asset.count({
      where: { status: true, isScrap: true },
    });

    res.status(STATUS_CODE.success).json({
      message: "Data Fetched Successfully",
      data: [
        { name: "Total Asset", count: assetTotCount, color: "limegreen" },
        { name: "Total Issued Asset", count: assetTotIssued, color: "inherit" },
        {
          name: "Total Ready To Issue",
          count: assetTotInventory,
          color: "inherit",
        },
        {
          name: "Total Asset Cost",
          count: `${
            assetTotCost ? currencyConvert(assetTotCost) : currencyConvert(0)
          }`,
          color: "green",
        },
        { name: "Total Scrap", count: scrapCount, color: "red" },
        { name: "Total Employee", count: empTotCount, color: "inherit" },
      ],

      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const getAssetHistory = async (req, res) => {
  try {
    let id = req.query;
    let mainData = await Asset.findOne({
      where: {
        id: id.id,
      },
    });
    let dataHistory = await AssetAssignment.findAll({
      where: {
        assetRef_id: id.id,
      },
      order: [["asset_issue_date", "ASC"]],
    });
    res.status(STATUS_CODE.success).json({
      message: "Data Fetched Successfully",
      data: mainData,
      historyData: dataHistory,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

export { getDashboard, getAssetHistory };
