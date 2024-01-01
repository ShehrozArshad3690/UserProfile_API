const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    const getAllProfile = await prisma.profile.findMany();
    return res.status(200).send(getAllProfile);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });
    if (!existingProfile) {
      return res.status(404).send({ message: "Profile not found" });
    }
    const getProfileById = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    return res.status(200).send(getProfileById);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const addProfile = async (req, res) => {
  try {
    const id = Number(req.body.userId);
    const existingId = await prisma.user.findUnique({ where: { id } });
    if (!existingId) {
      return res.status(404).send({ message: "userID not found" });
    }
    const createProfile = await prisma.profile.create({
      data: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        userId: req.body.userId,
      },
    });
    return res.status(200).send(createProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const updateProfile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
      },
    });
    return res.status(200).send(updateProfile);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const existingProfile = await prisma.profile.findUnique({ where: { userId } });
    if (!existingProfile) {
      return res.status(404).send({ message: "Profile not found" });
    }
    const updateProfile = await prisma.profile.delete({
      where: {
        userId,
      },
    });
    return res.status(200).send(updateProfile);
  } catch (error) {
    return res.status(500).send({ message: "Internal server errror" });
  }
};

module.exports = {
  getProfile,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
};
