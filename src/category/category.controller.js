import { response, request } from "express";
import Category from './category.model.js';
import Product from '../products/product.model.js';

export const getCategory = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { state: true };

    const [total, categorys] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorys
    })
}

export const createCategory = async (req, res) => {
    const { nameCategory } = req.body;
    const category = new Category({ nameCategory });

    await category.save();

    res.status(200).json({
        category
    })
}

export const updateCategory = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...rest } = req.body;

    await Category.findByIdAndUpdate(id, rest);
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Category Update',
        category,
    })
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { defaultCategoryId } = req.body;

    try {
        const categoryToDelete = await Category.findById(id);

        if (!categoryToDelete) {
            return res.status(404).json({
                msg: 'The category does not exist'
            })
        }

        const productsToUpdate = await Product.find({ category: id });

        await Promise.all(productsToUpdate.map(async product => {
            product.category = defaultCategoryId;
            await product.save();
        }));

        const category = await Category.findByIdAndUpdate(id, { state: false });

        res.status(200).json({
            msg: 'Category is eliminated',
            category
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Error the eliminated category'
        })
    }
}