class movie_johnWick extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.renderMovies();
    }

    async renderMovies() {
        try {
            const response = await fetch("../JSON/movies_posters.json"); 
            const data = await response.json();
            const movies = data.movies;

            const mainMovies = document.createElement("div");
            mainMovies.id = "main_movies";

            movies.forEach(movie => {
                const section = document.createElement("section");
                section.classList.add("poster_section");

                const link = document.createElement("a");
                link.href = "#";

                // Estudiar sobre encodeURIComponent
                link.href = `movie_info.html?title=${encodeURIComponent(movie.title)}`;

                const img = document.createElement("img");
                img.src = movie.poster;
                img.alt = "Poster";
                img.classList.add("poster_JW");

                link.appendChild(img)
                section.appendChild(link);
                mainMovies.appendChild(section);

            });            

            this.appendChild(mainMovies); 
        } catch (error) {
            console.error("Error en la obtención de datos:", error);
        }
    }
}

customElements.define("movie-johnwick", movie_johnWick);

