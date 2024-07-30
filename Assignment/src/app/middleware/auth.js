const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) return res.sendStatus(401) // Không có toke
  jwt.verify(token, 'Fihao2k3', (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403) // Token không hợp lệ
    req.user = user
    next() // Chuyển tiếp tới hàm xử lý tiếp theo
  })
}
module.exports = authenticateToken
