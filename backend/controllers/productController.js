const Product = require('../models/Product'); 
const Category = require('../models/Category');

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, image, price, stock, status } = req.body;
    const newProduct = new Product({name,  description, image, price, stock, status, category});
    
    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// Crear un nuevo producto
const createProductNameCategory = async (req, res) => {
  try {
    const { name, description, image, price, stock, status, category  } = req.body;

    const foundCategory = await Category.findOne({ category: category });
    
    if (!foundCategory) 
      return res.status(404).json({ message: `Category '${category}' not found` });
    
    const newProduct = new Product({ name, description, image, price, stock,  status, category: foundCategory._id});
    
    await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });


  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); 
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id.populate('category')); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');;
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); 

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductNameCategory,
};
