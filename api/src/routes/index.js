const { Router } = require("express");
const {
  getDogs,
  getUniqueDog,
  postDog,
} = require("../controllers/dogsController");
const { getTemperaments } = require("../controllers/temperamentsController");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs);
router.get("/dogs/:idRaza", getUniqueDog);
router.post("/dogs", postDog);
router.get("/temperaments", getTemperaments);

module.exports = router;
