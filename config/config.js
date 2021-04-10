require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: "8889",
    dialect: "mysql",
    dialectOption: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
    // SEQUELIZE TIDAK MENGERTI UNDERSCORED PADA NAMA KOLOM TABLE
    // MAKANYA HARUS DI DEFINE
    define: {
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: "8889",
    dialectOption: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
    define: {
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: "8889",
    dialectOption: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
    define: {
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
};
