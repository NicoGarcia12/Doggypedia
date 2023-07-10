const { Router } = require("express");
const { getDogsHandler } = require("../handlers/Dogs/getDogsHandler");
const { getUniqueDogHandler } = require("../handlers/Dogs/getUniqueDogHandler");
const { postDogHandler } = require("../handlers/Dogs/postDogHandler");
const { getTemperamentsHandler } = require("../handlers/Temperaments/getTemperamentsHandler");

const router = Router();

// HANDLER RECIBO REQ Y LO MANDO AL CONTROLLER QUE HAGA LÓGICA
// HELPER TIENE LOS PEDIDOS A LA API Y A LA BD, DEVUELVO AL CONTROLLER
// Y SU RESULTADO ES PARA EL RES

router.get("/dogs", getDogsHandler);
router.get("/dogs/:id", getUniqueDogHandler);
router.post("/dogs", postDogHandler);
router.get("/temperaments", getTemperamentsHandler);

module.exports = router;
