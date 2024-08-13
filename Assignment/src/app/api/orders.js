const orders_class = require('../model/orders')
exports.getAllorderss = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)

    let orderss = await orders_class.getAllorders(page, pageSize)
    res.status(200).json(orderss)
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
exports.thongkebyemployee = async (req, res) => {
  try {
    let { id, month, year } = req.body
    let orders = await orders_class.thongkebyemployee(id, month, year)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.thongkebyid = async (req, res) => {
  try {
    let { id, month, year, storeId } = req.body

    let orders = await orders_class.thongkebyid(id, storeId, year, month)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.thongke = async (req, res) => {
  try {
    let { storeId, day, month, year } = req.body
    console.log(storeId, day, month, year)

    let orders = await orders_class.thongke(storeId, day, month, year)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}
