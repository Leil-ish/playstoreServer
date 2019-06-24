const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
  const { genre = '', sort } = req.query;

  let results = apps
    .filter(app =>
    app
    .Genres
    .toLowerCase()
    .includes(genre.toLowerCase()));

    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Must filter by genre')
        }

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
        return res
            .status(400)
            .send('Sort must be one of Rating or App');
        }
    }


	if (sort === 'App') {
		results.sort((a, b) => (a.App > b.App ? 1 : -1));
	}
	if (sort === 'Rating') {
		results.sort((b, a) => (a.Rating > b.Rating ? 1 : -1));
	}
    
  res
    .status(200)
    .json(results);
    }
});

module.exports = app;
