fetch("../JSON/JohnWick.json")
  .then(response => response.json())
  .then(data => {

    // Texto
    const textContainer = document.getElementById('johnwick_text');
    textContainer.innerHTML = `
      <h2>${data.name} <small>(${data.alias})</small></h2>
      <p><strong>Ocupación:</strong> ${data.occupation}</p>
      <p><strong>Afiliación:</strong> ${data.affiliation}</p>
      <p><strong>Nacionalidad:</strong> ${data.nationality}</p>
      <p><strong>Estado:</strong> ${data.status}</p>

      <h3>Habilidades</h3>
      <ul>
        ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>

      <h3>Armas favoritas</h3>
      <ul>
        ${data.weapons.map(weapon => `<li>${weapon}</li>`).join('')}
      </ul>

      <h3>Descripción</h3>
      <p>${data.description.replace(/\n/g, "<br>")}</p>
    `;
  })
  .catch(error => {
    console.error('Error al cargar el perfil:', error);
  });
