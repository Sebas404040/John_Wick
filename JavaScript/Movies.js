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

            // Crear un contenedor principal con la clase #main_movies
            const mainMovies = document.createElement("div");
            mainMovies.id = "main_movies";

            // Crear contenido dinámico
            movies.forEach(movie => {
                const section = document.createElement("section");
                section.classList.add("poster_section");

                const img = document.createElement("img");
                img.src = movie.poster;
                img.alt = "Poster";
                img.classList.add("poster_JW");

                section.appendChild(img);
                mainMovies.appendChild(section); // Agregar cada sección al contenedor principal
            });

            this.appendChild(mainMovies); // Agregar el contenedor principal al componente
        } catch (error) {
            console.error("Error en la obtención de datos:", error);
        }
    }
}

customElements.define("movie-johnwick", movie_johnWick);