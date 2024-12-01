import Router from 'express';
const router = Router()
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import {createToken} from '../utils/utils.js';


// router.get('/signup', (req,res)=>res.render('signup'))

// Route to handle sign up / creation
router.post('/signup', async (req,res) => {
    try{
        // const {email, password} = req.body
        // const user = await User.create({email, password})

        // Get the JSON data from the request
        const {email, password, firstName, lastName, address} = req.body
        // Create the user in the Mongo DB using the User schema
        const user = await User.create({email, password, firstName, lastName, address})
        // Create the token and then stores in the cookie
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: false, maxAge: 3*24*60*60*1000}) // Token expires in 3 days
        res.status(200).json(user)

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

// Route to handle the login authentication
router.post('/login', async (req,res) => {
    try{
        console.log(req.body);
        // Extract the email and password from the request
        const {email, password} = req.body
        // Validate the user credential using the .login method defined in the schema
        const user = await User.login(email, password);
        // Create the token and stores in cookie if the user is validated
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: false, maxAge: 3*24*60*60*1000})

        res.status(200).json(res.getHeaders())

    }
    catch(ex)
    {
        console.log("Login Failure: " + ex)
        // Return the error in response if the user credential validation failed.
        res.status(401).json({ message: ex.toString() });
    }
})

// Route for sign-out or logout
router.post('/logout', (req, res) => {
    // Clear the JWT cookie by setting its expiration date to a past time
    res.cookie('jwt', '', { maxAge: 0, httpOnly: false }); // Deletes the cookie
    res.status(200).json({ message: 'Logged out successfully' });
});


// module.exports = router
export default router;