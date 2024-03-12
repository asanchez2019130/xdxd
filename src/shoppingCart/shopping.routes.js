import { Router } from 'express';
import { createShoppingCart, getShoppingCart, getShoppingCar } from './shoppingCart.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get("/", getShoppingCar)

router.get('/:userId',
    validarJWT,
    getShoppingCart);


router.post('/',
    validarJWT,
    createShoppingCart);


export default router;
