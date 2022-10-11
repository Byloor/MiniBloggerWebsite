import db from "../models/index.js";
const Blog = db.blog;

// Get all Blogs from the database.
const getAll = (req, res) => {
    Blog.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    `Something went wrong while retrieving all blogs: ${err.message}.`
            });
        });
};

// Create a blog upon save
const create = (req, res) => {

    const newBlog = req.body.blog
    if (!newBlog.title || !newBlog.content || !newBlog.summary) {
        res.status(500).send({ message: "Some fields is/are missing, blog could not be created" });
        return;
    }
    const blog = new Blog({
        title: newBlog.title,
        content: newBlog.content,
        tags: newBlog.tags,
        summary: newBlog.summary,
        author: newBlog.author
    });

    blog.save(blog)
        .then((data) => res.send(data))
        .catch(err => res.status(500)
            .send({ message: err.message || "Something went wrong" }));
};

// Delete blog with id
const deleteBlogById = (req, res) => {
    const id = req.params.id;

    console.log("Am i gere", id)
    Blog.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Could not delete Blog: id=${id}.`
            });
        } else {
            res.send({
                message: "Blog deleted successfully"
            });
        }
    }).catch(() => {
        res.status(500).send({
            message: `Something went wrong, Could not delete Blog: id=${id}.`
        });
    })
}
//get blog by id
const getBlogById = (req, res) => {

    const id = req.params.id;

    Blog.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Could not find Blog: id=${id}.`
            });
        } else res.send(data);
    }).catch(() => {
        res.status(500).send({
            message: `Something went wrong, Could not find Blog: id=${id}.`
        });
    })
}


//Get all blogs with user
const getAllByUser = (req, res) => {

};

//delete all blogs if user is admin
const DelAllByUser = (req, res) => {

};

//delete all blogs if user is admin
const DelAllByAdmin = (req, res) => {
    Blog.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} All Blogs are deleted successfully by admin!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting all blogs."
            });
        });
};

const blogcontroller = {
    create, getAll, getBlogById,
    DelAllByAdmin, deleteBlogById,
    DelAllByUser, getAllByUser
}
export default blogcontroller;