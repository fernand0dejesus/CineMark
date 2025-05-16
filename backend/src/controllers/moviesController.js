// Controlador de películas (C R U D)
const moviesController = {};
import moviesModel from "../models/movies.js";

// SELECT - Obtener todas las películas
moviesController.getMovies = async (req, res) => {
  const movies = await moviesModel.find();
  res.json(movies);
};

// INSERT - Crear una nueva película
moviesController.createMovie = async (req, res) => {
  const {
    title,
    description,
    director,
    gener,
    year,
    time,
    image,
  } = req.body;

  try {
    const newMovie = new moviesModel({
      title,
      description,
      director,
      gener,
      year,
      time,
      image,
    });

    await newMovie.save();
    res.json({ message: "Movie saved successfully" });
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ message: "Failed to save movie" });
  }
};

// DELETE - Eliminar una película
moviesController.deleteMovie = async (req, res) => {
  const deletedMovie = await moviesModel.findByIdAndDelete(req.params.id);
  if (!deletedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json({ message: "Movie deleted successfully" });
};

// UPDATE - Actualizar película
moviesController.updateMovie = async (req, res) => {
  const {
    title,
    description,
    director,
    gener,
    year,
    time,
    image,
  } = req.body;

  try {
    await moviesModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        director,
        gener,
        year,
        time,
        image,
      },
      { new: true }
    );

    res.json({ message: "Movie updated successfully" });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Failed to update movie" });
  }
};

export default moviesController;
