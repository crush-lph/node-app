const express = require('express')
const router = express.Router();
const Nurse = require('../../models/Nurse')


const passport = require('passport')

router.get('/test', (req, res) => {
  res.json({ msg: 'nurses works' })
})

module.exports = router