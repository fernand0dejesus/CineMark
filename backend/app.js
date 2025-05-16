// Importo todo lo de la libreria de Express


// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web


// Exporto la constante para poder usar express en otros archivos
export default app;
