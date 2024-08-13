const customers_class = require("../model/customers");
exports.getAllcustomerss = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pageSize);

    let customers = await customers_class.getAllcustomerss(page, pageSize);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getAllCustomerAdd = async (req, res) => {
  try {
    let customers = await customers_class.getAllCustomerAdd()
    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getcustomersById = async (req, res) => {
  try {
    let customers = await customers_class.getcustomersById(req.params.id);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createcustomers = async (req, res) => {
  try {
    let customers = await customers_class.createcustomers(req.body);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updatecustomers = async (req, res) => {
  try {
    let customers = await customers_class.updatecustomers(
      req.params.id,
      req.body
    );
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deletecustomers = async (req, res) => {
  try {
    let customers = await customers_class.deletecustomers(req.params.id);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
};
