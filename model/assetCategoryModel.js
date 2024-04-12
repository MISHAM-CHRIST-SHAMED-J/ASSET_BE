import { DataTypes } from "sequelize";
import sequelize from "../utility/database.js";

const AssetCategory = sequelize.define("asset_category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default AssetCategory;
