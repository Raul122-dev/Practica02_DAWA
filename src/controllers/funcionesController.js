const { 
    cupoModel, entidadModel 
} = require('../BD')
const { count } = require('../BD/modelos/entidadesModel')

module.exports = {
    MoverDinero: async (req, res) => {
        const { monto } = req.params
        const { cupoEmi, cupoRes } = req.body

        const cupResDinero = await cupoModel.findOne({ _id: { $eq: cupoRes }, } )
        const cupEmDinero = await cupoModel.findOne({ _id: { $eq: cupoEmi }, } )
        const montoSumado = parseInt(cupResDinero.dinero) + parseInt(monto)
        const montoRestado = parseInt(cupEmDinero.dinero) - parseInt(monto)
        if (montoRestado <= 0) {
            res.send(`No se puede realizar el movimiento ya que la cuenta, ${cupoEmi} no posee los suficeintes fondos`)
        }else{
            const cupoEmiUp = await cupoModel.findByIdAndUpdate(cupoEmi,{$set: { dinero : montoRestado }},
                { useFindAndModify: false });
            const cupoResUp = await cupoModel.findByIdAndUpdate(cupoRes,{$set: { dinero : montoSumado }},
                { useFindAndModify: false });    
    
            res.send(`Se movio ${monto} soles del cupo ${cupoEmi} hacia el cupo ${cupoRes}, y el cupo emisor tiene ${cupoEmiUp.dinero}, y el receptor ${cupoResUp.dinero}`)
        }
    },
    Abono: async (req, res) => {
        const { monto } = req.params
        const { cupo } = req.body

        const cupDinero = await cupoModel.findOne({ _id: { $eq: cupo }, } )
        const montoSumado = parseInt(cupDinero.dinero) + parseInt(monto)
        
        const cupoEmiUp = await cupoModel.findByIdAndUpdate(cupo,{$set: { dinero : montoSumado }},
            { useFindAndModify: false });

        res.json(`Se abono ${monto} al cupo ${cupoEmiUp.nro_cuenta}, dando total de ${montoSumado}`)
    },
    Desembolsar: async (req, res) => {
        const { monto } = req.params
        const { cupo } = req.body

        const cupDinero = await cupoModel.findOne({ _id: { $eq: cupo }, } )
        const montoRestado = parseInt(cupDinero.dinero) - parseInt(monto)
        if (montoRestado <= 0 ){
            res.send(`La cuenta no tienen saldo`)
        }else{
            const cupoEmiUp = await cupoModel.findByIdAndUpdate(cupo,{$set: { dinero : montoRestado }},
                { useFindAndModify: false });
    
            res.json(`Se desembolso ${monto} al cupo ${cupoEmiUp.nro_cuenta}, el cupo quedo con un total de ${montoRestado}`)
        } 
    },
    SaldoCuentas: async (req, res) => {
        const { _id } = req.params
        const DineroCuentas = await entidadModel.findOne({
            _id: { $eq: _id} 
        }, { _id:1, cupos: 1 })

        res.json(DineroCuentas)
    },
    SaldoTotal: async (req, res) => {
        const { _id } = req.params
        const entidad = await entidadModel.findOne({ _id: { $eq: _id }, } )
        const total =  entidad.cupos.map(cupo => {cupo.dinero + cupo.dinero})
        res.json(total)
    }   
}