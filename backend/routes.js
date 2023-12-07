const express = require('express');
const router = express.Router()
const controllers = require('./controllers')

router.post('/products', controllers.createProduct)
router.get('/products', controllers.getAllProducts)
router.get('/products/:productId', controllers.getOneProduct)
router.delete('/products/:productId', controllers.deleteProduct)
router.put('/products/:productId', controllers.updateProduct)


module.exports = router;
