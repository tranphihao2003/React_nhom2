const stores_class = require("../model/stores");
exports.getAllstoress = async (req, res) => {
  try {

    let page = Number(req.query.page);
    let pageSize = Number(req.query.pageSize);
    console.log(page, pageSize);
    let storess = await stores_class.getAllstores(page, pageSize);
    res.status(200).json(storess);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getstoresById = async (req, res) => {
  try {
    let stores = await stores_class.getstoresById(req.params.id);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createstores = async (req, res) => {
  try {
    let stores = await stores_class.createstores(req.body);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updatestores = async (req, res) => {
  try {
    let stores = await stores_class.updatestores(req.params.id, req.body);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deletestores = async (req, res) => {
  try {
    let stores = await stores_class.deletestores(req.params.id);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.backdata = async (req, res) => {
  try {

    let stores = await stores_class.backdata()
    res.status(200).json(stores)
  } catch (error) {
    res.status(500).json(error)
  }

};
exports.changeStatus = async (req, res) => {
  try {
    let stores = await stores_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(stores)
  } catch (error) {
    res.status(500).json(error)
  }
}
