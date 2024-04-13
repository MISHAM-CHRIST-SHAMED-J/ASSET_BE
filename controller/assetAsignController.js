import AssetAssignment from "../model/assetAssignModel.js";
import sequelize from "../utility/database.js";
import { STATUS_CODE } from "../utility/statuscode.js";

const addAssetIssue = async (req, res) => {
  try {
    let payload = req.body;
    const newUser = await AssetAssignment.create(payload);
    if (newUser.dataValues.status == true) {
      res.status(STATUS_CODE.success).json({
        message: "Asset Issued Successfully",
        status: true,
      });
    } else {
      res.status(STATUS_CODE.badRequest).json({
        message: "Something went wrong..!",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const getAssetIssue = async (req, res) => {
  try {
    let { page, limit } = req.query;
    const { count, rows } = await AssetAssignment.findAndCountAll({
      where: { status: true },
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Issued Items Fetched Successfully",
      data: assetDataArray,
      count: count,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const test = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    // await AssetCategory.update(payload, {
    //   where: {
    //     id: id.id,
    //   },
    // });
    // let a = await AssetAssignment.query("select * from asset_assignments", {
    //   type: AssetAssignment.QueryTypes.SELECT,
    // });
    const r = await sequelize.query(
      'SELECT * FROM "asset_masters"',
      {
        // replacements: { age: 18 }, // Replace :age with the value 18
        type: sequelize.QueryTypes.SELECT, // Specify the query type as SELECT
      }
    );
    console.log(r );
    res.status(STATUS_CODE.success).json({
      message: "Asset Category Deleted Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

// const deleteAssetCategory = async (req, res) => {
//   try {
//     let id = req.query;
//     let payload = req.body;
//     await AssetCategory.update(payload, {
//       where: {
//         id: id.id,
//       },
//     });
//     res.status(STATUS_CODE.success).json({
//       message: "Asset Category Deleted Successfully",
//       status: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(STATUS_CODE.internalServerError)
//       .json({ message: "Something went wrong, please try again!" });
//   }
// };

// const getAssetCategory = async (req, res) => {
//   try {
//     let { page, limit, status } = req.query;
//     const { count, rows } = await AssetCategory.findAndCountAll({
//       where: { status: status },
//       order: [["createdAt", "DESC"]],
//       limit: Number(limit),
//       offset: (Number(page) - 1) * Number(limit),
//     });
//     const assetDataArray = rows.map(
//       (assetInstance) => assetInstance.dataValues
//     );
//     res.status(STATUS_CODE.success).json({
//       message: "Asset Category Fetched Successfully",
//       data: assetDataArray,
//       count: count,
//       status: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(STATUS_CODE.internalServerError)
//       .json({ message: "Something went wrong, please try again!" });
//   }
// };
// const getAssetCategoryDrop = async (req, res) => {
//   try {
//     const result = await AssetCategory.findAll({
//       where: { status: true },
//       order: [["createdAt", "DESC"]],
//     });
//     const assetDataArray = result.map(
//       (assetInstance) => assetInstance.dataValues
//     );
//     res.status(STATUS_CODE.success).json({
//       message: "Asset Category Fetched Successfully",
//       data: assetDataArray,
//       status: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(STATUS_CODE.internalServerError)
//       .json({ message: "Something went wrong, please try again!" });
//   }
// };

export {
  addAssetIssue,
  test,
  getAssetIssue
  //   editAssetCategory,
  //   deleteAssetCategory,
  //   getAssetCategory,
  //   getAssetCategoryDrop,
};
