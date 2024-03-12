
import Role from '../role/role.model.js';
import User from '../user/user.model.js';
import Product from '../products/product.model.js'
import Category from '../category/category.model.js';

export const esRoleValido = async (role = '') => {

    if (!role) return true;

    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existeCategory = async (nameCategory = '') => {
    const existeCategory = await Category.findOne({ nameCategory });

    if (existeCategory) {
        throw new Error(`The category ${nameCategory} has already been registered`)
    }
}

export const existeCategoryById = async (id = '') => {
    const existeCategory = await Category.findById(id);

    if (!existeCategory) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existeProduct = async (nameProduct = '') => {
    const existeProduct = await Product.findOne({ nameProduct });

    if (existeProduct) {
        throw new Error(`The category ${nameProduct} has already been registered`)
    }
}

export const existeProductById = async (id = '') => {
    const existeProduct = await Product.findById(id);

    if (!existeProduct) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

