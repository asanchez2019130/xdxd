import { Router } from "express";
import { check } from "express-validator";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getProductsOutOfStock,
    updateProduct,
    getProductsMostSold,
    getProductByName,
    getProductsByCategory
} from './product.controller.js';

import { existeProduct, existeProductById, existeCategoryById } from '../helpers/db-validators.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/", getProducts);

router.get("/ProductsByCategory/:categoryId", getProductsByCategory);

router.get("/ProductoOutOfStock", getProductsOutOfStock);

router.get("/ProductsByName", getProductByName);

router.get("/ProductsMostSold", getProductsMostSold);

router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeProductById),
        validarCampos,
    ],
    getProductById
);

router.post(
    "/",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check("nameProduct", "El nombre es obligatorio").not().isEmpty().custom(existeProduct),
        check("descriptionProduct", "La descripción es obligatoria").not().isEmpty(),
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("price", "El precio debe ser un número válido").isNumeric(),
        check("category", "La categoría es obligatoria").not().isEmpty().custom(existeCategoryById),
        check("stock", "El stock es obligatorio").not().isEmpty(),
        check("stock", "El stock debe ser un número válido").isNumeric(),
        validarCampos,
    ],
    createProduct
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check('id', 'No es un Id válido').isMongoId(),
        validarCampos,
    ],
    updateProduct
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN'),
        check('id', 'No es un Id válido').isMongoId(),
        validarCampos,
    ],
    deleteProduct
);

export default router;