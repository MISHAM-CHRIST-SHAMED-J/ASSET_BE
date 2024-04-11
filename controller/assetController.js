import Asset from "../model/assetModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";

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
    let { page, limit } = req.query;
    const { count, rows } = await Asset.findAndCountAll({
      where: { status: true, isScrap: false },
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

const editAsset = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Asset.update(
      (payload,
      {
        where: {
          id: id.id,
        },
      })
    );
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
    await Asset.update(
      (payload,
      {
        where: {
          id: id.id,
        },
      })
    );
    res.status(STATUS_CODE.success).json({
      message: "Changes Made Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

export { addAsset, getAsset, editAsset, deleteAsset };
