// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// require('dotenv').config();

import jwt from 'jsonwebtoken';
import user from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();


const createToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 3 * 24 * 60 * 60} ); // Token expires in 3 days
}

const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt;
   console.log(token); // Debugging
   if(token)
   {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
         if(err)
         {
            console.log("Invalid Token: " + err.message)
            // return res.status(401).json({ message: 'Unauthorized' });
            return res.status(401).json({ message: "Invalid Token: " + err.message });
            // Respond with 401 Unauthorized for Front-End to handle the login page
         }
         else
         {
            console.log("Decoded Token:" + decodedToken)
            next()
         }

      })

   }
   else{
      console.log("token undefined")
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
      //No token found, respond with 401 Unauthorized for Front-End to handle the login page
   }
}

// module.exports = { createToken, requireAuth}
export {createToken, requireAuth};