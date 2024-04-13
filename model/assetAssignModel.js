import { DataTypes } from "sequelize";
import sequelize from "../utility/database.js";

const AssetAssignment = sequelize.define("asset_assignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empRef_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  empRef_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assetRef_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assetRef_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_issue_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  asset_return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default AssetAssignment;
