import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde

    // Ahorrar tiempo en las consultas haciéndolas al mismo tiempo

    const promiseDB = [];

    // Consultar 3 viajes del modelo Viaje
    promiseDB.push(Viaje.findAll({ limit: 3 }));

    // Consultar 3 testimoniales del modelo Testimonial
    promiseDB.push(Testimonial.findAll( { limit: 3} ));

    try {

        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
        
    } catch (error) {

        console.error(error);
        
    }
    

}

const paginaNosotros = (req, res) => {

    res.render('nosotros', {
        pagina: 'Nosotros'
    });

}

const paginaViajes = async (req, res) => {

    // Consultar la BD

    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });

}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { viaje } = req.params;

    try {

        const resultado = await Viaje.findOne({where : { slug: viaje }});

        res.render('viaje', {
            pagina: 'Información Viaje',
            resultado
        })
        
    } catch (error) {

        console.error(error);
        
    }

}

const paginaTestimoniales = async (req, res) => {

    try {

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch (error) {

        console.error(error);

    }

}

export {
    
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales

}
