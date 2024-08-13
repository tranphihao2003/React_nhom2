const store_products_class = require('../model/store_products')

exports.getAllstore_products = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)

    let store_productss = await store_products_class.getAllstore_products(page, pageSize)
    res.status(200).json(store_productss)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getstore_productsById = async (req, res) => {
  try {
    let store_products = await store_products_class.getstore_productsById(
      req.params.id
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getStore_product_ByID = async (req, res) => {
  try {
    let store_products = await store_products_class.getStore_product_ByID(req.params.id)
    res.status(200).json(store_products)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getProductBy_ID = async (req, res) => {
  try {
    const { store_id, product_id } = req.query;

    if (!store_id || !product_id) {
      return res.status(400).json({ error: 'store_id và product_id là bắt buộc' });
    }

   

    let store_products = await store_products_class.getProductBy_ID(store_id, product_id);

    console.log('store_products:', store_products);

    if (!store_products) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json(store_products);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm: ', error)
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy sản phẩm' })
  }
};

// exports.getstore_productsById = async (req, res) => {
//   try {
//     let store_products = await store_products_class.getstore_productsById(req.params.id)
//     res.status(200).json(store_products)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// };
exports.createstore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.createstore_products(
      req.body
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updatestore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.updatestore_products(
      req.params.id,
      req.body
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deletestore_products = async (req, res) => {
  try {
    let store_products = await store_products_class.deletestore_products(
      req.params.id
    );
    res.status(200).json(store_products);
  } catch (error) {
    res.status(500).json(error)
  }
};
exports.backdata = async (req, res) => {
  try {

    let stores = await store_products_class.backdata()
    res.status(200).json(stores)
  } catch (error) {
    res.status(500).json(error)
  }

};
exports.changeStatus = async (req, res) => {
  try {
  
    let stores = await store_products_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(stores)
  } catch (error) {
    res.status(500).json(error)
  }
}
