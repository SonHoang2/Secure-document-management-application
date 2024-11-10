import app from "./app.js";
import config from "./config/config.js";
import sequelize from "./db.js";

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const port = config.port || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
