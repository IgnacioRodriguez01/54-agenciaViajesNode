import {Testimonial} from '../Models/Testimonial.js'

const guardarTestimoniales = async (req, res) => {
    console.log(req.body)
    //Validar form
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El nombre está vacío'});
    } 
    if(correo.trim() === '') {
        errores.push({mensaje : 'El correo está vacío'});
    } 
    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje está vacío'});
    }

    /* if(errores.length > 0) {
        setTimeout(() => {
            errores.pop();
        }, 2000);
    } */

    console.log(errores)

    if(errores.length > 0) {
        try {
            const testimoniales = await Testimonial.findAll();
            
            res.render('testimoniales', {
                pagina : 'Testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            });
        } catch (error) {
            console.log(error);
        }

    } else {
        //Almacenar testimonial
        try {
            const testimonial = await Testimonial.create({ nombre, correo, mensaje })            
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }
	
}

export {
    guardarTestimoniales
}