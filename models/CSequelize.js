const { Sequelize } = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./tugas.sqlite",
});

// sequelize
//   .sync({ alter: true }) // alter: true hanya jika tabel sudah ada
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

module.exports = sequelize;
