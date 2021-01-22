const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    const PATH_HOME = "html/index.html";

    let contentType;
    let path;

    const extension = request.url.split(".")[1];

    switch (extension) {
        case "html":
            contentType = "text/html";
            path = `./public/html${request.url}`;
            break;
        case "css":
            contentType = "text/css";
            path = `./public/css${request.url}`;
            break;
        case "js":
            contentType = "text/javascript";
            path = `./public/js${request.url}`;
            break;
        case "png":
            contentType = "image/png";
            path = `./public/img${request.url}`;
            break;
            // case "ico":
            //     contentType = "text/javascript";
            //     path = `./public/js${request.url}`;
            //     break;

        default:
            path = "";
    }

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
            response.writeHead(200, { "Content-Type": contentType });
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