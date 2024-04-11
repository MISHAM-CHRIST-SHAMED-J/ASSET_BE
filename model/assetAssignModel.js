import { DataTypes } from "sequelize";
import sequelize from "../utility/database.js";

const AssetAssignment = sequelize.define("asset_assignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assign_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default AssetAssignment;
