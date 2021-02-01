//PAISES DEL MUNDO

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#countries");
        const countryList = data;

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES DE AFRICA

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#africa");
        const countryList = data.filter((country) => country.region === "Africa");

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES DE AMERICA

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#america");
        const countryList = data.filter((country) => country.region === "Americas");

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES DE ASIA

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#asia");
        const countryList = data.filter((country) => country.region === "Asia");

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES DE EUROPA

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#europa");
        const countryList = data.filter((country) => country.region === "Europe");

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES DE OCEANIA

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#oceania");
        const countryList = data.filter((country) => country.region === "Oceania");

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

// TOP 10 AREA PAISES

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ol = document.querySelector("#area");
        const countryList = data;

        countryList.sort(function(a, b) {
            return b.area - a.area;
        });

        const topCountryList = countryList.slice(0, 10);

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of topCountryList) {
            ol.appendChild(
                createLiElement(`${country.name} --> Area: ${country.area}`)
            );
        }
    })
    .catch((err) => {
        console.error(err);
    });

// TOP 10 POBLACION

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ol = document.querySelector("#poblacion");
        const countryList = data;

        countryList.sort(function(a, b) {
            return b.population - a.population;
        });

        const topCountryList = countryList.slice(0, 10);

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of topCountryList) {
            ol.appendChild(
                createLiElement(`${country.name} --> Población: ${country.population}`)
            );
        }
    })
    .catch((err) => {
        console.error(err);
    });

// PAISES CON IDIOMA ESPAÑOL

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#spanish");
        const countryList = data.filter(
            (country) => country.languages[0].name === "Spanish"
        );

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });

//PAISES CON IDIOMA INGLÉS

fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
        console.log(response);
        return response.json(); // transformamos la respuesta a formato JSON
    })
    .then((data) => {
        // Punto donde modificar el DOM

        const ul = document.querySelector("#english");
        const countryList = data.filter(
            (country) => country.languages[0].name === "English"
        );

        function createLiElement(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
        }

        for (let country of countryList) {
            ul.appendChild(createLiElement(`${country.name}`));
        }
    })
    .catch((err) => {
        console.error(err);
    });