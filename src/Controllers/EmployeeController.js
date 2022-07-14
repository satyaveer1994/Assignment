const employeeModel = require("../Model/EmployeeModel");
const aws = require("../S3/aws");

const isValid = function (value) {
  if (typeof value === undefined || typeof value === null) {
    return false;
  }
  if (typeof value.trim().length == 0) {
    return false;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return true;
  }
};
let validateEmail = function (Email) {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email);
};

let validatemobile = function (mobile) {
  return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile);
};

/////////////////////////////////////////post api//////////////////////////////////

const employeeData = async function (req, res) {
  try {
    let data = req.body;
    let logo = req.files;
    if (Object.keys(data) == 0)
      return res
        .status(400)
        .send({ status: false, msg: "BAD REQUEST NO DATA PROVIDED" });

    const {
      fname,
      lname,
      title,
      email,
      mobile,
      password,
      Designation,
      companyName,
      WebsiteURL,
      socialURLs,
      companyLogo,
    } = data;

    if (!isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, msg: "First name is required" });
    }

    if (!isValid(lname)) {
      return res
        .status(400)
        .send({ status: false, msg: "Last name is required" });
    }

    if (!isValid(title)) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }

    if (!isValid(email)) {
      return res.status(400).send({ status: false, msg: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid email" });
    }

    let uniqueEmail = await employeeModel.findOne({ email });

    if (uniqueEmail) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already in use" });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Password is required" });
    }

    if (!isValid(mobile)) {
      return res.status(400).send({ status: false, msg: "mobile is required" });
    }
    if (!validatemobile(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid mobile" });
    }
    let uniquemobile = await employeeModel.findOne({ mobile });

    if (uniquemobile) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile Number is already in use" });
    }
    if (!isValid(Designation)) {
      return res
        .status(400)
        .send({ status: false, msg: "Designation is required" });
    }
    if (!isValid(companyName)) {
      return res
        .status(400)
        .send({ status: false, msg: "companyName is required" });
    }
    if (!isValid(WebsiteURL)) {
      return res
        .status(400)
        .send({ status: false, msg: "WebsiteURL is required" });
    }

    if (!isValid(socialURLs)) {
      return res
        .status(400)
        .send({ status: false, msg: "socialURLs is required" });
    }

    


    let files = req.files
        if (files && files.length > 0) {
            var uploadedFileURL = await aws.uploadFile(files[0])
            data['companyLogo'] = uploadedFileURL
        }
        else {
            return res.status(400).send({ status: false, message: "profileImage is required" })
        }

    
    let saveemployeeDetail = await employeeModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: saveemployeeDetail });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/////////////////////////////////////////////////////////

const getEmployeeDetail = async function (req, res) {
  try {
    let employeeId = req.params.Id;

    let idCheck = await employeeModel.findById(employeeId);
    

    console.log(idCheck)
    if (!idCheck) {
      return res
        .status(404)
        .send({ status: false, msg: "Not found employee Details" });
    }
    return res.status(200).send({status:true,message:"successful",data: idCheck})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { employeeData, getEmployeeDetail };
