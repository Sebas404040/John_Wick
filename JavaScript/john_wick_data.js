// JavaScript adaptado para character_info.html

fetch('../JSON/JohnWick.json')
  .then(response => response.json())
  .then(data => {
    const info = document.getElementById('info');
    const DescripcionJW = document.getElementById("DescripcionJW");


    info.innerHTML = `
      <p><strong>Alias:</strong> ${data.alias}</p>
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
    `;


    DescripcionJW.innerHTML =` 
      <p>${data.description.replace(/\n/g, "<br>")}</p>
    `;
  })
  .catch(error => {
    console.error('Error al cargar el perfil:', error);
  });

