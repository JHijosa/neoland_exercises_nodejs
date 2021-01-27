const fs = require("fs");

const writeLog = (request) => {
    let infoLog = `\n${request.method}|${new Date().toISOString()}|${
    request.headers.host
  }:${request.url}`;
    fs.appendFile("server.log", infoLog, (error) => {
        if (error) {
            console.error(
                "algo ha ido mal y no se ha podido añadir información al log"
            );
        } else {
            console.log("log actualizado correctamente");
        }
    });
};

module.exports = {
    writeLog: writeLog,
};