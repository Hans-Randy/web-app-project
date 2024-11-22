// const { Router } = require('express')
import Router from 'express';
const router = Router()
// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken';
// require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();
// const User = require('../models/user');
import User from '../models/User.js';
// const { createToken } = require('../utils/utils');
import {createToken} from '../utils/utils.js';
// const {createToken} = utils;



router.get('/signup', (req,res)=>res.render('signup'))

router.post('/signup', async (req,res) => {
    try{
        const {email, password} = req.body
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000}) // Token expires in 3 days
        res.status(201).json({user: user._id})

    }
    catch(ex)
    {
        res.status(500).json({ message: 'Internal server error' }); //To be modified to show the error
    }
})

// router.get("/login", (req,res)=>{res.render("login")}) // Login is handled by React Front-end

router.post('/login', async (req,res) => {
    try{
        console.log(req.body);
        const {email, password} = req.body
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
        res.status(201).json({user: user._id})
        console.log("It ends");
    }
    catch(ex)
    {

    }
})

// module.exports = router
export default router;