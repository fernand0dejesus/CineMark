import movieModel from "../models/movies.js"; // Importa el modelo de películas
import { v2 as cloudinary } from "cloudinary"; // Importa Cloudinary

import { config } from "../config.js";

// 1- Configurar Cloudinary con nuestras credenciales
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Array de funciones vacío
const moviesController = {};

// SELECT (Obtener todas las películas)
moviesController.getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// INSERT (Agregar una nueva película)
moviesController.insertMovie = async (req, res) => {
  const {
    title,
    description,
    director,
    genre,
    year,
    time,
  } = req.body;
  let imageURL = "";

  try {
    // Subir la imagen a Cloudinary si se proporciona
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movies", // Carpeta en Cloudinary donde se guardará la imagen
        allowed_formats: ["png", "jpg", "jpeg"], // Formatos permitidos
      });

      // Guardamos la URL de la imagen subida en la variable
      imageURL = result.secure_url;
    }

    // Crear el nuevo documento de película en la base de datos
    const newMovie = new movieModel({
      title,
      description,
      director,
      genre,
      year,
      time,
      image: imageURL, // URL de la imagen subida
    });

    // Guardar la película en la base de datos
    await newMovie.save();
    res.json({ message: "Movie saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error saving movie", error });
  }
};

// UPDATE (Actualizar los detalles de una película)
moviesController.updateMovie = async (req, res) => {
  const { title, description, director, genre, year, time } = req.body;
  let imageURL = "";

  try {
    // Si se sube una nueva imagen, la subimos a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movies", // Carpeta en Cloudinary donde se guardará la imagen
        allowed_formats: ["png", "jpg", "jpeg"], // Formatos permitidos
      });

      imageURL = result.secure_url;
    }

    // Actualizar la película en la base de datos
    const updatedMovie = await movieModel.findByIdAndUpdate(
      req.params.id, // ID de la película a actualizar
      {
        title,
        description,
        director,
        genre,
        year,
        time,
        image: imageURL || undefined, // Si hay imagen, la actualizamos
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated successfully", updatedMovie });

  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

// DELETE (Eliminar una película)
moviesController.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

export default moviesController;
