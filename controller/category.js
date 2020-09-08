const {
  getAllCategory,
  getCategoryCount,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const qs = require("querystring");

const redis = require("redis");
const client = redis.createClient();

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultPrevLink);
    // console.log(qs.stringify(resultPrevLink)) //qs.stringify mengeluarkan object menjadi string
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultNextLink);
    // console.log(qs.stringify(resultPrevLink)) //qs.stringify mengeluarkan object menjadi string
  } else {
    return null;
  }
};
module.exports = {
  getAllCategory: async (request, response) => {
    let { page, limit, search, sort } = request.query;

    if (search === undefined || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
    }
    if (sort === undefined || sort === "") {
      sort = `category_id`;
    }
    if (page === undefined || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === "") {
      limit = parseInt(5);
    } else {
      limit = parseInt(limit);
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getCategoryCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page, //page : page
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/category? ${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/category? ${nextLink}`,
    };
    try {
      const result = await getAllCategory(search, sort, limit, offset);
      if (result.length > 0) {
        const newResult = {
          data: result,
          page: pageInfo,
        };
        client.set(
          `getcategory:${JSON.stringify(request.query)}`,
          JSON.stringify(newResult)
        );
        // console.log(result);
        return helper.response(
          response,
          200,
          "Succes get category",
          result,
          pageInfo
        );
      } else {
        return helper.response(
          response,
          404,
          "Category not found",
          result,
          pageInfo
        );
      }
    } catch (error) {
      // return helper.response(response, 400, "Bad Request", error);
      console.log(error);
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
      if (setData.category_name === "") {
        return helper.response(response, 404, ` Input Category Name!`);
      } else if (setData.category_status === "") {
        return helper.response(response, 404, ` Input Category Status!`);
      } else {
        const result = await postCategory(setData);
        return helper.response(response, 201, "Category Created", result);
      }
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
      if (setData.category_name === "") {
        return helper.response(response, 404, ` Input Category Name!`);
      } else if (setData.category_status === "") {
        return helper.response(response, 404, ` Input Category Status!`);
      } else {
        const checkId = await getCategoryById(id);
        if (checkId.length > 0) {
          const result = await patchCategory(setData, id);
          return helper.response(response, 200, "Patch Done", result);
        } else {
          return helper.response(response, 404, "Not found", result);
        }
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
