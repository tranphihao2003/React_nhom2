const orders_class = require("../model/orders");
exports.getAllorderss = async (req, res) => {
  try {
    let orderss = await orders_class.getAllorderss();
    res.status(200).json(orderss);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getordersById = async (req, res) => {
  try {
    let orders = await orders_class.getordersById(req.params.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createorders = async (req, res) => {
  try {
    let orders = await orders_class.createorders(req.body);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateorders = async (req, res) => {
  try {
    let orders = await orders_class.updateorders(req.params.id, req.body);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteorders = async (req, res) => {
  try {
    let orders = await orders_class.deleteorders(req.params.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
