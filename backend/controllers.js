const schemaData = require("./schema");

const objectId = require("mongodb").ObjectId;

//creating a new product
const createProduct = (req, res) => {
  const product = new schemaData(req.body);
  product
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//getting all the products
const getAllProducts = (req, res) => {
  schemaData
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//getting a single product
const getOneProduct = (req, res) => {
  schemaData
    .find({ _id: new objectId(req.params.productId) })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//updating a product
const updateProduct = (req, res) => {
  schemaData
    .findByIdAndUpdate(req.params.productId, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//deleting a product
const deleteProduct = (req, res) => {
  schemaData
    .findByIdAndDelete(req.params.productId)
    .then((result) => {
      res.json({ message: "Deletion success" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  createProduct,
};
