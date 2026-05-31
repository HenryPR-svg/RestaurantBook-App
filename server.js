const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 1. Llamamos a la base de datos para que se conecte al encender
const db = require("./src/config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 2. Importar tus nuevas rutas
const adminRoutes = require("./src/routes/adminRoutes");
const menuRoutes = require("./src/routes/menuRoutes");

// 3. Usar las rutas en el servidor
app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de RestaurantBook funcionando correctamente");
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
