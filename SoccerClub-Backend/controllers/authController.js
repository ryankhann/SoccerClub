const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users 
      (first_name, last_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        role || 'player',
      ]
    );

    const user = newUser.rows[0];

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

// GET CURRENT USER
exports.getMe = async (req, res) => {
  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = userResult.rows[0];

    res.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};