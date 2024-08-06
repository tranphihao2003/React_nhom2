const genres_class = require('../model/genres')
exports.getAllgenress = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)
    let genress = await genres_class.getAllgenres(page, pageSize)
    res.status(200).json(genress)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getgenresById = async (req, res) => {
  try {
    let genres = await genres_class.getgenresById(req.params.id)
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.creategenres = async (req, res) => {
  try {
    let genres = await genres_class.creategenres(req.body)
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updategenres = async (req, res) => {
  try {
    let genres = await genres_class.updategenres(req.params.id, req.body)
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deletegenres = async (req, res) => {
  try {
    let genres = await genres_class.deletegenres(req.params.id)
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.backdata = async (req, res) => {
  try {
    let genres = await genres_class.backdata()
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.changeStatus = async (req, res) => {
  try {
    let genres = await genres_class.changeStatus(req.params.id, req.body.status)
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json(error)
  }
}
