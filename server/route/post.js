const { Router } = require("express");
const {
  getPost,
  deletePost,
  updatePost,
  getPosts,
  addPost,
  postByCategory,
} = require("../controller/post");
const upload = require("../utils/upload");
const postRouter = Router();

postRouter.route("/:id").get(getPost).delete(deletePost).patch(updatePost);
postRouter.route("/").get(getPosts);
postRouter.get("/cat", postByCategory);
postRouter.post("/", upload.single("image"), addPost);

module.exports = postRouter;
