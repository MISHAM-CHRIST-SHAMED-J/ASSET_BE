import { Op } from "sequelize";
import Asset from "../model/assetModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";
import AssetAssignment from "../model/assetAssignModel.js";

const addAssetScrap = async (req, res) => {
  //   try {
  //     let payload = req.body;
  //     const newUser = await Asset.create(payload);
  //     if (newUser.dataValues.status == true) {
  //       res.status(STATUS_CODE.success).json({
  //         message: "Asset added successfully",
  //         status: true,
  //       });
  //     } else {
  //       res.status(STATUS_CODE.badRequest).json({
  //         message: "Something went wrong..!",
  //         status: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res
  //       .status(STATUS_CODE.internalServerError)
  //       .json({ message: "Something went wrong, please try again!" });
  //   }
};

const getAssetScrap = async (req, res) => {
  try {
    let { page, limit } = req.query;
    const { count, rows } = await Asset.findAndCountAll({
      where: { status: true, isScrap: true },
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Scrap Asset Fetched Successfully",
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

const searchAssetScrap = async (req, res) => {
  //   try {
  //     let { search } = req.query;
  //     const result = await Asset.findAll({
  //       where: {
  //         [Op.or]: [
  //           { unique_id: { [Op.like]: `%${search}%` } },
  //           { serial_no: { [Op.like]: `%${search}%` } },
  //           { make: { [Op.like]: `%${search}%` } },
  //           { model: { [Op.like]: `%${search}%` } },
  //         ],
  //       },
  //     });
  //     const assetDataArray = result.map(
  //       (assetInstance) => assetInstance.dataValues
  //     );
  //     res.status(STATUS_CODE.success).json({
  //       message: "Asset Fetched Successfully",
  //       data: assetDataArray,
  //       status: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res
  //       .status(STATUS_CODE.internalServerError)
  //       .json({ message: "Something went wrong, please try again!" });
  //   }
};

const editAssetScrap = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    let resq = await Asset.findOne({ where: { id: id.id } });
    if (resq.dataValues.already_issued) {
      res.status(STATUS_CODE.badRequest).json({
        message: "Asset Already Issued To Someone",
        status: true,
      });
    } else {
      await Asset.update(payload, {
        where: {
          id: id.id,
        },
      });
      res.status(STATUS_CODE.success).json({
        message: "Asset Updated Successfully",
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

const deleteAssetScrap = async (req, res) => {
  //   try {
  //     let id = req.query;
  //     let payload = req.body;
  //     const checkPoint = await AssetAssignment.findAll({
  //       where: { assetRef_id: id.id, isReturned: false },
  //     });
  //     if (checkPoint.length > 0) {
  //       res.status(STATUS_CODE.conflict).json({
  //         message: "This Asset Not Reclaimed Back!",
  //         status: true,
  //       });
  //     } else {
  //       await Asset.update(payload, {
  //         where: {
  //           id: id.id,
  //         },
  //       });
  //       res.status(STATUS_CODE.success).json({
  //         message: "Asset Deleted Successfully",
  //         status: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res
  //       .status(STATUS_CODE.internalServerError)
  //       .json({ message: "Something went wrong, please try again!" });
  //   }
};

export {
  searchAssetScrap,
  deleteAssetScrap,
  editAssetScrap,
  addAssetScrap,
  getAssetScrap,
};
