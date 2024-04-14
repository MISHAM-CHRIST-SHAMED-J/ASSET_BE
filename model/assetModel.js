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
  unique_id: {
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
  asset_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  scrap_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  asset_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason_for_scrap: {
    type: DataTypes.STRING,
     allowNull: true,
  },
  scrap_condition: {
    type: DataTypes.STRING,
     allowNull: true,
  },
  scrapped_by: {
    type: DataTypes.STRING,
     allowNull: true,
  },
  approved_by: {
    type: DataTypes.STRING,
     allowNull: true,
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
