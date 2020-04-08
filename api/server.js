const express = require("express");
const mock = require("./mock");

const port = 3001;

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const reply = (res, body, timeout = 1000, status = 200) =>
    setTimeout(() => {
        res.status(status).json(body);
    }, timeout);

app.get("/categories", (req, res) => reply(res, mock.categories));
app.get("/products", (req, res) => reply(res, mock.products));

app.listen(port, "localhost", err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Listening at http://localhost:" + port);
});