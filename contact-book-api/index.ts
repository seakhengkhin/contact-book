import router from "./src/router";
import path from "path";

const express = require("express")
const app = express();
const HTTP_PORT = process.env.PORT;
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});
router(app);