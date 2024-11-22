// const express = require('express');
import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
    // To send a JSON object back to the client
    console.log("Hello World!");
    res.status(200).send({message: "Welcome to the eCommerce application after successful login !!"})
})

// module.exports = router;
export default router;