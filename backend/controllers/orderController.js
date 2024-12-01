const Order = require('../models/Order');
const mongoose = require("mongoose");

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


const getUserMonthlyOrders = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la solicitud

    // Año actual
    const currentYear = new Date().getFullYear();

    // Array con los nombres de los meses
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Crear un array de todos los meses del año (1 a 12) con valores iniciales
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    // Agregación
    const monthlyOrders = await Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(id), // Filtrar por usuario específico
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Fecha de inicio del año actual
            $lt: new Date(`${currentYear + 1}-01-01`), // Fecha de inicio del próximo año
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" }, // Agrupar por mes
          totalOrders: { $sum: 1 }, // Contar el número de órdenes
        },
      },
      {
        $sort: { _id: 1 }, // Ordenar por mes
      },
    ]);

    // Completar los meses faltantes con 0 órdenes y mapear nombres de meses
    const monthlyOrdersWithDefaults = allMonths.map((month) => {
      const found = monthlyOrders.find((order) => order._id === month);
      return {
        month: monthNames[month - 1], // Convertir índice a nombre del mes
        totalOrders: found ? found.totalOrders : 0
      };
    });

    res.status(200).json({ monthlyOrders: monthlyOrdersWithDefaults });
  } catch (err) {
    res.status(500).json({ message: "Error fetching monthly orders", error: err.message });
  }
};




module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getUserMonthlyOrders,
};