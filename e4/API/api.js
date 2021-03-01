const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const formidable = require("formidable");

const dbFake = "db/dbFake.json";

const api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// CORS

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

// GET TODAS LAS PELICULAS
api.get("/api/films", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);
        response.status(200).send({
            success: true,
            message: "/api/films",
            method: "GET",
            films: allFilms,
        });
    });
});

// GET ONE BODY
api.get("/api/onefilm", (request, response) => {
    if (!request.body.id) {
        response.status(400).send({
            success: false,
            url: "/api/onefilm",
            method: "GET",
            message: "id is requied",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err; //Elevar o notificar una excepcion
            const allFilms = JSON.parse(data); // Parseamos el contenido del fichero a formato JSON
            const oneFilm = {
                id: Number.parseInt(request.body.id),
            };

            const findFilm = allFilms.filter((film) => film.id === oneFilm.id);

            response.status(200).send({
                success: true,
                message: "/api/onefilm",
                method: "GET",
                findFilm: findFilm,
            });
        });
    }
});

//GET UNA PELICULA

api.get("/api/film/:id", (request, response) => {
    if (!request.params) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "GET",
            message: "id is requied",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err;
            const allFilms = JSON.parse(data);
            const oneFilm = {
                id: Number.parseInt(request.params.id),
            };

            const findFilm = allFilms.find((film) => film.id === oneFilm.id);

            response.status(200).send({
                success: true,
                message: "/api/film",
                method: "GET",
                film: findFilm,
            });
        });
    }
});

// GET PELICULA BY TITLE

api.get("/api/film/:title", (request, response) => {
    if (!request.params) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "GET",
            message: "id is requied",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err;
            const allFilms = JSON.parse(data);
            const oneFilm = {
                id: request.params.title,
            };

            const findFilm = allFilms.find((film) => film.title === oneFilm.title);

            response.status(200).send({
                success: true,
                message: "/api/film",
                method: "GET",
                film: findFilm,
            });
        });
    }
});

// GET POR GENERO

api.get("/api/films/genre", (request, response) => {
    if (!request.query.genre) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "GET",
            message: "genre is requied",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err;
            const allFilms = JSON.parse(data);
            const genreFilm = {
                genre: request.query.genre,
            };

            const findFilmsByGenre = allFilms.filter(
                (film) => film.genre === genreFilm.genre
            );

            response.status(200).send({
                success: true,
                message: "/api/film",
                method: "GET",
                films: findFilmsByGenre,
            });
        });
    }
});

// POST

api.post("/api/film", (request, response) => {
    if (!request.body.title ||
        !request.body.director ||
        !request.body.genre ||
        !request.body.year
    ) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "POST",
            message: "title, director, genre, year and actors are required",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err;
            const allFilms = JSON.parse(data);
            let newFilm = {
                id: allFilms.length + 1,
                title: request.body.title,
                director: request.body.director,
                genre: request.body.genre,
                year: request.body.year,
                actors: [{
                        id: 1,
                        name: request.body.actor1,
                    },
                    {
                        id: 2,
                        name: request.body.actor2,
                    },
                ],
            };
            allFilms.push(newFilm);

            fs.writeFile(dbFake, JSON.stringify(allFilms), (err) => {
                if (err) {
                    response.status(400).send({
                        success: false,
                        url: "/api/film",
                        method: "POST",
                        message: "Fallo al añadir la pelicula",
                        err: err,
                    });
                } else {
                    response.status(201).send({
                        success: true,
                        url: "/api/film",
                        method: "POST",
                        message: "Pelicula añadida correctamente",
                        newFilm: newFilm,
                    });
                }
            });
        });
    }
});

// POST IMAGENES

app.post("/uploadFile", (request, response) => {
    const form = new formidable.IncomingForm(); // Inicializamos formidable

    // form.maxFileSize = 1024; // aumentar tamaño maximo permitido

    form.parse(request); // parseamos la request para que formidable lo entienda

    // evento que se ejecuta cuando comienza la subida
    form.on("fileBegin", (name, file) => {
        file.path = __dirname + "/public/images/" + file.name;
    });

    // evento que se ejecuta cuando termina la subida
    form.on("file", (name, file) => {
        console.log("Uploaded " + file.name);
    });

    // evento que se ejecuta al final del todo
    form.on("end", () => {
        response.redirect("/galeria");
    });
});

//DELETE

api.delete("/api/film", (request, response) => {
    if (!request.body.id) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "DELETE",
            message: "id is requied",
        });
    } else {
        fs.readFile(dbFake, (err, data) => {
            if (err) throw err;
            const allFilms = JSON.parse(data);
            const deleteFilm = {
                id: Number.parseInt(request.body.id),
            };
            const newAllFilms = allFilms.filter((film) => film.id !== deleteFilm.id);

            fs.writeFile(dbFake, JSON.stringify(newAllFilms), (err) => {
                if (err) {
                    response.status(400).send({
                        success: false,
                        url: "/api/film",
                        method: "DELETE",
                        message: "Fallo al eliminar la pelicula",
                        err: err,
                    });
                } else {
                    response.status(201).send({
                        success: true,
                        url: "/api/pokemons",
                        method: "DELETE",
                        message: "Pelicula eliminada correctamente",
                        deleteFilm: deleteFilm,
                    });
                }
            });
        });
    }
});

// PUT

api.put("/api/film/:id", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err;
        const allFilmsUpDate = JSON.parse(data);
        allFilmsUpDate.forEach((film) => {
            if (film.id === Number.parseInt(request.params.id)) {
                // if (request.body.type) {
                //     pokemon.type = request.body.type;
                // }
                film.title = request.body.title ? request.body.title : film.title;
                film.director = request.body.director ?
                    request.body.director :
                    film.director;
                film.genre = request.body.genre ? request.body.genre : film.genre;
                film.year = request.body.year ? request.body.year : film.year;
            }
        });

        fs.writeFile(dbFake, JSON.stringify(allFilmsUpDate), (err) => {
            if (err) {
                response.status(400).send({
                    success: false,
                    url: "/api/film",
                    method: "PUT",
                    message: "Fallo al modificar la pelicula",
                    err: err,
                });
            } else {
                response.status(201).send({
                    success: true,
                    url: "/api/film",
                    method: "PUT",
                    message: "Pelicula modificada correctamente",
                    allFilmsUpDate: allFilmsUpDate,
                });
            }
        });
    });
});

// GET ACTORES DE UNA PELICULA

api.get("/api/films/:id/actors", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);

        const oneFilm = {
            id: Number.parseInt(request.params.id),
        };

        const findFilm = allFilms.find((film) => film.id === oneFilm.id);

        if (!findFilm) {
            response.status(400).send({
                success: false,
                method: "GET",
                message: "Film not found",
            });
        } else {
            const filmActors = findFilm.actors;

            response.status(200).send({
                success: true,
                message: "/api/pokemons",
                method: "GET",
                actors: filmActors,
            });
        }
    });
});

// GET UN ACTOR DE UNA PELICULA

api.get("/api/films/:id/actors/:actorsId", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);

        const oneFilm = {
            id: Number.parseInt(request.params.id),
        };

        const findFilm = allFilms.find((film) => film.id === oneFilm.id);

        if (!findFilm) {
            response.status(400).send({
                success: false,
                method: "GET",
                message: "Film not found",
            });
        } else {
            const filmActors = findFilm.actors;

            const oneActor = {
                id: Number.parseInt(request.params.actorsId),
            };

            const findActor = filmActors.find((actor) => actor.id === oneActor.id);

            if (!findActor) {
                response.status(400).send({
                    success: false,
                    method: "GET",
                    message: "Location not found",
                });
            } else {
                response.status(200).send({
                    success: true,
                    message: "/api/pokemons",
                    method: "GET",
                    actor: findActor,
                });
            }
        }
    });
});

// PAGINADO CON LIMIT Y OFFSET

api.get("/api/films/pageoffset", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);
        const limit = Number.parseInt(request.query.limit);
        const offset = Number.parseInt(request.query.offset);

        const pageFilms = allFilms.slice(offset, offset + limit);

        response.status(200).send({
            success: true,
            message: "/api/films",
            method: "GET",
            pagePokemon: pageFilms,
        });
    });
});

// PAGINADO POR PARAMS

api.get("/api/films/page/:page", (request, response) => {
    fs.readFile(dbFake, (err, data) => {
        if (err) throw err; //Elevar o notificar una excepcion
        const allFilms = JSON.parse(data); // Parseamos el contenido del fichero a formato JSON
        const PAGE_SIZE = 3;
        const page = request.params.page;
        const initPage = Math.abs(page) * PAGE_SIZE - PAGE_SIZE;
        const endPage = Math.abs(page) * PAGE_SIZE;

        const pageFilms = allFilms.slice(initPage, endPage);

        const totalPages = Math.ceil(allFilms.length / PAGE_SIZE);

        response.status(200).send({
            success: true,
            message: "/api/films",
            method: "GET",
            totalPages: totalPages,
            page: page,
            pageFilms: pageFilms,
        });
    });
});

api.listen(1004, () => {
    console.log("API corriendo en puerto 1004");
});