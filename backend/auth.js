const jwt = require('jsonwebtoken')

const checkAuthenticated = (req, res, next) => {
  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403)
    }
    if (!user) return res.status(403)
    console.log("in validate", user)

    return res.status(200).json({valid: true})
  })
};

module.exports = checkAuthenticated