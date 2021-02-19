const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.static(__dirname + "/public/html", { extensions: [`html`] }));

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.listen(1014, () => {
    console.log(`Servidor corriendo en puerto ${1014}`);
});