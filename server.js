const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'movie_db'
    },
    console.log(`Connected to the movie_db database.`)
);


//adds a movie
app.get('/api/movies', (req, res) => {
    db.query(`SELECT * FROM movies`, (err, result) => {
        console.log(result);
        res.json(result);
    });
});

//render a list of all movies
app.post('/api/add-movie', (req, res) => {
    db.query(`INSERT INTO movies(movie_name) VALUES (?)`, req.body.name, (err, result) => {
        console.log(result)
        res.json("Movie Added");
    });

});

//deletes a movie
app.delete('/api/movies/:id', (req, res) => {
    db.query('DELETE FROM movies WHERE id = ?', req.params.id)
});

//gets all movies with its associated reviews
app.get('/api/movie-reivew', (req, res) => {
    const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews INNER JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name; `;
    db.query(sql, (err, rows) => {
        
    })
});

//get a specific review
app.get('/api/movies/id', () => {

});







  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  