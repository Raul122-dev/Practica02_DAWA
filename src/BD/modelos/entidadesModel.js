const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
    {
        nombre : { type: String, require: true },
        dni : { type: Number, require: true},
        cupos: [{ type: Schema.Types.ObjectId, ref: 'cupos', autopopulate: true}]   
    }
)

schema.plugin(require('mongoose-autopopulate'))

const model = mongoose.model('entidades', schema)
module.exports = model