const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fname: {
      type: String,
      //trim: true,
      required: "first name is required",
    },
    lname: {
      type: String,
      //trim: true,
      required: "last name is required",
    },
    //title: {
     // type: String,
     // enum: ["Mr", "Mrs", "Miss"],
   // },
    Designation: {
      type: String,
      required: true,
      //trim: true,
    },
    companyName: {
      type: String,
      required: true,
      //trim: true,
    },
    email: {
      type: String,
      required:true,
      unique: true,
      //trim:true,
    },
    password: {
      type: String,
      required: "password is required",
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      //trim: true,
    },
    WebsiteURL: {
      type: String,
      required: true,
      unique: true,
      //trim: true,
    },
    companyLogo: {
        type: String,
        //required: true,
        //trim: true,
  },
  socialURLs:{
    type: [String],
    
  },
},{ timestamps: true });
  


  
module.exports = mongoose.model("employee", employeeSchema);
