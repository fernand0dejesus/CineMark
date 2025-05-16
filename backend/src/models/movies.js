/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const moviesSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {   
        type: String,
      },
      director: {
        type: String,
        required: true,
      },
      gener: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: true,
        min: 1,
      },
      image: {
        type: Number,
        
      },
    },
    {
      timestamps: true,
      strict: false,
    }
  );
  

export default model("Movies", moviesSchema);
