const express = require('express')
const router = express.Router()
const multer = require('multer')
const products = require('../../app/api/products')
const authenticateToken = require('../../app/middleware/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })
router.get('/', authenticateToken, products.getAllproductss)
router.get('/:id', authenticateToken, products.getproductsById)
router.post('/', authenticateToken, upload.single('Product_Image'), products.createProduct)
router.put('/:id', authenticateToken, upload.single('Product_Image'), products.updateproducts)
router.get('/backdata/all', authenticateToken, products.backdata) // Change to GET
router.put('/backdata/:id', authenticateToken, products.changeStatus) // Restore product
router.put('/stop/:id', authenticateToken, products.changeStatus) // Temporarily stop product
router.delete('/:id', authenticateToken, products.deleteproducts) // Delete product

module.exports = router
