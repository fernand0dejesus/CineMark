import express from "express";
import moviesController from "../controllers/moviesController.js";


const router = express.Router();


router
  .route("/")
  .get(moviesController.getMovies)    
  .post(moviesController.createMovie);  


router
  .route("/:id")
  .put(moviesController.updateMovie)    
  .delete(moviesController.deleteMovie); 

export default router;
