const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const { request, response } = require("express");
const { off } = require("process");

const dbFake = "db/dbFake.json";

const api = express();

api.use(bodyParser.urlencoded({ extended: true }));

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

//GET UNA PELICULA

api.get("/api/film", (request, response) => {
    if (!request.query.id) {
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
                id: Number.parseInt(request.query.id),
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
            message: "title, director, genre and year are required",
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

api.listen(1004, () => {
    console.log("API corriendo en puerto 1004");
});