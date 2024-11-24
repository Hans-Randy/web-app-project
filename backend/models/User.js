import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; validator
const { isEmail } = validator;
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

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

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();

})


userSchema.statics.login =  async function(email, password)
{
  const user = await this.findOne({email});
  if(user)
  {
    const isAuth = await bcrypt.compare(password, user.password);
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
