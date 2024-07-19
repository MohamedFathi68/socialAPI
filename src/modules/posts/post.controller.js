import { commentModel } from "../../database/models/comments.model.js";
import { postModel } from "../../database/models/posts.model.js";
import { userModel } from "../../database/models/user.model.js";

const createPost = async (req, res) => {
  req.body.userId = req.user.id;  // add userId to the request body when creating a new post
  await postModel.create(req.body);
  res.status(201).json({ message: "success" });
};

const getAllPosts = async (req, res) => { 

  const posts = await postModel.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: commentModel,
    },
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "success", data: posts });
}

const getSpecificPost = async (req, res) => {
  const post = await postModel.findByPk(req.params.id,{
    include:{
      model: commentModel
    }
  });
  if (post == null) {
    res.status(404).json({ message: "err you have no posts yet" });
  } else {
    res.status(200).json({ message: "success", data: post });
  }
};

const updatePost = async (req, res) => {
  
  await postModel.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(202).json({ message: "success" });
};

const deletePost = async (req, res) => {
  await postModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).json({ message: "success, post deleted" });
}

export { createPost, updatePost, getSpecificPost , getAllPosts , deletePost};
