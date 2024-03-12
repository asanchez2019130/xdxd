import { response, request } from 'express';
import Product from './product.model.js';

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId })
            .populate({
                path: 'category',
                match: { state: true },
                select: 'nameCategory'
            });

        res.status(200).json({
            message: 'Products found successfully',
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching products by category',
            error: error.message
        });
    }
};

export const getProductByName = async (req, res) => {
    const { nameProduct } = req.query;
    const query = { state: true, nameProduct: { $regex: new RegExp(nameProduct, 'i') } };

    try {
        const [total, product] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
        ]);


        res.status(200).json({
            total,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos por nombre' });
    }
};
export const getProductsOutOfStock = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { stock: 0, state: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate({
                path: 'category',
                match: { state: true },
                select: 'nameCategory'
            })
    ]);

    res.status(200).json({
        total,
        products
    })
}

export const getProductsMostSold = async (req = request, res = response) => {
    try {
        const { limite, desde } = req.body;

        // Obtener los productos más vendidos ordenados por cantidad de ventas
        const products = await Product.find({ state: true })
            .sort({ sales: -1 })
            .skip(Number(desde))
            .limit(Number(limite));

        res.status(200).json({
            total: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error retrieving most sold products',
            error: error.message
        });
    }
}

export const getProducts = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { state: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate({
                path: 'category',
                match: { state: true },
                select: 'nameCategory'
            })
    ]);

    res.status(200).json({
        total,
        products
    })

}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        product
    })
}

export const createProduct = async (req, res) => {
    const { nameProduct, descriptionProduct, price, category, stock } = req.body;
    const product = new Product({ nameProduct, descriptionProduct, price, category, stock });

    await product.save();

    res.status(200).json({
        product
    })
}

export const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    await Product.findByIdAndUpdate(id, rest);
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Product Update',
        product
    })
}

export const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { state: false });

    const authenticatedProduct = req.product;

    res.status(200).json({
        msg: 'Product deleted',
        product,
        authenticatedProduct
    })
}