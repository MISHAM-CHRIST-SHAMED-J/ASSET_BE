import sequelize from "../utility/database";

const Employee = sequelize.define("employee", {
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

module.exports = Employee;
