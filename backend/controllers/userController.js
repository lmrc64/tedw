const {User} = require('../models/User'); 
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, phone, country, state, city, zip } = req.body;
    const newUser = new User({
      firstname,
      lastname,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      gender,
      phone,
      country,
      state,
      city,
      zip,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });

  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
      
      if (!user) {
        return res.status(400).send('User not found.');
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);     
      if (!passwordMatch) {
        return res.status(400).send('Password is incorrect!');
      }
      /*
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin, 
        },
        secret,
        { expiresIn: '1d' } 
      );
      */
  
      res.status(200).send({ user: user.email});
      //res.status(200).send({ user: user.email, token: token });

    } catch (err) {
      res.status(500).send('Internal server error');
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const userExist = await User.findById(req.params.id);    
    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    let newPassword = userExist.passwordHash; 
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10); 
    }

    // Actualizar el usuario con los datos proporcionados
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname || userExist.firstname, 
        lastname: req.body.lastname || userExist.lastname,
        email: req.body.email || userExist.email,
        passwordHash: newPassword,
        phone: req.body.phone || userExist.phone,
        country: req.body.country || userExist.country,
        state: req.body.state || userExist.state,
        zip: req.body.zip || userExist.zip,
        isAdmin: req.body.isAdmin !== undefined ? req.body.isAdmin : userExist.isAdmin, 
      },
      { new: true } 
    );
    if (!updatedUser) {
      return res.status(400).json({ message: 'The user cannot be updated!' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
};