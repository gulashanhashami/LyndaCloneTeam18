const express = require("express");                                                   //import express

const { body, validationResult } = require("express-validator");                       // import express-validator

const { formatErrors } = require("../utils/validations");



const router = express.Router();

const Payment = require("../models/payment.model");

router.post(                                                                                 //post req with validation
    "",
    body("first_name")
      .isLength({ min: 3 })
      .withMessage(" first name is required and must be at least 3 characters"),
  
    body("last_name")
      .isLength({ min: 3 })
      .withMessage(" last name is required and must be at least 3 characters"),
      
      body("credit_card_number")
      .isLength({ min: 14 , max: 14 })
      .withMessage("card number is required and must be at least 14 characters"),
      
      body("expiry_date")
      .isLength({ min: 5, max: 10 })
      .withMessage("Expiry date is required and must be at least 5 characters"),
      
      body("security_code")
      .isLength({ min: 4, max: 4 })
      .withMessage("security code is required and must be at least 4 characters"),
      
      body("country")
      .isLength({ min: 3 })
      .withMessage("country is required and must be at least 3 characters"),
      
      body("postal_code")
    .isLength({ min: 6 , max: 6 })
    .withMessage("postal code is required and must be at least 6 characters"),

    body("GST")
    .isLength({ min: 3 })
    .withMessage("GST is required and must be at least 3 characters"),

    
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const payment = await Payment.create(req.body);
      
      res.redirect("http://127.0.0.1:5502/home.html");
      return res.send({ payment });
      
    }catch(err)  {

    return res.status(500).send(err)

    }

  });
  


 
module.exports = router;
