import express from 'express'
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaDetalleViaje, 
    paginaTestimoniales
} from '../controllers/paginasController.js'
import { 
    guardarTestimonial
} from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', paginaInicio); 

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:viaje', paginaDetalleViaje); // Comodín para no crear 3000 enlaces

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router