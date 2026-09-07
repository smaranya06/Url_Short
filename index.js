const express = require("express");

require("./connect");

const urlRoute = require("./routes/url");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", urlRoute);

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});