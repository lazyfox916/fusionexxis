import { DataTypes, Model } from "sequelize";
<<<<<<< HEAD
=======
import { postgres } from "../config/db/connectPostgres";
>>>>>>> master

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
<<<<<<< HEAD
    sequelize: require("../config/database"),
    timestamps: true,
  },
);
=======
    sequelize: postgres,
    timestamps: true,
    modelName: "Users",
    tableName: "users",
  },
);

export default Users;
>>>>>>> master
