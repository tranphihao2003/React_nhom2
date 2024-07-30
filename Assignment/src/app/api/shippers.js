const shippers_class = require("../model/shippers");
exports.getAllshipperss = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pageSize);

    let shipperss = await shippers_class.getAllshippers(page, pageSize);
    res.status(200).json(shipperss);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getshippersById = async (req, res) => {
  try {
    let shippers = await shippers_class.getshippersById(req.params.id);
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createshippers = async (req, res) => {
  try {
    let shippers = await shippers_class.createshippers(req.body);
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateshippers = async (req, res) => {
  try {
    let shippers = await shippers_class.updateshippers(req.params.id, req.body);
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteshippers = async (req, res) => {
  try {
    let shippers = await shippers_class.deleteshippers(req.params.id);
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.backdata = async (req, res) => {
  try {
    let shippers = await shippers_class.backdata()
    res.status(200).json(shippers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.changeStatus = async (req, res) => {
  try {
    let shippers = await shippers_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(shippers)
  } catch (error) {
    res.status(500).json(error)
  }
}