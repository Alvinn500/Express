"use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//       User.hasMany(models.comment, {
//         foreignKey: "userId",
//         as: "comments",
//       });
//     }
//   }
//   User.init(
//     {
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//       image: DataTypes.STRING,
//       role: DataTypes.STRING,
//       createdAt: DataTypes.DATE,
//       updatedAt: DataTypes.DATE,
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "users",
//     }
//   );
//   return User;
// };
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./CSequelize");

class User extends Model {
  static associate(models) {
    User.hasMany(models.comment, {
      foreignKey: "userId",
      as: "comment",
    });
  }
}

User.init(
  {
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
    image: {
      type: Sequelize.STRING,
      defaultValue: "https://randomuser.me/api/portraits/men/80.jpg",
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "user",
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: "true",
  }
);
// const user = sequelize.define("user", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   image: {
//     type: Sequelize.STRING,
//     defaultValue: "https://randomuser.me/api/portraits/men/80.jpg",
//     allowNull: false,
//   },
//   role: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     defaultValue: "user",
//   },
//   createdAt: {
//     allowNull: false,
//     type: Sequelize.DATE,
//   },
//   updatedAt: {
//     allowNull: false,
//     type: Sequelize.DATE,
//   },
// });

module.exports = User;
