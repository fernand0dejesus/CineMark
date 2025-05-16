import mongoose from "mongoose";

// 1- Configuro la URI o dirección de la base de datos
const URI = "mongodb+srv://fjsdeveloper1:ITR2025@mopt.jv6g0.mongodb.net/?retryWrites=true&w=majority&appName=MOPT";

// 2- Conecto la base de datos
mongoose.connect(URI);

// ------ Comprobar que todo funciona ------

// 3- Creo una constante que es igual a la conexión
const connection = mongoose.connection;

// Veo si funciona
connection.once("open", () => {
  console.log("DB is connected");
});

// Veo si se desconectó
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

// Veo si hay un error
connection.on("error", (error) => {
  console.log("error found" + error);
});
