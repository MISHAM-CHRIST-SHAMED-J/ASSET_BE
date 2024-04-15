import { Op } from "sequelize";
import Asset from "../model/assetModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";
import AssetAssignment from "../model/assetAssignModel.js";

const addAsset = async (req, res) => {
  try {
    let payload = req.body;
    const newUser = await Asset.create(payload);
    if (newUser.dataValues.status == true) {
      res.status(STATUS_CODE.success).json({
        message: "Asset added successfully",
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

const getAsset = async (req, res) => {
  try {
    let { page, limit, status } = req.query;
    const { count, rows } = await Asset.findAndCountAll({
      where: { status: status, isScrap: false },
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Asset Fetched Successfully",
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

const getAssetDropDown = async (req, res) => {
  try {
    const rows = await Asset.findAll({
      where: { status: true, isScrap: false, already_issued: false },
      order: [["createdAt", "DESC"]],
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );

    if (Object.keys(assetDataArray).length === 0) {
      res.status(STATUS_CODE.badRequest).json({
        message: "Insufficient Asset",
        data: [],
        status: true,
      });
    } else {
      res.status(STATUS_CODE.success).json({
        message: "Asset Fetched Successfully",
        data: assetDataArray,
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

const getAssetDropScrap = async (req, res) => {
  try {
    const rows = await Asset.findAll({
      where: { status: true, isScrap: false },
      order: [["createdAt", "DESC"]],
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );

    if (Object.keys(assetDataArray).length === 0) {
      res.status(STATUS_CODE.badRequest).json({
        message: "Insufficient Asset",
        data: [],
        status: true,
      });
    } else {
      res.status(STATUS_CODE.success).json({
        message: "Asset Fetched Successfully",
        data: assetDataArray,
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

const getAssetDropHistory = async (req, res) => {
  try {
    const rows = await Asset.findAll({
      where: { status: true },
      order: [["createdAt", "DESC"]],
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );

    res.status(STATUS_CODE.success).json({
      message: "Asset Fetched Successfully",
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

const searchAsset = async (req, res) => {
  try {
    let { search } = req.query;
    const result = await Asset.findAll({
      where: {
        [Op.or]: [
          { unique_id: { [Op.like]: `%${search}%` } },
          { serial_no: { [Op.like]: `%${search}%` } },
          { make: { [Op.like]: `%${search}%` } },
          { model: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    const assetDataArray = result.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Asset Fetched Successfully",
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

const editAsset = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Asset.update(payload, {
      where: {
        id: id.id,
      },
    });
    res.status(STATUS_CODE.success).json({
      message: "Asset Updated Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const deleteAsset = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    const checkPoint = await AssetAssignment.findAll({
      where: { assetRef_id: id.id, isReturned: false },
    });
    if (checkPoint.length > 0) {
      res.status(STATUS_CODE.conflict).json({
        message: "This Asset Not Reclaimed Back!",
        status: true,
      });
    } else {
      await Asset.update(payload, {
        where: {
          id: id.id,
        },
      });
      res.status(STATUS_CODE.success).json({
        message: "Asset Deleted Successfully",
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

export {
  addAsset,
  getAsset,
  editAsset,
  deleteAsset,
  searchAsset,
  getAssetDropDown,
  getAssetDropScrap,
  getAssetDropHistory,
};
