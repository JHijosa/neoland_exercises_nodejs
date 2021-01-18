const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    let path = `html${request.url}`;
    const PATH_HOME = "html/index.html";

    fs.readFile(path, (error, data) => {
        if (error) {
            fs.readFile(PATH_HOME, (error, data) => {
                if (error) {
                    response.writeHead(404);
                    response.write("Error: Pagina no encontrada");
                    response.end();
                } else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data);
                    response.end();
                }
            });
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.end();
        }
    });

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
});

server.listen(1111);
console.log("Server 1111 Init");