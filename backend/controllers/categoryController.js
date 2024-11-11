const Category = require('../models/Category');

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { description, category } = req.body;

    const newCategory = new Category({
      description,
      category,
    });

    await newCategory.save(); 
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};

// Actualizar una categoría por ID
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

// Eliminar una categoría por ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
