const express = require('express')
const router = express.Router()
const { Abono, MoverDinero, Desembolsar, SaldoCuentas, SaldoTotal } = require('../controllers/funcionesController')

router.put('/abonar/:monto', Abono)

router.put('/desembolsar/:monto', Desembolsar)

router.put('/moverDinero/:monto', MoverDinero)

router.get('/obtenerSaldoCuentas/:_id', SaldoCuentas)

router.get('/obtenerSaldoTotal/:_id', SaldoTotal)

module.exports = router