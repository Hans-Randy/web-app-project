import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; validator
const { isEmail } = validator;
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });


// Create the user schema with the corresponding requirement
const userSchema = new mongoose.Schema({
  email: {  //Note that the first field is email not username
    type: String,
    required: [true, 'Pls enter an email'],
    unique: true, //Set to unique as each email or user login needs to be different
    lowercase: true,
    validate: {
      validator: isEmail,
      message: 'Pls enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Min length of password is 6']
  },
  firstName: {
    type: String,
    required: [true, 'Please enter first name ']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter last name ']
  },
  address: {
    type: String,
    required: [true, 'Please enter address'],
  }
})

// Set up the pre-save middleware to the User Schema  to hash the password before saving to database
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  // Generate a random salt
  this.password = await bcrypt.hash(this.password, salt);
  // Hash the password using the salt generated above
  next();

})

// To handle the user login
userSchema.statics.login =  async function(email, password)
{
  const user = await this.findOne({email});
  // Check if the user can be found
  if(user)
  {
    // if so, check the password using bcrypt.compare method
    const isAuth = await bcrypt.compare(password, user.password);

    // if it is successful validated, return the user or else return the error
    if(isAuth)
    {
      return user;
    }
    throw Error('Incorrect password')

  }
  else{
    throw Error('Incorrect email')
  }
}


const User = mongoose.model("User", userSchema);

export default User;
