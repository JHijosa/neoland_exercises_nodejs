const express = require("express");
const cursosList = require("./cursos");

const api = express();

// CONFIGURACION: CORS
api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    api.options("*", (req, res) => {
        // allowed XHR methods
        res.header(
            "Access-Control-Allow-Methods",
            "GET, PATCH, PUT, POST, DELETE, OPTIONS"
        );
        res.send();
    });
});

api.get("/api/cursos", (request, response) => {
    response.status(200).send({
        succes: true,
        message: "API Cursos",
        cursos: cursosList.cursos,
    });
});

api.listen(1133, () => {
    console.log("API corriendo en puerto 1133");
});