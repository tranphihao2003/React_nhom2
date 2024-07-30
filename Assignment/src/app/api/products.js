const products_class = require("../model/products");
exports.getAllproductss = async (req, res) => {
  try {
    let productss = await products_class.getAllproducts();
    res.status(200).json(productss);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getproductsById = async (req, res) => {
  try {
    let products = await products_class.getproductsById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createproducts = async (req, res) => {
  try {
    let products = await products_class.createproducts(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateproducts = async (req, res) => {
  try {
    let products = await products_class.updateproducts(req.params.id, req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteproducts = async (req, res) => {
  try {
    let products = await products_class.deleteproducts(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
