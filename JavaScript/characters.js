const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

function showCharacter(characterId) {
    fetch("../JSON/characters.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(characters => {
            const character = characters.find(char => char.id === characterId);
            if (character) {
                const characterImage = document.getElementById("character_image");
                if (characterImage) {
                    characterImage.src = character.imagen;
                    characterImage.alt = character.name;
                }

                const characterInfo = document.querySelector(".Info_character");
                if (characterInfo) {
                    characterInfo.textContent = ""; 

                    function createInfoParagraph(label, value) {
                        const p = document.createElement('p');
                        const strong = document.createElement('strong');
                        strong.textContent = `${label}: `;
                        p.appendChild(strong);
                        p.append(value);
                        return p;
                    }

                    characterInfo.appendChild(createInfoParagraph("Nombre", character.name));
                    characterInfo.appendChild(createInfoParagraph("Alias", character.alias));
                    characterInfo.appendChild(createInfoParagraph("Ocupación", character.occupation));
                    characterInfo.appendChild(createInfoParagraph("Afiliación", character.affiliation));
                    characterInfo.appendChild(createInfoParagraph("Nacionalidad", character.nationality));
                    characterInfo.appendChild(createInfoParagraph("Estado", character.status));

                    const skillsTitle = document.createElement('h3');
                    skillsTitle.textContent = "Habilidades";
                    characterInfo.appendChild(skillsTitle);

                    const skillsList = document.createElement('ul');
                    character.skills.forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill;
                        skillsList.appendChild(li);
                    });
                    characterInfo.appendChild(skillsList);

                    const weaponsTitle = document.createElement('h3');
                    weaponsTitle.textContent = "Armas favoritas";
                    characterInfo.appendChild(weaponsTitle);

                    const weaponsList = document.createElement('ul');
                    character.weapons.forEach(weapon => {
                        const li = document.createElement('li');
                        li.textContent = weapon;
                        weaponsList.appendChild(li);
                    });
                    characterInfo.appendChild(weaponsList);
                }

                const descriptionElement = document.querySelector(".Description_character");
                if (descriptionElement) {
                    descriptionElement.textContent = character.description || "Descripción no disponible";
                }
            } else {
                console.error("Personaje no encontrado");
            }
        })
        .catch(error => console.error("Error al cargar el personaje:", error));
}

if (characterId) {
    showCharacter(characterId);
} else {
    console.error("No se proporcionó un ID de personaje en la URL");
}