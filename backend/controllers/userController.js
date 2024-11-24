import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';

// User creation is handled in the Sign Up rather than here

// Get a single user by ID
export const getUserById = async (req, res, next) => {
    let user;
    // debugLog ('Params.ID is', req.params.id);
    try{
        user = await User.findById(req.params.id);
        // if the document of the ID cannot be found, return with error
        if (user == null) {
            return res.status(404).json({
                message: 'Cannot find the User',
                id: req.params.id
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.user = user; // This is to set so that the subquent middleware function can act on the found document.
    next();

}

// Get all users or subset of user by the query parameters of email
export const getAllUsers = async (req, res) => {
    let users;
    try {
        // debugLog("Model Name: ", Product.productModel.modelName);
        // debugLog("Number of documents: ", await Product.productModel.countDocuments().exec());

        // if a URL query is passed with email parameter, find the documents containing the search term.
        if (req.query.email != null) {
            // debugLog(`Email Parameter to search for: ${req.query.email}`)
            //remove the square bracket
            const query = req.query.email.replace(/[\[\]]/g,'')

            // search using the Mongoose $regex
            users = await User.find({ email: {$regex: query ,$options: 'i'} }).exec()
        } else {
            // No URL query is passed, all documents are returned
            // Get all Products
            // debugLog('No name parameter');
            users = await User.find();
        }

        res.status(200).json(users)
    } catch (err) {
        // debugLog('Something is wrong in the GET request', err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

// Add a new user
export const createUser = async (req, res) => {
    if (Array.isArray(req.body)) {
        return res.status(400).json(
            {message: 'Post can only handle one request at a time'}
        )
    }

    const requiredfields = ['email', 'password', 'firstName', 'lastName', 'address']
    for (const field of requiredfields) {
        if (req.body[field] == null) {
            console.log(`${field} is of value ${req.body[field]} in the request`);
            return res.status(400).json({message: 'Create User Failed due to missing fields.'})
        }
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    })
    try {
        // If adding the new user is successful, the document JSON is returned to the client
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.log('Something is wrong in the POST request', err.message);
        res.status(400).json({
            message: err.message
        })
    }
}

// Update the User but note that we retain the original value if the req field is empty
export const updateUser = async (req, res) => {
// Check all fields and  update only those fields which are not null
    const requiredfields = ['email', 'password', 'firstName', 'lastName', 'address']
    for (const field of requiredfields) {
        if (req.body[field] != null) {
            // debugLog(`${field} is of value ${req.body[field]} in the request`);
            res.user[field] = req.body[field]
        } else {
            // debugLog(`${field} is null in the request`);
            console.log(`${field} is null in the request`)
        }
    }
    // Proceeding to update the document in MongoDB
    try {
        const updatedUser = await res.user.save()
        res.status(201).json(updatedUser)
    } catch (err) {
        return res.status(400).json({message: err.message})

    }
    // res.status(201).send({ message: "Put request is processed" })
}

// Delete Single user
export const deleteUser = async (req, res) => {
    try {
        // await res.user.remove();
        await res.user.deleteOne();
        res.json({ message: `Document for ID ${req.params.id} is removed` })
    } catch (err) {
        res.status(500).json({ message: `Failed to remove document for ID ${req.params.id}` })
    }

}

// Delete All Users
export const deleteAllUsers = async (req, res) => {
    try {
        // await res.user.remove();
        await User.deleteMany();
        res.json({ message: `All users are  removed` })
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove all users' })
    }

}