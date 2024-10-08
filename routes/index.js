const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_BASE_URL = 'https://starwars-n5ec-developuptcs-projects.vercel.app';

// Get all characters
router.get('/characters', async (req, res) => {
  try {
    const response = await axios.get(API_BASE_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

// Get character by ID
router.get('/characters/:id', async (req, res) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${req.params.id}`);
      console.log('API Response:', response.data); // Log the response
      if (response.data && Object.keys(response.data).length > 0) {
        res.json(response.data);
      } else {
        res.status(404).json({ error: 'Personaje no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el personaje:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error al obtener el personaje' });
    }
  });

// Search characters by name
router.get('/characters/search/:name', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${req.params.name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar personajes' });
  }
});

module.exports = router;