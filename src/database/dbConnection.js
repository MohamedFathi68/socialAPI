import { Sequelize } from "sequelize";

const connection = new Sequelize(
  "mysql://urbkm9hkhea6gwn4:JUbcZHOFvGdiVd1aPIJp@bchnbnvvkkpybbzzsccs-mysql.services.clever-cloud.com:3306/bchnbnvvkkpybbzzsccs",
  {
    dialect: "mysql",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

(async () => {
  try {
    await connection.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default connection;
