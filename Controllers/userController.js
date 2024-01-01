const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();



const getUser = async (req, res) => {
  try {
    const getAllUser = await prisma.user.findMany({
      include: {
        profile: true,
        Post:true
      },
    });
    return res.status(200).send(getAllUser);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingUser=await prisma.user.findUnique({where:{id}});
    if (!existingUser) {
      return res.status(404).send({message:'user not found'})
    }
    const getUserById = await prisma.user.findUnique({
      where: {
        id,
      },
      include:{
        profile:true,
        Post:true
      }
    });
    return res.status(200).send(getUserById);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const email=req.body.email;
    const existingUser=await prisma.user.findUnique({where:{email}});
    if (existingUser) {
      return res.status(404).send({message:'User already exists'});
    }
    const createUser = await prisma.user.create({
      data: {
        email: req.body.email
      },
    });
    return res.status(200).send(createUser);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: req.body.email,
      },
    });
    return res.status(200).send(updateUser);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingUser=await prisma.user.findUnique({where:{id}});
    if (!existingUser) {
      return res.status(404).send({message:'user not found'});
    }
    const updateUser = await prisma.user.delete({
      where: {
        id,
      }
    });
    return res.status(200).send(updateUser);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

module.exports= {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}