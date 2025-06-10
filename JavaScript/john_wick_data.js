// JavaScript adaptado para character_info.html

fetch('../JSON/JohnWick.json')
  .then(response => response.json())
  .then(data => {
    const info = document.getElementById('info');
    const DescripcionJW = document.getElementById('DescripcionJW');

    info.textContent = '';
    DescripcionJW.textContent = '';

    function createInfoParagraph(label, value) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = `${label}: `;
      p.appendChild(strong);
      p.append(value);
      return p;
    }
    info.appendChild(createInfoParagraph('Alias', data.alias));
    info.appendChild(createInfoParagraph('Ocupación', data.occupation));
    info.appendChild(createInfoParagraph('Afiliación', data.affiliation));
    info.appendChild(createInfoParagraph('Nacionalidad', data.nationality));
    info.appendChild(createInfoParagraph('Estado', data.status));

    const skillsTitle = document.createElement('h3');
    skillsTitle.textContent = 'Habilidades';
    info.appendChild(skillsTitle);

    const skillsList = document.createElement('ul');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });
    info.appendChild(skillsList);

    const weaponsTitle = document.createElement('h3');
    weaponsTitle.textContent = 'Armas favoritas';
    info.appendChild(weaponsTitle);

    const weaponsList = document.createElement('ul');
    data.weapons.forEach(weapon => {
      const li = document.createElement('li');
      li.textContent = weapon;
      weaponsList.appendChild(li);
    });
    info.appendChild(weaponsList);

    const descriptionParagraphs = data.description.split('\n');
    descriptionParagraphs.forEach(line => {
      const p = document.createElement('p');
      p.textContent = line;
      DescripcionJW.appendChild(p);
    });
  })
  .catch(error => {
    console.error('Error al cargar el perfil:', error);
  });


