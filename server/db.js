import Sequelize from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect
});

export default sequelize;