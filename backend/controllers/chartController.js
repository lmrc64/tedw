const mongoose = require('mongoose');
const Order = require('../models/Order'); // Ajusta la ruta según la estructura de tu proyecto

const getUserPurchases = async (req, res) => {
  try {
    // Obtener el ID del usuario desde los parámetros o token
    const userId = req.params.id;

    // Obtener el año actual
    const currentYear = new Date().getFullYear();

    // Realizar la consulta a la base de datos
    const salesData = await Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // Corregido con 'new'
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Inicio del año actual
            $lt: new Date(`${currentYear + 1}-01-01`), // Inicio del próximo año
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" }, // Agrupar por mes
          totalOrders: { $sum: 1 }, // Contar órdenes
          totalAmount: { $sum: "$total" }, // Sumar el total de las órdenes
        },
      },
      {
        $sort: { _id: 1 }, // Ordenar por mes
      },
    ]);


    // Opcional: Formatear los resultados con nombres de meses
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const formattedData = salesData.map(item => ({
      month: monthNames[item._id - 1], // Convertir número del mes a nombre
      totalOrders: item.totalOrders,
      totalAmount: item.totalAmount,
    }));

    // Enviar la respuesta al cliente
    res.status(200).json({ salesData: formattedData });
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ message: 'Error fetching sales', error: err.message });
  }
};

module.exports = {
  getUserPurchases
};
