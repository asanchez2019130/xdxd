import express from 'express';
import { createBuy, getInvoices, getInvoicesByUserId } from './invoice.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = express.Router();

router.get('/', validarJWT, getInvoices);

router.post('/', validarJWT, createBuy);

router.get('/InvoiceByUserId/:userId', getInvoicesByUserId)

export default router;