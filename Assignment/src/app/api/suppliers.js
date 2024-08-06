const suppliers_class = require('../model/suppliers')
exports.getAllsupplierss = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)

    let supplierss = await suppliers_class.getAllsuppliers(page, pageSize)
    res.status(200).json(supplierss)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getsuppliersById = async (req, res) => {
  try {
    let suppliers = await suppliers_class.getsuppliersById(req.params.id)
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createsuppliers = async (req, res) => {
  try {
    let suppliers = await suppliers_class.createsuppliers(req.body)
    res.status(201).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updatesuppliers = async (req, res) => {
  try {
    let suppliers = await suppliers_class.updatesuppliers(req.params.id, req.body)
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deletesuppliers = async (req, res) => {
  try {
    let suppliers = await suppliers_class.deletesuppliers(req.params.id)
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.backdata = async (req, res) => {
  try {
    let suppliers = await suppliers_class.backdata()
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.changeStatus = async (req, res) => {
  try {
    let suppliers = await suppliers_class.changeStatus(req.params.id, req.body.status)
    res.status(201).json(suppliers)
  } catch (error) {
    res.status(500).json(error)
  }
}
