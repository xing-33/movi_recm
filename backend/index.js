import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

let movies = [
    { name: "Inception", hero: "Leonardo DiCaprio", director: "Christopher Nolan", year: 2010, type: "Sci-Fi", rating: 9 },
    { name: "The Dark Knight", hero: "Christian Bale", director: "Christopher Nolan", year: 2008, type: "Action", rating: 9 },
    { name: "Titanic", hero: "Leonardo DiCaprio", director: "James Cameron", year: 1997, type: "Romance", rating: 8 },
  ];
 
app.use(cors());
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to the Movie Recommendation API!");
  });
  

// POST route to get movie recommendations
    app.post("/api/recommendations", (req, res) => {
    const { category, input } = req.body; // Category can be 'type', 'hero', or 'director'
    
    // Filter movies based on the category and input
    const filteredMovies = movies.filter((movie)=> 
      movie[category]?.toLowerCase() === input.toLowerCase()
    );
  
    // Send the filtered movies as the response
    if (filteredMovies.length > 0) {
      res.json(filteredMovies); // Return the matching movies
    } else {
      res.status(404).json({ message: "No movies found for the given recommendation." });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
