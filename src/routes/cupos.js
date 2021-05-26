const express = require('express')
const router = express.Router()
const { getAll, createOne,
    deleteOne, updateOne, createOneUser } = require('../controllers/cuposController')


router.get('/', getAll)

router.put('/:_id', updateOne)

router.post('/', createOne)

//crear cupo al usuario
router.post('/usuario/:_id', createOneUser)

router.delete('/:_id', deleteOne)

module.exports = router