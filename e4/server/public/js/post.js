const postFilm = () => {
    const newFilm = {
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        genre: document.getElementById("genre").value,
        year: document.getElementById("year").value,
        actor1: document.getElementById("actor1").value,
        actor2: document.getElementById("actor2").value,
    };

    const urlApi = "http://localhost:1004/api/film";

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newFilm),
    };

    fetch(urlApi, options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            (document.getElementById("title").value = ""),
            (document.getElementById("director").value = ""),
            (document.getElementById("genre").value = ""),
            (document.getElementById("year").value = ""),
            (document.getElementById("actor1").value = ""),
            (document.getElementById("actor2").value = "");
        })
        .catch((err) => {
            console.error(err);
        });
};