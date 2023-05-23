const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/env");
const prisma = new PrismaClient();

/**
 * ! get all users
 */
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Post: true,
      },
    });
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(404).json(err);
  }
};

/**
 * ! get single user by id
 */
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

/**
 * ! delete user
 */
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json(
      `User with id :${req.params.id} and name : ${user.username} has been deleted successfully...`
    );
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

/**
 * ! add user
 */
const addUser = async (req, res) => {
  const { username, email, password, image } = req.body;
  try {
    const checkUser = await prisma.user.findUnique({
      where: { email },
    });
    if (checkUser) {
      res.json(`Sorry, user already exists`);
    } else {
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hash,
          image,
        },
      });
      const token = jwt.sign({ id: user.id }, secret);
      res.json({ message: "User created successfully", token });
      console.log(user);
    }
  } catch (e) {
    console.log(e);
    res.json("An error occurred while creating user...");
  }
};

/**
 * ! update user
 */
const updateUser = async (req, res) => {
  const { username, email, password, image } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        username,
        email,
        password: hash,
        image,
      },
    });
    res.json(" User updated successfully...");
  } catch (e) {
    console.log(e);
    res.json("An error occurred while updating user");
  }
};

/**
 * ! log user
 */
const logUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) {
      res.json("User does not exist. Please sign up.");
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const { password, ...other } = user;
        const token = jwt.sign({ id: user.id }, secret);
        res.json({ user: other, token });
      } else {
        res.json("Wrong password");
      }
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addUser,
  logUser,
};
