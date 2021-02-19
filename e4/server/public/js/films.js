const getFilmsPage = (page = 1) => {
    const urlApi = `http://localhost:1004/api/films/page/${page}`;
    fetch(urlApi)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const ulFilms = document.querySelector("#ulFilms");
            const filmsList = data.pageFilms;
            ulFilms.innerHTML = "";

            filmsList.forEach((film) => {
                renderCard(film);
            });

            const ulPaginado = document.getElementById("ulPagination");
            ulPaginado.innerHTML = "";

            for (i = 1; i <= data.totalPages; i++) {
                const li = document.createElement("li");
                li.className = "page-item";
                if (parseInt(page) === i) {
                    li.classList.add("active");
                }

                const a = document.createElement("a");
                a.id = i;
                a.innerText = i;
                a.className = "page-link";

                a.addEventListener("click", (event) => {
                    getFilmsPage(event.target.id);
                });

                li.appendChild(a);
                ulPaginado.appendChild(li);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

getFilmsPage();

const renderCard = (film) => {
    const ulFilms = document.querySelector("#ulFilms");

    const li = document.createElement("li");
    li.className = "list-group-item";
    const divCard = document.createElement("div");
    divCard.className = "card";
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = film.title;

    const ulInfoFilms = document.createElement("ul");
    ulInfoFilms.className = "list-group list-group-flush";

    const liDirector = document.createElement("li");
    liDirector.className = "list-group-item";
    liDirector.innerText = film.director;

    const liGenre = document.createElement("li");
    liGenre.className = "list-group-item";
    liGenre.innerText = film.genre;

    const liYear = document.createElement("li");
    liYear.className = "list-group-item";
    liYear.innerText = film.year;

    const liActors = document.createElement("li");
    liActors.className = "list-group-item";
    liActors.innerText = `${film.actors[0].name}, ${film.actors[1].name}`;

    ulInfoFilms.appendChild(liDirector);
    ulInfoFilms.appendChild(liGenre);
    ulInfoFilms.appendChild(liYear);
    ulInfoFilms.appendChild(liActors);

    divCardBody.appendChild(cardTitle);
    divCard.appendChild(divCardBody);
    divCard.appendChild(ulInfoFilms);
    li.appendChild(divCard);
    ulFilms.appendChild(li);
};

const renderOneCard = (film) => {
    const divContainer = document.getElementById("container");
    const ulFilms = document.createElement("ul");
    ulFilms.className = "list-group list-group-horizontal justify-content-center";

    const li = document.createElement("li");
    li.className = "list-group-item";
    const divCard = document.createElement("div");
    divCard.className = "card";
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = film.title;

    const ulInfoFilms = document.createElement("ul");
    ulInfoFilms.className = "list-group list-group-flush";

    const liDirector = document.createElement("li");
    liDirector.className = "list-group-item";
    liDirector.innerText = film.director;

    const liGenre = document.createElement("li");
    liGenre.className = "list-group-item";
    liGenre.innerText = film.genre;

    const liYear = document.createElement("li");
    liYear.className = "list-group-item";
    liYear.innerText = film.year;

    const liActors = document.createElement("li");
    liActors.className = "list-group-item";
    liActors.innerText = `${film.actors[0].name}, ${film.actors[1].name}`;

    ulInfoFilms.appendChild(liDirector);
    ulInfoFilms.appendChild(liGenre);
    ulInfoFilms.appendChild(liYear);
    ulInfoFilms.appendChild(liActors);

    divCardBody.appendChild(cardTitle);
    divCard.appendChild(divCardBody);
    divCard.appendChild(ulInfoFilms);
    li.appendChild(divCard);
    ulFilms.appendChild(li);
    divContainer.appendChild(ulFilms);
};

const filmFinder = () => {
    const idFilm = document.getElementById("idFilm").value;
    const urlApi = `http://localhost:1004/api/film/${idFilm}`;

    fetch(urlApi)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const divContainer = document.getElementById("container");

            divContainer.innerHTML = "";

            renderOneCard(data.film);
        })
        .catch((err) => {
            console.error(err);
        });
};