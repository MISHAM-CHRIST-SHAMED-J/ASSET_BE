import { Op } from "sequelize";
import AssetAssignment from "../model/assetAssignModel.js";
import Asset from "../model/assetModel.js";
import sequelize from "../utility/database.js";
import { STATUS_CODE } from "../utility/statuscode.js";

const addAssetIssue = async (req, res) => {
  try {
    let payload = req.body;
    await Asset.update(
      { already_issued: true },
      {
        where: {
          id: payload.assetRef_id,
        },
      }
    );
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

const editAssetIssue = async (req, res) => {
  try {
    let { id } = req.query;
    let payload = req.body;
    let check = await AssetAssignment.findOne({
      where: {
        id: id,
      },
    });
    if (check.dataValues.assetRef_id !== payload.assetRef_id) {
      await AssetAssignment.update(payload, {
        where: {
          id: id,
        },
      });
      await Asset.update(
        { already_issued: true },
        {
          where: {
            id: payload.assetRef_id,
          },
        }
      );
      await Asset.update(
        { already_issued: false },
        {
          where: {
            id: check.dataValues.assetRef_id,
          },
        }
      );
    } else {
      await AssetAssignment.update(payload, {
        where: {
          id: id,
        },
      });
    }
    res.status(STATUS_CODE.success).json({
      message: "Issued Asset Updated Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const resturnIssuedAsset = async (req, res) => {
  try {
    let { id, assetRef_id } = req.query;
    let payload = req.body;
    await AssetAssignment.update(payload, {
      where: {
        id: id,
      },
    });
    await Asset.update(
      { already_issued: false },
      {
        where: {
          id: assetRef_id,
        },
      }
    );
    res.status(STATUS_CODE.success).json({
      message: "Asset Returned Successfully",
      status: true,
    });
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

const searchAssetIssue = async (req, res) => {
  try {
    let { search } = req.query;
    const result = await AssetAssignment.findAll({
      where: {
        [Op.or]: [
          { empRef_name: { [Op.like]: `%${search}%` } },
          { assetRef_name: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    const assetDataArray = result.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Issued Asset Fetched Successfully",
      data: assetDataArray,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

export {
  addAssetIssue,
  getAssetIssue,
  editAssetIssue,
  resturnIssuedAsset,
  searchAssetIssue,
};
