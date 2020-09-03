const bcrypt = require("bcrypt");
const helper = require("../helper/indexhlp");
const jwt = require("jsonwebtoken");
const { postUser, checkUser } = require("../model/user");

module.exports = {
  registerUser: async (request, response) => {
    console.log(request.body);
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(8); //(8)berapa kali password diacak
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    // console.log("user password =" + user_password);
    // console.log("encrypt password =" + encryptPassword);
    //kondisi jika email sama tidak bisa
    // if (user_email ) {

    // } else {

    // }
    const setData = {
      // user_email : user_email karena sama namanya
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: 2,
      user_created_at: new Date(),
      user_status: 0,
    };
    try {
      const result = await postUser(setData);
      return helper.response(response, 200, "Success Register User", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
    // console.log(setData);
  },
  loginUser: async (request, response) => {
    const { user_email, user_password } = request.body;
    // console.log(user_email);
    const checkDataUser = await checkUser(user_email);
    // console.log(checkDataUser);
    if (checkDataUser.length >= 1) {
      // proses 2
      const checkPassword = bcrypt.compareSync(
        user_password,
        checkDataUser[0].user_password
      ); //[0] indeks ke 0
      if (checkPassword) {
        //   proses 3
        const {
          user_id,
          user_email,
          user_name,
          user_role,
          user_status,
        } = checkDataUser[0];
        let payload = {
          user_id,
          user_email,
          user_name,
          user_role,
          user_status,
        };
        const token = jwt.sign(payload, "Secret", { expiresIn: "24h" });
        payload = { ...payload, token };
        return helper.response(response, 200, "Success Login", payload);
      } else {
        return helper.response(response, 400, "Wrong Pass");
      }
    } else {
      return helper.response(response, 400, "Email/Account not Registered");
    }
  },
};
