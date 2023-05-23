const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * ! get posts
 */
const getPosts = async (req, res) => {
  const { cat } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        category: cat,
      },
      include: {
        user: true,
      },
    });
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.json("An error occured !!");
  }
};

/**
 * ! getPost
 */
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    res.json(post);
  } catch (e) {
    console.log(e);
    res.json("An error occured !!");
  }
};

/**
 * ! add post
 */
const addPost = async (req, res) => {
  const { title, description, image, category, user } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        image,
        userId: user,
      },
    });
    console.log(req.body);
    res.json("Post created successfully...");
  } catch (e) {
    console.log(e);
    res.json("An error occured !!");
  }
};

/**
 * ! delete post
 */
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    res.json("Post deleted successfully...");
  } catch (e) {
    console.log(e);
    res.json("An error occured !!");
  }
};

/**
 * ! update post
 */
const updatePost = async (req, res) => {
  const { title, description, image, category } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        image,
        category,
      },
    });
    res.json("Post updated successfully...");
  } catch (e) {
    res.json("An error occured !!");
  }
};

/**
 *! get post by category
 */
const postByCategory = async (req, res) => {
  // const cat = req.query.cat;
  console.log("api launched");
  res.send(req);
  try {
    // const post = await prisma.post.findMany({
    //   where:{
    //     category:cat
    //   }
    // })
    // res.json(post)
    // console.log(post)
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  postByCategory,
};
