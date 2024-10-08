const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.set('PORT', process.env.PORT || 3500);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

// Use express.json() to parse JSON request bodies
app.use(express.json());

// Use express.urlencoded() to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Your routes
app.use('/api', require('./routes/index'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
function startServer() {
  app.listen(app.get('PORT'), () =>
    console.log(`Server ready at Port ${app.get('PORT')}`)
  );
}

startServer();