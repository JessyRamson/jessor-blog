const { Router } = require("express");
const {
  getUser,
  deleteUser,
  updateUser,
  getUsers,
  logUser,
  addUser,
} = require("../controller/user");
const userRouter = Router();

userRouter.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);
userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.post("/login", logUser);

module.exports = userRouter;
