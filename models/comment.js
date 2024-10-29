"use strict";
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Comment.belongsTo(models.User, {
//         foreignKey: "userId",
//         as: "User",
//       });
//     }
//   }
//   Comment.init(
//     {
//       userId: DataTypes.INTEGER,
//       comment: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "comment",
//     }
//   );
//   return Comment;
// };

const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./CSequelize");

class Comment extends Model {
  static associate(models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Comment.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    comment: {
      type: Sequelize.STRING,
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
    modelName: "Comment",
    tableName: "comment",
    timestamps: "true",
  }
);
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: "users",
//       key: "id",
//     },
//     onDelete: "CASCADE",
//   },
//   comment: {
//     type: Sequelize.STRING,
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

module.exports = Comment;
