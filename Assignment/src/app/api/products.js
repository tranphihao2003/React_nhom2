const products_class = require('../model/products')

exports.getAllproductss = async (req, res) => {
  try {
    
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)
    let productss = await products_class.getAllproducts(page, pageSize)
    res.status(200).json(productss)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getproductsById = async (req, res) => {
  try {
    let products = await products_class.getproductsById(req.params.id)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.Product_Image = req.file.path
    }
    let product = await products_class.createproducts(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
    res.status(500).json(error)
  }
}
exports.updateproducts = async (req, res) => {
  try {
    if (req.file) {
      req.body.Product_Image = req.file.path
    }
    let products = await products_class.updateproducts(req.params.id, req.body)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.changeStatus = async (req, res) => {
  try {
    let products = await products_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deleteproducts = async (req, res) => {
  try {
    let products = await products_class.deleteproducts(req.params.id)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.backdata = async (req, res) => {
  try {
    let products = await products_class.backdata()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}