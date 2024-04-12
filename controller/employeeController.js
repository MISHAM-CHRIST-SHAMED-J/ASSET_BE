import Employee from "../model/employeeModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";
import { Op } from "sequelize";

const addEmployee = async (req, res) => {
  try {
    let payload = req.body;
    const newUser = await Employee.create(payload);
    if (newUser.dataValues.status == true) {
      res.status(STATUS_CODE.success).json({
        message: "Employee added successfully",
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

const getEmployee = async (req, res) => {
  try {
    let { page, limit, status } = req.query;
    const { count, rows } = await Employee.findAndCountAll({
      where: { status: status },
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    const assetDataArray = rows.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Employee Fetched Successfully",
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

const searchEmployee = async (req, res) => {
  try {
    let { search } = req.query;
    const result = await Employee.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { emp_id: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { email_id: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    const assetDataArray = result.map(
      (assetInstance) => assetInstance.dataValues
    );
    res.status(STATUS_CODE.success).json({
      message: "Employee Fetched Successfully",
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

const deleteEmployee = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Employee.update(payload, {
      where: {
        id: id.id,
      },
    });
    res.status(STATUS_CODE.success).json({
      message: `Employee ${
        payload.status ? "Activated" : "De-Activated"
      } Successfully`,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.internalServerError)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const editEmployee = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Employee.update(payload, {
      where: {
        id: id.id,
      },
    });
    res.status(STATUS_CODE.success).json({
      message: "Employee Updated Successfully",
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
  addEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
  searchEmployee,
};
