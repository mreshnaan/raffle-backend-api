const { jwtToken, bcrypt, handler } = require("../helper/imports");
const { adminModel } = require("../helper/importModels");

/**
 * This function handles the API call for show all user data
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const getAllAdminUsers = async (req, res, next) => {
  try {
    let data = await adminModel.find({}).select({ password: 0 });
    if (!data) {
      return handler(res, "Success", 200, [], "No admins found");
    }
    return handler(
      res,
      "Success",
      200,
      data,
      "User Data Successfully Retrieved"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

const getAdminUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Retrieve the user data from Database
    let user = await adminModel.findById({ id: id });

    if (!user) {
      return handler(res, "Failed", 501, null, "User not found");
    }
    return handler(
      res,
      "Success",
      200,
      {
        name: user.name,
        email: user.email,
      },
      "User Data Successfully Retrieved"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

const adminProfile = async (req, res, next) => {
  try {
    const id = req.jwt?.id;
    console.log("profile user id :", id);

    // Retrieve the user data from Database
    let user = await adminModel.findById({ id: id });
    if (!user) {
      return handler(res, "Failed", 501, null, "User not found");
    }
    return handler(
      res,
      "Success",
      200,
      {
        name: user.name,
        email: user.email,
      },
      "User Data Successfully Retrieved"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

/**
 * This function handles the API call for user login
 * @param {express} req - req body ex:- email and password
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user data from the Database
    let user = await adminModel.findOne({ email: email });

    if (!user) {
      return handler(res, "Failed", 501, null, "Invalid email");
    }

    // Check if the password is correct
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return handler(res, "Failed", 501, null, "Invalid password");
    }

    // Generate JWT token
    let token = jwtToken.sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtConfig.secretKey,
      { expiresIn: "1d" }
    );

    return handler(
      res,
      "Success",
      200,
      {
        name: user.name,
        email: user.email,
        token,
      },
      "User Successfully Login"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

/**
 * This function handles the API call for user register
 * @param {express} req - req body ex:- name, email and password
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */
const adminRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists in the database
    // Retrieve the user data from the Database
    // Retrieve the user data from the Database
    let user = await adminModel.findOne({ email: email });

    if (user) {
      return handler(res, "Failed", 501, null, "User Already Exists");
    }
    const hashpass = await bcrypt.hash(password, 10);

    // Save the user data to  Database
    let newUser = await new adminModel({
      name: name,
      email: email,
      password: hashpass,
    }).save();

    // Generate JWT token
    let token = jwtToken.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      jwtConfig.secretKey,
      { expiresIn: "1d" }
    );

    return handler(
      res,
      "Success",
      201,
      { ...newUser, token: token },
      "User Successfully Registered"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

module.exports = {
  getAllAdminUsers,
  getAdminUserById,
  adminProfile,
  adminLogin,
  adminRegister,
};
