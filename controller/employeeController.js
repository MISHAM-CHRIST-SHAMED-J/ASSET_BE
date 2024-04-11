import Employee from "../model/employeeModel.js";
import { STATUS_CODE } from "../utility/statuscode.js";

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
    let { page, limit } = req.query;
    const { count, rows } = await Employee.findAndCountAll({
      where: { status: true },
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

const editEmployee = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Employee.update(
      (payload,
      {
        where: {
          id: id.id,
        },
      })
    );
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

const deleteEmployee = async (req, res) => {
  try {
    let id = req.query;
    let payload = req.body;
    await Employee.update(
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

export { addEmployee, getEmployee, editEmployee, deleteEmployee };
