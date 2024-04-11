import { DataTypes } from "sequelize";
import sequelize from "../utility/database.js";

const Asset = sequelize.define("asset_master", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serial_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isScrap: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  already_issued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Asset;
