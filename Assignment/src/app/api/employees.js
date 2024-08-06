const employees_class = require('../model/employees')
exports.getAllemployeess = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)

    let employeess = await employees_class.getAllemployees(page, pageSize)
    res.status(200).json(employeess)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getemployeesById = async (req, res) => {
  try {
    let employees = await employees_class.getemployeesById(req.params.id)
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createemployees = async (req, res) => {
  try {
    let employees = await employees_class.createemployees(req.body)
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updateemployees = async (req, res) => {
  try {
    let employees = await employees_class.updateemployees(req.params.id, req.body)
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deleteemployees = async (req, res) => {
  try {
    let employees = await employees_class.deleteemployees(req.params.id)
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}
