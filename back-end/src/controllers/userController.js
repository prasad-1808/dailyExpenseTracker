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
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;
  // console.log(userid, password);

  try {
    const user = await prisma.user.findUnique({
      where: { userid },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
