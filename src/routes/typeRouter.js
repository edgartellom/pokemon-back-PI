const { Router } = require('express');
const { Type } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/", async(req, res, next) => {
    try {
        const allTypes = await Type.findAll();
        res.status(200).send(allTypes);
    } catch (error) {
        next(error)
    }
})

module.exports = router;