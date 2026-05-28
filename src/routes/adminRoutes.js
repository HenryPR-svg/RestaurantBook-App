const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Rutas de Gestión de Usuarios
router.get("/usuarios", adminController.obtenerUsuarios); // Ver todos
router.post("/usuarios", adminController.crearUsuario); // Crear
router.put("/usuarios/:id", adminController.actualizarUsuario); // Editar
router.delete("/usuarios/:id", adminController.eliminarUsuario); // Eliminar

module.exports = router;
