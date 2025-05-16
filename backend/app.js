// Importo todo lo de la libreria de Express
import express from "express";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";

import registerEmployessRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerClientRoutes from "./src/routes/registerClients.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import moviesRoutes from "./src/routes/movies.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web

app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);


app.use("/api/registerEmployees", registerEmployessRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/registerClients", registerClientRoutes);

app.use("/api/recoveryPassword", recoveryPasswordRoutes);

app.use("/api/movies", moviesRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
