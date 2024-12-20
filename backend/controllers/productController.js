const Product = require('../models/Product'); 
const Category = require('../models/Category');

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, image, price, stock, status, category, user } = req.body;
    const newProduct = new Product({name,  description, image, price, stock, status, category, user});
    
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
    const { name, description, image, price, stock, status, category, user  } = req.body;

    const foundCategory = await Category.findOne({ category: category });
    
    if (!foundCategory) 
      return res.status(404).json({ message: `Category '${category}' not found` });
    
    const newProduct = new Product({ name, description, image, price, stock,  status, category: foundCategory._id, user});
    
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
    const product = await Product.findById(req.params.id).populate('category'); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Obtener un producto por ID de la categoria
const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    const products = await Product.find({ category }).populate('category');

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified category' });
    }

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};



// Obtener un producto por nombre
const getProductByName = async (req, res) => {
  const { name, page = 1, limit = 10 } = req.query; 

  // Validación del término de búsqueda
  if (!name || name.length < 3) {
    return res.status(400).json({ error: "El término de búsqueda debe tener al menos 3 caracteres" });
  }

  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" }
    })
      .skip((page - 1) * limit) 
      .limit(Number(limit)) 
      .exec(); 

    const totalProducts = await Product.countDocuments({
      name: { $regex: name, $options: "i" }
    });

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar productos", details: error.message });
  }
}

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



// Eliminar un producto por ID
const updateProductVisibility  = async (req, res) => {
  try {
    const { visible } = req.body;

    if (typeof visible !== 'boolean') {
      return res.status(400).json({ message: 'The "visible" field must be a boolean value' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { visible }, 
      { new: true } 
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product visibility updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product visibility', error: err.message });
  }
};

// Obtener todos los productos visibles
const getAllProductsVisibles = async (req, res) => {
  try {
    const products = await Product.find({ visible: true }).populate('category'); 
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Obtener un producto por ID Visibles
const getProductByIdVisible = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, visible: true }).populate('category'); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found or is not visible' });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};


// Obtener un producto por ID del usuario
const getProductByUser = async (req, res) => {
  try {
    const { user } = req.params;
    const { q = '', offset = 0, limit = 5 } = req.query; 

    const offsetNum = parseInt(offset, 10);
    const limitNum = parseInt(limit, 10);

    const searchFilter = {
      user,
      name: { $regex: q, $options: 'i' }, 
    };

    if (!user) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(searchFilter)
        .skip(offsetNum)
        .limit(limitNum)
        .lean(), 
      Product.countDocuments(searchFilter), 
    ]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified user' });
    }

    res.status(200).json({ products, newOffset: offsetNum + products.length,  totalProducts});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};
// Obtener un producto por ID del usuario + visibility
const getProductByUserVisibility = async (req, res) => {
  try {
    const { user } = req.params;
    const { visible } = req.params;
    const { q = '', offset = 0, limit = 5 } = req.query; 

    const offsetNum = parseInt(offset, 10);
    const limitNum = parseInt(limit, 10);

    const searchFilter = {
      user,
      visible,
      name: { $regex: q, $options: 'i' }, 
    };

    if (!user) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(searchFilter)
        .skip(offsetNum)
        .limit(limitNum)
        .lean(), 
      Product.countDocuments(searchFilter), 
    ]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified user' });
    }

    res.status(200).json({ products, newOffset: offsetNum + products.length,  totalProducts});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductNameCategory,
  getProductByCategory,
  getProductByName,
  getProductByUser,
  updateProductVisibility,
  getAllProductsVisibles,
  getProductByIdVisible,
  getProductByUserVisibility,
};
