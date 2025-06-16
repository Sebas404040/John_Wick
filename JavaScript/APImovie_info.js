const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get("title");

if (movieTitle) {
    fetchMovieFromOMDB(movieTitle);
}

function fetchMovieFromOMDB(title) {
    const apiKey = "2b1f33f5";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const section = document.querySelector(".performance_movie"); // Corregido el selector
            const descripcion_section = document.getElementById("description_movie");
            section.textContent = "";
            descripcion_section.textContent = "";

            function createInfoParagraph(label, value) {
                        const p = document.createElement('p');
                        const strong = document.createElement('strong');
                        strong.textContent = `${label}: `;
                        p.appendChild(strong);
                        p.append(value);
                        return p;
            }

            if (data.Response === "True") {
                const h3 = document.createElement("h3");
                h3.classList.add("movie_title")
                h3.textContent = `${data.Title} (${data.Year})`;

                const img = document.createElement("img");
                img.src = data.Poster;
                img.alt = `Poster de ${data.Title}`;


                const director = document.createElement("p");
                director.textContent = `Director: ${data.Director}`;

                const actors = document.createElement("p");
                actors.textContent = `Reparto: ${data.Actors}`;

                const plot = document.createElement("p");
                plot.textContent = `Sinopsis: ${data.Plot}`;

                const awards = document.createElement("p");
                awards.textContent= `Premios: ${data.Awards}`;

                const rating = document.createElement("p");
                rating.textContent = `IMDB Rating: ${data.imdbRating}`;

                section.appendChild(h3);
                section.appendChild(img);
                descripcion_section.appendChild(createInfoParagraph("Director", data.Director));
                descripcion_section.appendChild(createInfoParagraph("Reparto", data.Actors));
                descripcion_section.appendChild(createInfoParagraph("Sinopsis", data.Plot));
                descripcion_section.appendChild(createInfoParagraph("Premios", data.Awards));
                descripcion_section.appendChild(createInfoParagraph("IMDB Rating", data.imdbRating));
            } else {
                const notFound1 = document.createElement("p");
                notFound1.textContent = "Película no encontrada en OMDb";
                section.appendChild(notFound1);

                const notFound2 = document.createElement("p");
                notFound2.textContent = "Película no encontrada en OMDb";
                descripcion_section.appendChild(notFound2);
            }
        })
        .catch(error => {
            console.error("Error al consultar OMDb:", error);
        });
}