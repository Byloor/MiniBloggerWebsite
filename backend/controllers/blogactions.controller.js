import db from "../models/index.js";
const Blog = db.blog;

// Get all Blogs from the database.
const getAll = (req, res) => {
  const userid = req.params.userid;
  var condition = userid
    ? { userid: { $regex: new RegExp(userid), $options: "i" } }
    : {};
  Blog.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Something went wrong while retrieving all blogs: ${err.message}.`,
      });
    });
};

// Create a blog upon save
const create = (req, res) => {
  const newBlog = req.body.blog;
  if (!newBlog.title || !newBlog.content || !newBlog.summary) {
    res
      .status(500)
      .send({
        message: "Some fields is/are missing, blog could not be created",
      });
    return;
  }
  const blog = new Blog({
    title: newBlog.title,
    content: newBlog.content,
    tags: newBlog.tags,
    summary: newBlog.summary,
    author: newBlog.author,
    userid: newBlog.userid,
  });

  blog
    .save(blog)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Something went wrong" })
    );
};
// Update blog with id
const updateBlogById = (req, res) => {
  if (!req.body || req.body === {}) {
    return res.status(400).send({
      message: "Blog to update can not be empty!",
    });
  }
  const id = req.params.id;
  console.log("here", req.body, id, req.body.blog)
  Blog.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Could not update Blog: id=${id}.`,
        });
      } else {
        res.send({
          id,
          message: "Blog updated successfully",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Something went wrong, Could not update Blog: id=${id}.`,
      });
    });
};
// Delete blog with id
const deleteBlogById = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Could not delete Blog: id=${id}.`,
        });
      } else {
        res.send({
          id,
          message: "Blog deleted successfully",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Something went wrong, Could not delete Blog: id=${id}.`,
      });
    });
};
//get blog by id
const getBlogById = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Could not find Blog: id=${id}.`,
        });
      } else res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Something went wrong, Could not find Blog: id=${id}.`,
      });
    });
};

//delete all blogs if user is admin
const deleteAll = (req, res) => {
  const userid = req.params.userid;
  var condition = userid
    ? { userid: { $regex: new RegExp(userid), $options: "i" } }
    : {};
  Blog.deleteMany(condition)
    .then((data) => {
      res.send({
        message: `${data.deletedCount} All Blogs are deleted successfully by admin!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all blogs.",
      });
    });
};

const blogcontroller = {
  create,
  getAll,
  getBlogById,
  deleteAll,
  deleteBlogById,
  updateBlogById,
};
export default blogcontroller;
