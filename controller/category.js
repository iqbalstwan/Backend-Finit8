const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const category = require("../model/category");

const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllCategory();
      client.set(
        `getcategory:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      return helper.response(response, 200, "Succes get Category", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        client.setex(`getcategorybyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(
          response,
          200,
          "Succes get Category By Id",
          result
        );
      } else {
        return helper.response(response, 404, "Not Found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  postCategory: async (request, response) => {
    try {
      const { category_name, category_status } = request.body;
      const setData = {
        category_name,
        category_status,
        category_created_at: new Date(),
      };
      const result = await postCategory(setData);
      return helper.response(response, 201, "Category Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  //patch
  patchCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const { category_name, category_status } = request.body;
      const setData = {
        category_name,
        category_status,
        category_update_at: new Date(),
      };
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id);
        return helper.response(response, 200, "Patch Done", result);
      } else {
        return helper.response(response, 404, "Not found", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteCategory(id);
      return helper.response(response, 200, "Delete Done", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
