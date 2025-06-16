const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get("title");

if (movieTitle) {
    fetchMovieFromOMDB(movieTitle);
}

function fetchMovieFromOMDB(title) {
    const apiKey = "2b1f33f5"; // Tu API key
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const section = document.querySelector(".Info_movie");
            section.textContent = ""; // Limpia el contenido anterior

            if (data.Response === "True") {
                const h3 = document.createElement("h3");
                h3.classList.add("movie_title")
                h3.textContent = `${data.Title} (${data.Year})`;

                const img = document.createElement("img");
                img.src = data.Poster;
                img.alt = `Poster de ${data.Title}`;
                img.style.maxWidth = "200px";

                const director = document.createElement("p");
                director.textContent = `Director: ${data.Director}`;

                const actors = document.createElement("p");
                actors.textContent = `Reparto: ${data.Actors}`;

                const plot = document.createElement("p");
                plot.textContent = `Sinopsis: ${data.Plot}`;

                const rating = document.createElement("p");
                rating.textContent = `IMDB Rating: ${data.imdbRating}`;

                section.appendChild(h3);
                section.appendChild(img);
                section.appendChild(director);
                section.appendChild(actors);
                section.appendChild(plot);
                section.appendChild(rating);
            } else {
                const notFound = document.createElement("p");
                notFound.textContent = "Película no encontrada en OMDb";
                section.appendChild(notFound);
            }
        })
        .catch(error => {
            console.error("Error al consultar OMDb:", error);
        });
}