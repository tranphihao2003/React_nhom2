const order_details_class = require('../model/order_details')
exports.getAllorder_detailss = async (req, res) => {
  try {
    let order_detailss = await order_details_class.getAllorder_detailss()
    res.status(200).json(order_detailss)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getorder_detailsById = async (req, res) => {
  try {
    let order_details = await order_details_class.getorder_detailsById(req.params.id)
    res.status(200).json(order_details)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createorder_details = async (req, res) => {
  try {
    let order_details = await order_details_class.createorder_details(req.body)
    res.status(200).json(order_details)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updateorder_details = async (req, res) => {
  try {
    let order_details = await order_details_class.updateorder_details(req.params.id, req.body)
    res.status(200).json(order_details)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deleteorder_details = async (req, res) => {
  try {
    let order_details = await order_details_class.deleteorder_details(req.params.id)
    res.status(200).json(order_details)
  } catch (error) {
    res.status(500).json(error)
  }
}
