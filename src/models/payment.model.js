const { Schema, model } = require("mongoose");
const paymentSchema = new Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      credit_card_number: { type: Number, required: true},
      expiry_date: { type: String, required: true},
      security_code : { type: Number,required: true},
      country : { type: String, required: true},
      postal_code : { type: Number, required: true},
      GST : { type: Number, required: true},
     
     
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = model("payment",  paymentSchema);
  