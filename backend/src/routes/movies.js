import express from "express";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

router
  .route("/")
  .get(moviesController.getAllMovies)      // CORREGIDO
  .post(moviesController.insertMovie);     // CORREGIDO

router
  .route("/:id")
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

export default router;
