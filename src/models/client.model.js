const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    first_name:{ type: String, required: true},
    last_name:{ type: String, required: true},
    phone_number:{ type: Number, required: false},
    work_email:{ type: String, required: true},
    organization_name:{ type: String, required: true},
    organization_size:{ type: Number, required: false},
    country:{ type: String, required: false}
},
{
    versionKey: false,
    timestamps: true,
}
);

module.exports = model("client", clientSchema);
