const prisma = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let { userid, name, mobileNo, age, monthlyRevenue, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  age = parseInt(age);
  monthlyRevenue = parseFloat(monthlyRevenue);

  try {
    const user = await prisma.user.create({
      data: {
        userid,
        name,
        mobileNo,
        age,
        monthlyRevenue,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { userid },
    });

    if (!user) {
      // User not found
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Password does not match
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userid;
  const { name, mobileNo, age, monthlyRevenue } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { userid: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { userid: userId },
      data: {
        name,
        mobileNo,
        age,
        monthlyRevenue,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userid: userId },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, getUserData, updateUser };
