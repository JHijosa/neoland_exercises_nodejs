const http = require("http");
const fs = require("fs");
const log = require("./log");

const server = http.createServer((request, response) => {
    const PATH_HOME = "./public/html/index.html";

    let contentType;
    let path;

    const extension = request.url.split(".")[1];

    if (extension) {
        switch (extension) {
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
            default:
                path = PATH_HOME;
                contentType = "text/html";
        }
    } else {
        contentType = "text/html";
        path = `./public/html${request.url}.html`;
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

    log.writeLog(request);
});

server.listen(1113);
console.log("Server 1113 Init");