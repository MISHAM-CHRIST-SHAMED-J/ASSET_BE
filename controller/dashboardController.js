import Asset from "../model/assetModel.js";
import Employee from "../model/employeeModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";

const getDashboard = async (req, res) => {
  try {
    const empTotCount = await Employee.count({
      where: { status: true },
    });
    const assetTotCount = await Asset.count({
      where: { status: true },
    });

    res.status(STATUS_CODE.success).json({
      message: "Data Fetched Successfully",
      data: {
        empTotal: empTotCount,
        AssetTotal:assetTotCount
      },

      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

export { getDashboard };
