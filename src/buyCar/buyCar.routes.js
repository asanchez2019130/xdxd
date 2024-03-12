import { Router } from "express";
import { createBuy } from "./buyCar.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post("/", [
    validarJWT,
    validarCampos
], createBuy);

export default router;