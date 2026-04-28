// import mongoose from 'mongoose'

// const userSchema = new mongoose.Schema({
//     name:{type:String, required:true},
//     email:{type:String, required:true, unique:true},
//     password:{type:String, required:true},
//     cartData:{type:Object,default:{}}

// }, {minimize:false})

// const userModel = mongoose.model.user || mongoose.model("user", userSchema);

// export default userModel;

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  cartData: { type: Object, default: {} },
  addresses: [addressSchema],
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
