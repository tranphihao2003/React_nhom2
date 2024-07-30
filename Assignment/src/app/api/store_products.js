const store_products_class = require("../model/store_products");
exports.getAllstore_productss = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pageSize);

    let store_productss = await store_products_class.getAllstore_products(
      page,
      pageSize
    );
    res.status(200).json(store_productss);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getstore_productsById = async (req, res) => {
  try {
    let store_products = await store_products_class.getstore_productsById(
      req.params.id
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createstore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.createstore_products(
      req.body
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updatestore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.updatestore_products(
      req.params.id,
      req.body
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deletestore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.deletestore_products(
      req.params.id
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error);
  }
};
