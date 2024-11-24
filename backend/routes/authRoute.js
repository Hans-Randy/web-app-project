import Router from 'express';
const router = Router()
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import {createToken} from '../utils/utils.js';


// router.get('/signup', (req,res)=>res.render('signup'))

router.post('/signup', async (req,res) => {
    try{
        // const {email, password} = req.body
        // const user = await User.create({email, password})
        const {email, password, firstName, lastName, address} = req.body
        const user = await User.create({email, password, firstName, lastName, address})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000}) // Token expires in 3 days
        res.status(201).json({user: user._id})

    }
    catch(ex)
    {
        console.log(ex);
        if (ex.code == 11000 ) {
            res.status(409).json({ message: 'Email already exists' }); //Return the error of duplicate email
        } else if (ex._message == "User validation failed") {
        res.status(400).json({ message: 'Sign Up Failed. ' + ex.message}); //Return the DB error to client
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
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
        console.log("Login Failure: " + ex)
        res.status(401).json({ message: ex.toString() });
    }
})

// Route for sign-out or logout
router.post('/logout', (req, res) => {
    // Clear the JWT cookie by setting its expiration date to a past time
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true }); // Deletes the cookie
    res.status(200).json({ message: 'Logged out successfully' });
});


// module.exports = router
export default router;