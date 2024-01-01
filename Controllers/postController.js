const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getPost = async (req, res) => {
  try {
    const getAllPost = await prisma.post.findMany();
    return res.status(200).send(getAllPost);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    const getPostById = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).send(getPostById);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const addPost = async (req, res) => {
  try {
    const id = Number(req.body.userId);
    const existingId = await prisma.user.findUnique({ where: { id } });
    if (!existingId) {
      return res.status(404).send({ message: "userID not found" });
    }
    const createProfile = await prisma.post.create({
      data: {
        title: req.body.title,
        userId: id,
      },
    });
    return res.status(200).send(createProfile);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingPost= await prisma.post.findUnique({where:{id}});
    if (!existingPost) {
      return res.status(404).json({message:'Post not found'})
    }
    const updateProfile = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: req.body.title,
        userId: req.body.userId,
      },
    });
    return res.status(200).send(updateProfile);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
    return res.status(200).send(deletePost);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
