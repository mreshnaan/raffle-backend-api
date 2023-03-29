const { jwtToken } = require("../helper/imports");
const configs = require("../configs/server");

/**
 * This function handles the API call for authorization
 * @param {IAuth} req - req jwt
 * @param {express} res - express response
 * @param {express} next - express next function
 * @return {express response<{status:string,data:{}, message: string}>}
 */

async function authChecker(req, res, next) {
  try {
    //check if the token exitst throw error
    if (!req.headers.authorization) {
      return res.status(500).send({
        status: "Failed",
        message: "You are not Authorized or Missing token",
      });
    }
    const token = req.headers.authorization.split("Bearer")[1].trim();
    //decode the token
    const decodeToken = jwtToken.decode(token, configs.secret);
    //check if the decoded token exitst
    // if its a null throw error
    if (decodeToken == null) {
      return res.status(500).send({
        status: "Failed",
        message: "Missing token",
      });
    }
    console.log("decodeToken-->", decodeToken);
    //decoded token
    req.jwt = decodeToken;

    //request values
    //id,email,password
    //ex-req.jwt{id:int,email:string,password:string}

    return next();
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      status: "Failed",
      data: "Invalid Token",
      message: error.message,
    });
  }
}

module.exports = authChecker;
