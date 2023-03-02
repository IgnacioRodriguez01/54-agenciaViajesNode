import express from "express";
import router from "./routes/index.js"
import db from "./config/db.js"

const app = express();

const port = process.env.PORT || 3000;

//Conectar la base de datos
db.authenticate()
    .then( () => console.log("Base de datos conectada") )
    .catch( error => console.log(error) );

// Habilitar PUG
app.set('view engine', 'pug');

//Obtener año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.yearVar = year.getFullYear();
    next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir carpeta de archivos estáticos
app.use(express.static('public'));
app.use('/viajes', express.static('public')); //correcion para las paginas de viaje

// Agregar Router
app.use('/', router);


app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});
