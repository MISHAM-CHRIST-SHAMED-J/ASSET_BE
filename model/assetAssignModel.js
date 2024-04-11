import sequelize from "../utility/database";

const AssetAssignment = sequelize.define("asset_assignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  assignedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  returnedAt: {
    type: DataTypes.DATE,
  },
});

Asset.belongsToMany(Employee, { through: AssetAssignment });
Employee.belongsToMany(Asset, { through: AssetAssignment });

module.exports = AssetAssignment;
