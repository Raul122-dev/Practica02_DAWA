const { 
     entidadModel 
} = require('../BD')

module.exports = {
    getAll: async (req, res) => {
        const entidades = await entidadModel.find();
        res.json(entidades)
    },
    createOne: async (req, res) => {
        const { nombre, dni, cupos } = req.body;
        const nuevaEntidad = new entidadModel({ nombre, dni, cupos });
        await nuevaEntidad.save();
        res.send(`${nombre} saved`);
    },
    updateOne: async (req, res) => {
        const { _id } = req.params;
        const { nombre } = req.body;
        const { dni } = req.body;

        await entidadModel.findByIdAndUpdate(
            _id,
            {
               $set: { nombre, dni } 
            },
            { useFindAndModify: false }
        )
        res.send(`${nombre} updated`)
    },
    deleteOne: async (req, res) => {
        const { _id } = req.params;
        const removed = await entidadModel.findByIdAndDelete(_id)
        console.log(`${removed.name} deleted from database`)
    },
    asignarCupo: async (req, res) => {
        const { _id } = req.params;
        const { cupos } = req.body;
        const entidadUpdate = await entidadModel.findByIdAndUpdate(
            _id,
            {
                $push: { cupos: cupos }
            },
            { useFindAndModify: false }
        )
        res.send(`${entidadUpdate.nombre} update`)
    } 
};

