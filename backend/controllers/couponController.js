const Coupon = require('../models/Coupon'); 

// Crear un nuevo cupón
const createCoupon = async (req, res) => {
  try {
    const { codigo, discount, expiration_date, maximum_use } = req.body;

    const newCoupon = new Coupon({
      codigo,
      discount,
      expiration_date,
      maximum_use,
    });

    await newCoupon.save(); 

    res.status(201).json({
      message: 'Coupon created successfully',
      coupon: newCoupon,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating coupon', error: err.message });
  }
};

// Obtener todos los cupones
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coupons', error: err.message });
  }
};

// Obtener un cupón por código
const getCouponByCode = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ codigo: req.params.codigo });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ coupon });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coupon', error: err.message });
  }
};

// Obtener un cupón por ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ coupon });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coupon', error: err.message });
  }
};

// Actualizar un cupón por ID
const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
  } catch (err) {
    res.status(500).json({ message: 'Error updating coupon', error: err.message });
  }
};

// Eliminar un cupón por ID
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting coupon', error: err.message });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
