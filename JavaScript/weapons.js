class show_weapons_JW extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.renderWeapons();
    }

    async renderWeapons() {
        try {
            const response = await fetch("../JSON/weapons.json")
            const weapons = await response.json();

            // Renderiza directamente en el main
            const main = document.getElementById("weapons_total");
            this.remove(); // Elimina el custom element del DOM

            weapons.forEach(weapon => {
                const weapon_easy_info = document.createElement("section");
                weapon_easy_info.classList.add("weapon_card");

                const img = document.createElement("img");
                img.src = weapon.imagen;
                img.alt = "imagen_weapon";
                img.classList.add("weapon_image");

                const info_container = document.createElement("div");

                const title_weapon = document.createElement("h3");
                title_weapon.textContent = weapon.nombre;

                const description_weapon = document.createElement("p");
                description_weapon.textContent = weapon.descripcion;

                info_container.appendChild(title_weapon);
                info_container.appendChild(description_weapon);
                weapon_easy_info.appendChild(img);
                weapon_easy_info.appendChild(info_container);

                main.appendChild(weapon_easy_info);
            });

        } catch (error) {
            console.error("Error en la obtencion de datos", error)
        }
    }
}
customElements.define("weapon-easy-element", show_weapons_JW);