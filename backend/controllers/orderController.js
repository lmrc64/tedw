const Order = require('../models/Order'); 

// Crear una nueva orden
const createOrder = async (req, res) => {
  try {
    const { user, products, coupons, subtotal, total, address, delivery_date } = req.body;

    const newOrder = new Order({
      user,
      products,
      coupons,
      subtotal,
      total,
      address,
      delivery_date,
    });

    await newOrder.save(); 

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product').populate('coupons');
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// Obtener una orden por ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products.product')
      .populate('coupons');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
};

// Actualizar una orden por ID
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};

// Eliminar una orden por ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};