const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send("Notes")
})

router.post('/', async (req, res) => {
  res.send("Notes")
})

module.exports = router