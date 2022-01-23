const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');

const Client = require("../models/client.model");

router.post('',body("first_name").isLength({ min: 1 , max: 25}).withMessage("Wirte your first name"),
body("last_name").isLength({ min: 1 , max: 25}).withMessage("Wirte your last name"),
body("phone_number").isLength({ min: 10 , max: 10}).withMessage("Wirte your phone number"),
body("work_email").isEmail().withMessage("Enter a valid email address"),
body("organization_name").isLength({ min: 1 , max: 25}).withMessage("Write your organization name"),
body("organization_size").isLength({ min: 1}).withMessage("Wirte your organization size"),
body("country").custom(async (value) => {
    const countryList = ["India", "USA", "singapore"]

    if(!countryList.includes(value)) {
        throw new Error("country should be either India, USA or signapore l");
    }
    return true;
}),
 async (req, res) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }    
        const client = await Client.create(req.body);
        res.redirect("http://127.0.0.1:5502/home.html");
        return res.status(201).send({ client });
    }catch(e){
        return res.status(500).send({ status: 'failed', message: e.message });
    }
})

module.exports = router;
