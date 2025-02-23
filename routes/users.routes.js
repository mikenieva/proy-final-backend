// RUTAS PARA CREAR USUARIOS
const express = require('express')
const router = express.Router()

const {check} = require('express-validator')

const usuarioController = require('../controllers/user.controller')


// CREA UN USUARIO
// api/usuarios
router.post('/', 
    [
        check("username", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 6})
    ], 
    usuarioController.crearUsuario
)

// editar perfil
// '/:id/editar-perfil

// cerrar sesión


// ir a gráficas



module.exports = router