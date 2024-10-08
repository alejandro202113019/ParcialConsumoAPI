// Base URL of our server API
const baseURL = '/api/characters';

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  if (Array.isArray(data)) {
    data.forEach(character => {
      resultsDiv.innerHTML += createCharacterHTML(character);
    });
  } else if (data.data && Array.isArray(data.data)) {
    data.data.forEach(character => {
      resultsDiv.innerHTML += createCharacterHTML(character);
    });
  } else {
    resultsDiv.innerHTML += createCharacterHTML(data);
  }
}

function createCharacterHTML(character) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card character-card">
        <div class="card-body">
          <h3 class="card-title">${character.name}</h3>
          <p class="card-text"><strong>ObjectId:</strong> ${character._id}</p>
          <p class="card-text"><strong>Height:</strong> ${character.height}</p>
          <p class="card-text"><strong>Mass:</strong> ${character.mass}</p>
          <p class="card-text"><strong>Gender:</strong> ${character.gender}</p>
          <p class="card-text"><strong>Birth Year:</strong> ${character.birth_year}</p>
        </div>
      </div>
    </div>`;
}

function handleError(error) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<div class="col-12"><p class="error">Error: ${error.message}</p></div>`;
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
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => handleError(error));
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