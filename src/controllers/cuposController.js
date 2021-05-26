const { 
    cupoModel, entidadModel 
} = require('../BD')

module.exports = {
    getAll: async (req, res) => {
        const cupos = await cupoModel.find();
        res.json(cupos);
    },
    createOne: async (req, res) => {
        const { nro_cuenta, dinero } = req.body
        const nuevoCupo = new cupoModel({ 
            nro_cuenta, 
            dinero,
        })
        await nuevoCupo.save()
        res.send(`${nuevoCupo.nro_cuenta} guardado`)
    },
    createOneUser: async (req, res) => {
        const { _id } = req.params
        const { nro_cuenta, dinero } = req.body
        const nuevoCupo = new cupoModel({ 
            nro_cuenta, 
            dinero,
        })
        await nuevoCupo.save()

        const entidadUpdate = await entidadModel.findByIdAndUpdate(
            _id,
            {
                $push: { cupos: nuevoCupo._id }
            },
            { useFindAndModify: false }
        )
        res.send(`${nuevoCupo.nro_cuenta} guardado en el usuario ${entidadUpdate._id}`)
    },
    updateOne: async (req, res) => {
        const { _id } = req.params
        const { nro_cuenta, dinero } = req.body
        const cuponUpdate = await cupoModel.findByIdAndUpdate(
            _id,
            { 
                $set: { nro_cuenta, dinero }
            },
            { useFindAndModify: false }
        );
        res.send(`${cuponUpdate.nro_cuenta} actualizado`)  
    },
    deleteOne: async (req, res) => {
        const { _id } = req.params;
        const cuponDelete = await cupoModel.findByIdAndDelete(_id)
        res.send(`${cuponDelete.nro_cuenta} eliminado`)
    },
    
}