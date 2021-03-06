const bcrypt = require("bcrypt");
const helper = require("../helper/indexhlp");
const jwt = require("jsonwebtoken");
const {
  postUser,
  checkUser,
  getAllUser,
  getUserById,
  patchUser,
  deleteUser,
} = require("../model/user");

const redis = require("redis");
const client = redis.createClient();

module.exports = {
  registerUser: async (request, response) => {
    console.log(request.body);
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(8); //(8)berapa kali password diacak
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const checkEmail = await checkUser(user_email);
    if (checkEmail.length > 0) {
      return helper.response(response, 400, "Your email is already taken");
    } else {
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
        if (user_password.length < 8) {
          return helper.response(response, 400, "Minimum Eight Characters");
        } else if (!user_email.match("@")) {
          return helper.response(response, 400, "Invalid,Missing Character.");
        } else if (user_email === "") {
          return helper.response(response, 400, "Input Email,Please");
        } else if (user_name === "") {
          return helper.response(response, 400, "Input Username,Please");
        } else {
          const result = await postUser(setData);
          return helper.response(
            response,
            200,
            "Success Register User",
            result
          );
        }
      } catch (error) {
        return helper.response(response, 400, "Bad Request");
      }
    }
    // console.log(setData);
  },
  loginUser: async (request, response) => {
    const { user_email, user_password } = request.body;
    const checkDataUser = await checkUser(user_email);
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
        const token = jwt.sign(payload, "Secret", { expiresIn: "2h" });
        payload = { ...payload, token };
        return helper.response(response, 200, "Success Login", payload);
      } else {
        return helper.response(response, 400, "Wrong Pass");
      }
    } else {
      return helper.response(response, 400, "Email/Account not Registered");
    }
  },
  getAllUser: async (request, response) => {
    try {
      const result = await getAllUser();
      client.set(
        `getuser:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      return helper.response(response, 200, "Succes get User", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getUserById(id);
      if (result.length > 0) {
        client.setex(`getuserbyid:${id}`, 1800, JSON.stringify(result));
        return helper.response(response, 200, "Succes get User By Id", result);
      } else {
        return helper.response(response, 404, "Not Found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchUser: async (request, response) => {
    try {
      const salt = bcrypt.genSaltSync(8);
      const encryptPassword = bcrypt.hashSync(request.body.user_password, salt);
      const { id } = request.params;
      const { user_email, user_status } = request.body;
      const setData = {
        user_email,
        user_password: encryptPassword,
        user_updated_at: new Date(),
        user_status,
      };
      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        const result = await patchUser(setData, id);
        return helper.response(response, 200, "User Updated", result);
      } else {
        return helper.response(response, 404, `Data with id:${id}, not found`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  deleteUser: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteUser(id);
      return helper.response(response, 200, "Delete Done", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
