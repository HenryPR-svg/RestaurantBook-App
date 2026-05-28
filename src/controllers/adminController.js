const db = require("../config/db");

// Función para obtener todos los usuarios (Gestión de Usuarios)
exports.obtenerUsuarios = (req, res) => {
  const query =
    "SELECT id_usuario, nombre, correo, rol, estado, fecha_registro FROM usuarios";

  db.query(query, (error, resultados) => {
    if (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
    res.status(200).json(resultados);
  });
};

// Función para CREAR un nuevo usuario (desde el panel Admin)
exports.crearUsuario = (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // Aquí idealmente la contraseña debería encriptarse (ej. con bcrypt),
  // pero para la estructura base lo guardaremos directo.
  const query =
    "INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [nombre, correo, password, rol || "Cliente"],
    (error, resultados) => {
      if (error) {
        console.error("Error al crear usuario:", error);
        return res
          .status(500)
          .json({ mensaje: "Error interno o correo duplicado" });
      }
      res.status(201).json({
        mensaje: "Usuario creado exitosamente",
        id: resultados.insertId,
      });
    },
  );
};

// Función para EDITAR un usuario
exports.actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, rol, estado } = req.body;

  const query =
    "UPDATE usuarios SET nombre = ?, rol = ?, estado = ? WHERE id_usuario = ?";

  db.query(query, [nombre, rol, estado, id], (error, resultados) => {
    if (error) {
      console.error("Error al actualizar usuario:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al actualizar el usuario" });
    }
    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  });
};

// Función para ELIMINAR un usuario
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM usuarios WHERE id_usuario = ?";

  db.query(query, [id], (error, resultados) => {
    if (error) {
      console.error("Error al eliminar usuario:", error);
      return res.status(500).json({
        mensaje: "Error al eliminar el usuario (quizás tiene reservas activas)",
      });
    }
    res.status(200).json({ mensaje: "Usuario eliminado del sistema" });
  });
};
