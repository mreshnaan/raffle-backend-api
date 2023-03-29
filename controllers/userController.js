const {
  bufferToHex,
  recoverPersonalSignature,
  jwtToken,
  configs,
  handler,
} = require("../helper/imports");
const { userModel } = require("../helper/importModels");

/**
 * This function handles the API call for show all user data
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const getAllUsers = async (req, res, next) => {
  try {
    let data = await userModel.find({});
    if (!data) {
      return handler(res, "Success", 200, [], "Users not found");
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

/**
 * This function handles the API call for user login
 * @param {express} req - req params ex:- id
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const getUserById = async (req, res, next) => {
  try {
    const userAddress = req.params.address;
    console.log("user address :", userAddress);
    // Retrieve the user data from Database
    let user = await userModel.findOne({ publicAddress: userAddress });

    if (!user) {
      return handler(res, "Failed", 501, null, "User not found");
    }
    return handler(
      res,
      "Success",
      200,
      user,
      "User Data Successfully Retrieved"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

/**
 * This function handles the API call for user login
 * @param {express} req - req headers ex:- jwt id
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const userProfile = async (req, res, next) => {
  try {
    let userAddress = req.jwt?.address;
    console.log("profile address :", userAddress);

    // Retrieve the user data from Database
    let user = await userModel.findOne({ publicAddress: userAddress });
    if (!user) {
      return handler(res, "Failed", 501, null, "User not found");
    }
    return handler(
      res,
      "Success",
      200,
      user,
      "User Data Successfully Retrieved"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

/**
 * This function handles the API call for user register
 * @param {express} req - req body ex:- publicAddress and name
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const register = async (req, res, next) => {
  try {
    let { publicAddress, name, email } = req.body;

    let user = await userModel.findOne({ publicAddress: publicAddress });
    if (user) {
      return handler(
        res,
        "Failed",
        501,
        null,
        `User with publicAddress ${publicAddress} is exists`
      );
    }
    let nonce = Date.now();

    let createUser = await new userModel({
      name: name,
      email: email,
      publicAddress: publicAddress,
      nonce: nonce,
    }).save();

    // Generate JWT token
    let token = jwtToken.sign(
      {
        //payload
        id: user.id,
        address: publicAddress,
      },
      //secreat or private key

      configs.secret,
      // token expire in 1 day
      //use algorithm
      { expiresIn: "1d", algorithm: "HS256" }
    );

    return handler(
      res,
      "Success",
      200,
      {
        ...createUser,
        accessToken: token,
      },
      "User Successfully Registered"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

/**
 * This function handles the API call for user login
 * @param {ILogin} req - req body
 * @param {express} res - express response
 * @return {express response<{status:string,data:{}, message: string}>}
 */

const walletLogin = async (req, res, next) => {
  try {
    const { signature, publicAddress } = req.body;
    console.log("signature --->", signature);
    console.log("publicAddress --->", publicAddress);
    if (!signature || !publicAddress) {
      return handler(
        res,
        "Failed",
        400,
        null,
        "signature and publicAddress is required"
      );
    }
    // Retrieve the user data from Database
    const user = await userModel.findOne({ publicAddress: publicAddress });
    //if user not exist
    //then create a new user

    // if (!user) {
    //   let nonce = Date.now();

    //   let createUser = await new userModel({
    //     publicAddress: publicAddress,
    //     nonce: nonce,
    //   }).save();

    // return handler(
    //   res,
    //   "Success",
    //   200,
    //   createUser,
    //   "User Data Successfully Register"
    // );
    // }

    // if user exists then verify user signature
    const signatureMessage = `nonce: ${user.nonce} address:${user.publicAddress}`;
    const msgBufferHex = bufferToHex(Buffer.from(signatureMessage));
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    console.log("address", address);

    //match stored address with address found after verifying signature
    if (address.toLowerCase() !== publicAddress.toLowerCase()) {
      return handler(res, "Failed", 501, null, "Signature verification failed");
    }
    //generate token
    let token = jwtToken.sign(
      {
        //payload
        id: user.id,
        address: publicAddress,
      },
      //secreat or private key

      configs.secret,
      // token expire in 1 day
      //use algorithm
      { expiresIn: "1d", algorithm: "HS256" }
    );
    return handler(
      res,
      "Failed",
      501,
      {
        ...user,
        accessToken: token,
      },
      "Login Success"
    );
  } catch (error) {
    return handler(res, "Failed", 400, null, error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  userProfile,
  register,
  walletLogin,
};
