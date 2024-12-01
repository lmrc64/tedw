const Order = require('../models/Order');
const mongoose = require("mongoose");

// Crear una nueva orden
const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      coupons,
      subtotal,
      total,
      address,
      paymentMethod,
      delivery_date,
      billaddress,
      billname,
      billphone,
      billemail,
      billcompany,
    } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (
      !user ||
      !products ||
      !subtotal ||
      !total ||
      !address ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      user,
      products,
      coupons,
      subtotal,
      total,
      address,
      paymentMethod,
      delivery_date,
      billaddress,
      billname,
      billphone,
      billemail,
      billcompany,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
};

// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .populate("coupons");

    res.status(200).json({ orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Obtener una orden por ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product")
      .populate("coupons");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: err.message });
  }
};

// Actualizar una orden por ID
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order", error: err.message });
  }
};

// Eliminar una orden por ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};

//charts for the user(client/seller)
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

const getUserMonthlySales = async (req, res) => {
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
    const monthlySales = await Order.aggregate([
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
    const monthlySalesWithDefaults = allMonths.map((month) => {
      const found = monthlySales.find((order) => order._id === month);
      return {
        month: monthNames[month - 1], // Convertir índice a nombre del mes
        totalSales: found ? found.totalSales : 0
      };
    });

    res.status(200).json({ monthlySales: monthlySalesWithDefaults });
  } catch (err) {
    res.status(500).json({ message: "Error fetching monthly sales", error: err.message });
  }
};

//charts for the admin
const getMonthlyOrders = async (req, res) => {
  try {

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

const getWeeklyOrders = async (req, res) => {
  try {
    // Año actual
    const currentYear = new Date().getFullYear();

    // Array con los nombres de las semanas
    const allWeeks = Array.from({ length: 52 }, (_, i) => i + 1); // 52 semanas en un año

    // Agregación
    const weeklyOrders = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Fecha de inicio del año actual
            $lt: new Date(`${currentYear + 1}-01-01`), // Fecha de inicio del próximo año
          },
        },
      },
      {
        $addFields: {
          weekNumber: {
            $isoWeek: "$date", // Calcula la semana del año ISO
          },
        },
      },
      {
        $group: {
          _id: "$weekNumber", // Agrupar por número de semana
          totalOrders: { $sum: 1 }, // Contar el número de órdenes
        },
      },
      {
        $sort: { _id: 1 }, // Ordenar por semana
      },
    ]);

    // Completar las semanas faltantes con 0 órdenes
    const weeklyOrdersWithDefaults = allWeeks.map((week) => {
      const found = weeklyOrders.find((order) => order._id === week);
      return {
        week: `Semana ${week}`, // Nombre de la semana
        totalOrders: found ? found.totalOrders : 0,
      };
    });

    res.status(200).json({ weeklyOrders: weeklyOrdersWithDefaults });
  } catch (err) {
    res.status(500).json({ message: "Error fetching weekly orders", error: err.message });
  }
};

const getYearlyOrders = async (req, res) => {
  try {
    // Año actual
    const currentYear = new Date().getFullYear();

    // Agregación para obtener el total por año
    const yearlyOrders = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear - 5}-01-01`), // Buscar los últimos 5 años (ajusta según tus necesidades)
            $lt: new Date(`${currentYear + 1}-01-01`), // Fecha de inicio del próximo año
          },
        },
      },
      {
        $addFields: {
          year: { $year: "$date" }, // Obtener el año de la fecha de la orden
        },
      },
      {
        $group: {
          _id: "$year", // Agrupar por año
          totalOrders: { $sum: 1 }, // Contar el número de órdenes
        },
      },
      {
        $sort: { _id: 1 }, // Ordenar por año
      },
    ]);

    // Formatear la respuesta
    const response = yearlyOrders.map((order) => ({
      year: order._id,
      totalOrders: order.totalOrders,
    }));

    res.status(200).json({ yearlyOrders: response });
  } catch (err) {
    res.status(500).json({ message: "Error fetching yearly orders", error: err.message });
  }
};

const getCurrentYearOrders = async (req, res) => {
  console.log("orderController")
  try {
    // Año actual
    const currentYear = new Date().getFullYear();

    // Agregación para obtener el total por el año actual
    const currentYearOrders = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Fecha de inicio del año actual
            $lt: new Date(`${currentYear + 1}-01-01`), // Fecha de inicio del próximo año
          },
        },
      },
      {
        $group: {
          _id: null, // No agrupamos por año ya que solo queremos el total
          totalOrders: { $sum: 1 }, // Contar el número de órdenes
        },
      },
    ]);

    // Si no hay órdenes en este año
    const totalOrders = currentYearOrders.length > 0 ? currentYearOrders[0].totalOrders : 0;

    res.status(200).json({ totalOrders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching current year orders", error: err.message });
  }
};

const getCurrentYearProducts = async (req, res) => {
  try {
    // Año actual
    const currentYear = new Date().getFullYear();

    // Agregación para obtener el total de productos en todas las órdenes del año actual
    const totalProducts = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Fecha de inicio del año actual
            $lt: new Date(`${currentYear + 1}-01-01`), // Fecha de inicio del próximo año
          },
        },
      },
      {
        $unwind: "$products", // Deshacer el arreglo de productos
      },
      {
        $group: {
          _id: null, // No agrupamos por ningún campo, solo sumamos el total
          totalProducts: { $sum: "$products.quantity" }, // Sumar la cantidad de productos
        },
      },
    ]);

    // Si no hay productos en las órdenes
    const totalProductsCount = totalProducts.length > 0 ? totalProducts[0].totalProducts : 0;

    res.status(200).json({ totalProducts: totalProductsCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching current year products", error: err.message });
  }
};





module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,

  getUserMonthlyOrders,
  getUserMonthlySales,

  getMonthlyOrders,
  getWeeklyOrders,
  getYearlyOrders,

  getCurrentYearOrders,
  getCurrentYearProducts
};