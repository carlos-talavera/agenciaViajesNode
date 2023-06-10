import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( (error) => console.error(error) )

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear(); // Para pasar una variable entre archivos (variables de entorno de Express)
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next(); // Obligar a que pase al siguiente middleware (cada app.use())

})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {

    console.log(`El servidor está funcionando en el puerto ${port}`);

})