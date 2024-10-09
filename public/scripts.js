// Base URL of our server API
const baseURL = '/api/characters';

function displayResults(response) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  
  console.log('Response received:', response);

  if (response.error) {
    resultsDiv.innerHTML = `<div class="alert alert-danger">${response.error}</div>`;
    return;
  }

  const characterData = response.data ? response.data : response;
  
  if (Array.isArray(characterData)) {
    if (characterData.length === 0) {
      resultsDiv.innerHTML = '<div class="alert alert-info">No se encontraron personajes</div>';
    } else {
      characterData.forEach(character => {
        resultsDiv.innerHTML += createCharacterHTML(character);
      });
    }
  } else if (typeof characterData === 'object' && characterData !== null) {
    resultsDiv.innerHTML += createCharacterHTML(characterData);
  } else {
    resultsDiv.innerHTML = '<div class="alert alert-warning">No se encontraron datos</div>';
  }
}

function createCharacterHTML(character) {
  console.log('Creating HTML for character:', character);
  return `
    <div class="col-md-4 mb-4">
      <div class="card character-card">
        <div class="card-header">
          <h3 class="card-title">${character.name || 'Nombre desconocido'}</h3>
        </div>
        <div class="card-body">
          <div class="character-info">
            <p><i class="fas fa-fingerprint"></i> <strong>ID:</strong> ${character._id || 'N/A'}</p>
            <p><i class="fas fa-ruler-vertical"></i> <strong>Altura:</strong> ${character.height || 'N/A'} cm</p>
            <p><i class="fas fa-weight"></i> <strong>Peso:</strong> ${character.mass || 'N/A'} kg</p>
            <p><i class="fas fa-venus-mars"></i> <strong>Género:</strong> ${character.gender || 'N/A'}</p>
            <p><i class="fas fa-birthday-cake"></i> <strong>Año de nacimiento:</strong> ${character.birth_year || 'N/A'}</p>
          </div>
        </div>
        <div class="card-footer">
          <small>Especie: ${character.species || 'Desconocida'}</small>
        </div>
      </div>
    </div>`;
}

function handleError(error) {
  console.error('Error:', error);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
}

document.getElementById('loadAll').addEventListener('click', () => {
  fetch(baseURL)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => handleError(error));
});
document.getElementById('btnSearchById').addEventListener('click', () => {
  const objectId = document.getElementById('searchById').value.trim();
  if (objectId) {
    fetch(`${baseURL}/${objectId}`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw err; });
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        displayResults(data);
      })
      .catch(error => {
        console.error('Error details:', error);
        if (error.error) {
          handleError({ message: error.error });
        } else {
          handleError(error);
        }
      });
  } else {
    alert("Por favor, introduce un ObjectId válido");
  }
});

document.getElementById('btnSearchByName').addEventListener('click', () => {
  const name = document.getElementById('searchByName').value.trim();
  if (name) {
    fetch(`${baseURL}/search/${name}`)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => handleError(error));
  } else {
    alert("Por favor, introduce un nombre válido");
  }
});