import { Router } from "express";
import { check } from "express-validator";
import {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory
} from './category.controller.js'

import { existeCategory, existeCategoryById } from '../helpers/db-validators.js'
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/", getCategory);

router.post(
    "/",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check("nameCategory", "El nombre es obligatorio").not().isEmpty(),
        check("nameCategory").custom(existeCategory),
        validarCampos,
    ],
    createCategory
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check('id', 'No es un Id valido').isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos,
    ],
    updateCategory
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check('id', 'No es un Id valido').isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos,
    ],
    deleteCategory
);

export default router;