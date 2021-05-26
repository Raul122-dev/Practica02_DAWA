const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
    {
        nro_cuenta: {  type: String, required: true},
        dinero: { type: Number, required: true}
    }
)

//schema.plugin(require('mongoose-autopopulate'))

const model = mongoose.model('cupos', schema)
module.exports = model