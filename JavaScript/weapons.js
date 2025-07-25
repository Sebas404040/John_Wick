const urlParams = new URLSearchParams(window.location.search);
const weaponId = urlParams.get("id");

function showWeapon(weaponId) {
    fetch("../JSON/weapons.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(weapons => {
            const weapon = weapons.find(weap => weap.id === weaponId);
            if (weapon) {
                
                const weaponImage = document.querySelector(".weaponInfo_section_image");
                if (weaponImage) {
                    weaponImage.src = weapon.imagen;
                    weaponImage.alt = weapon.nombre;
                }

                const statsDiv = document.querySelector(".stats");
                if (statsDiv && weapon.stats) {
                    statsDiv.textContent = "";

                    const h2 = document.createElement("h2");
                    h2.textContent = weapon.nombre;
                    statsDiv.appendChild(h2);

                    const statMap = [
                        { key: "ergonomia", label: "Ergonomía", color: "#00bfff" },
                        { key: "punteria", label: "Puntería", color: "#00bfff" },
                        { key: "cadencia_disparo", label: "Cadencia de Disparo", color: "#00bfff" },
                        { key: "retroceso", label: "Retroceso", color: "#ff4b4b" }
                    ];

                    statMap.forEach(stat => {
                        if (weapon.stats[stat.key] !== undefined) {
                            const value = weapon.stats[stat.key];

                            const statSection = document.createElement("div");
                            statSection.className = "stat";

                            const span = document.createElement("span");
                            span.textContent = stat.label;

                            const barContainer = document.createElement("div");
                            barContainer.className = "bar-container";

                            const bar = document.createElement("div");
                            bar.className = "bar";
                            bar.style.width = `${value}%`;
                            bar.style.backgroundColor = stat.color;

                            barContainer.appendChild(bar);
                            statSection.appendChild(span);
                            statSection.appendChild(barContainer);

                            statsDiv.appendChild(statSection);
                        }
                    });
                }

                const descSection = document.querySelector(".section_descriptionWeapon");
                if (descSection) {
                    descSection.textContent = "";
                    const h3 = document.createElement("h3");
                    h3.textContent = "Descripción:";
                    const p = document.createElement("p");
                    p.textContent = weapon.descripcion;
                    descSection.appendChild(h3);
                    descSection.appendChild(p);
                }

                const moviesSection = document.querySelector(".section_weaponInMovie");
                if (moviesSection) {
                    moviesSection.textContent = "";
                    const h3 = document.createElement("h3");
                    h3.textContent = "Películas en la que aparece:";
                    const p = document.createElement("p");
                    p.textContent = weapon.peliculas.join(", ");
                    moviesSection.appendChild(h3);
                    moviesSection.appendChild(p);
                }
            } else {
                console.error("Arma no encontrada");
            }
        })
        .catch(error => console.error("Error al cargar el arma", error));
}

if (weaponId) {
    showWeapon(weaponId);
}
class show_weapons_JW extends HTMLElement {
    constructor() {
        super();
        this.weapons = [];
    }

    connectedCallback() {
    this.fetchAndRenderWeapons();
    this.setupFilterListener();
    this.setupSearchListener();
}

    setupSearchListener() {
    const searchInput = document.querySelector('.input_SearchCharacter');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            let filtered = this.weapons;

            const movieFilter = document.getElementById("movieFilter");
            const movieName = movieFilter && movieFilter.value ? movieFilter.value : "";

            if (movieName) {
                filtered = filtered.filter(weapon =>
                    weapon.peliculas && weapon.peliculas.includes(movieName)
                );
            }

            if (searchTerm) {
                filtered = filtered.filter(weapon =>
                    weapon.nombre && weapon.nombre.toLowerCase().includes(searchTerm)
                );
            }

            this.renderWeapons(filtered);
        });
    }
}

    async fetchAndRenderWeapons() {
        try {
            const response = await fetch("../JSON/weapons.json");
            const weapons = await response.json();
            this.weapons = weapons;
            this.renderWeapons(weapons);
        } catch (error) {
            console.error("Error en la obtención de datos", error);
        }
    }

    renderWeapons(weaponsToShow) {
        const main = document.getElementById("weapons_total");
        main.querySelectorAll(".weapon_card").forEach(card => card.remove());

        weaponsToShow.forEach(weapon => {
            const link = document.createElement("a");
            link.href = `weapon_info.html?id=${weapon.id}`;

            const weapon_easy_info = document.createElement("section");
            weapon_easy_info.classList.add("weapon_card");

            const img = document.createElement("img");
            img.src = weapon.imagen;
            img.alt = "imagen_weapon";
            img.classList.add("weapon_image");

            link.appendChild(img);

            const info_container = document.createElement("div");

            const title_weapon = document.createElement("h3");
            title_weapon.textContent = weapon.nombre;

            const description_weapon = document.createElement("p");
            description_weapon.textContent = weapon.descripcion;

            info_container.appendChild(title_weapon);
            info_container.appendChild(description_weapon);
            weapon_easy_info.appendChild(link);
            weapon_easy_info.appendChild(info_container);

            main.appendChild(weapon_easy_info);
        });
    }

    setupFilterListener() {
        const movieFilter = document.getElementById("movieFilter");
        if (movieFilter) {
            movieFilter.addEventListener("change", () => {
                const movieName = movieFilter.value;
                if (!movieName) {
                    this.renderWeapons(this.weapons);
                } else {
                    const filtered = this.weapons.filter(weapon =>
                        weapon.peliculas && weapon.peliculas.includes(movieName)
                    );
                    this.renderWeapons(filtered);
                }
            });
        }
    }

    
}

customElements.define("weapon-easy-element", show_weapons_JW);

document.addEventListener("DOMContentLoaded", () => {
    const filtroImg = document.querySelector('.filtro');
    const movieFilter = document.getElementById('movieFilter');
    if (filtroImg && movieFilter) {
        filtroImg.addEventListener('click', () => {
            movieFilter.style.display = movieFilter.style.display === "none" ? "inline-block" : "none";
        });
        movieFilter.style.display = "none";
    }
});
