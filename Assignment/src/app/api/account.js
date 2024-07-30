const account_class = require('../model/account')
const jwt = require('jsonwebtoken')
exports.getAllaccounts = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)
    let accounts = await account_class.getAllaccounts(page, pageSize)
    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.getAccountById = async (req, res) => {
  try {
    let account = await account_class.getAccountById(req.params.id)
    res.status(200).json(account)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.createAccount = async (req, res) => {
  try {
    let account = await account_class.createAccount(req.body)
    res.status(200).json(account)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.updateAccount = async (req, res) => {
  try {
    let account = await account_class.updateAccount(req.params.id, req.body)
    res.status(200).json(account)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deleteAccount = async (req, res) => {
  try {
    let account = await account_class.deleteAccount(req.params.id)
    res.status(200).json(account)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.login = async (req, res) => {
  const { username, password } = req.body
  const account = await account_class.login(username, password)
  console.log(account[0])
  if (account.length > 0) {
    const token = jwt.sign(
      {
        username: account[0].Username,
        id: account[0].Account_ID,
        role: account[0].Position,
        Employee_ID: account[0].Employee_ID,
      },
      'Fihao2k3', // secret key should be in .env file
      { expiresIn: '1h' },
    )
    res.status(200).json({
      token: token,
      account: {
        Employee_ID: account[0].Employee_ID,
        Account_ID: account[0].Account_ID,
        Username: account[0].Username,
        role: account[0].Position,
      },
    })
  } else {
    res.status(401).json({ message: 'đăng nhập thất bại' })
  }
}
exports.verify = async (req, res) => {
  res.status(200).json({ message: 'verify success',
    user: req.user
   })
}