const orders_class = require('../model/orders')

exports.getAllorders = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)

    let orders = await orders_class.getAllorders(page, pageSize)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getordersById = async (req, res) => {
  try {
    let orders = await orders_class.getordersById(req.params.id)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createorders = async (req, res) => {
  try {
    let orders = await orders_class.createorders(req.body)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updateorders = async (req, res) => {
  try {
    let orders = await orders_class.updateorders(req.params.id, req.body)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deleteorders = async (req, res) => {
  try {
    let orders = await orders_class.deleteorders(req.params.id)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.backdata = async (req, res) => {
  try {
    let orders = await orders_class.backdata()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.changeStatus = async (req, res) => {
  try {
    let orders = await orders_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
