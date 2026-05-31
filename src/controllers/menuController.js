const db = require("../config/db");

// Obtener todos los platos del menú
exports.obtenerMenu = (req, res) => {

    const query = "SELECT * FROM menu";

    db.query(query, (error, resultados) => {

        if (error) {
            console.error("Error al obtener menú:", error);

            return res.status(500).json({
                mensaje: "Error interno del servidor"
            });
        }

        res.status(200).json(resultados);
    });

};