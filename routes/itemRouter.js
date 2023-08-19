const express = require('express')
const item = require('../controllers/itemController')

const router = express.Router()

router.post('/items', item.newItem)
router.get('/items', item.filterItems)
router.get('/items/:id', item.addItem)
router.delete('/items/:id', item.deleteItem)

module.exports = router
