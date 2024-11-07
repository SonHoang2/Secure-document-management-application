import app from "./app.js";
import config from "./config.js";

const port = config.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
