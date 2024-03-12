import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js"
import { login } from "./auth.controller.js"

const router = Router();

router.post(
    '/login',
    [
        check('emailOrUser', 'Este no es un corre valido').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

export default router;