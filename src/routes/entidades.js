const express = require('express')
const router = express.Router()
const { 
    createOne,
    getAll,
    updateOne,
    deleteOne, 
    asignarCupo  } = require('../controllers/entidadesController')

router.get('/', getAll)

router.put('/:id', updateOne)

router.post('/', createOne)

router.put('/asignarCupo/:_id', asignarCupo)

router.delete('/:_id', deleteOne)


module.exports = router