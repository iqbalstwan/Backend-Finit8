const {
  getAllHistory,
  getHistoryCount,
  getHistoryById,
  getHistoryDay,
  getHistoryWeek,
  getHistoryYears,
  getChart,
  getRecentOrder,
  postHistory,
  patchHistory,
} = require("../model/history");
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const { getOrderByHistory } = require("../model/order");
const history = require("../model/history");
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
  getAllHistory: async (request, response) => {
    let { page, limit, search, sort } = request.query;

    if (search === undefined || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
    }
    if (sort === undefined || sort === "") {
      sort = `history_id`;
    }
    if (page === undefined || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === "") {
      limit = parseInt(9);
    } else {
      limit = parseInt(limit);
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getHistoryCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page, //page : page
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/history? ${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/history? ${nextLink}`,
    };
    try {
      const result = await getAllHistory(search, sort, limit, offset);
      if (result.length > 0) {
        const newResult = {
          data: result,
          page: pageInfo,
        };
        client.set(
          `gethistory:${JSON.stringify(request.query)}`,
          JSON.stringify(newResult)
        );
        for (let i = 0; i < result.length; i++) {
          result[i].orders = await getOrderByHistory(result[i].history_id);
          return helper.response(
            response,
            200,
            "Success get History",
            result,
            pageInfo
          );
        }
      } else {
        return helper.response(
          response,
          404,
          "History not found",
          result,
          pageInfo
        );
      }
    } catch (error) {
      console.log(error);
      // return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (request, response) => {
    try {
      //    const id = request.params.id
      //sama aja
      const { id } = request.params;
      let result = await getHistoryById(id);
      client.setex(`gethistorybyid:${id}`, 3600, JSON.stringify(result));
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistory(result[i].history_id);
      }
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success get History By Id",
          result
        );
      } else {
        return helper.response(response, 404, "Not Found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryDay: async (request, response) => {
    try {
      // console.log(`getDay`);
      const result = await getHistoryDay();
      return helper.response(response, 200, "Succes Get History", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryWeek: async (request, response) => {
    try {
      const result = await getHistoryWeek();
      return helper.response(response, 200, "Succes Get History", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryYears: async (request, response) => {
    try {
      const result = await getHistoryYears();
      return helper.response(response, 200, "Succes Get History", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getRecentOrder: async (request, response) => {
    try {
      const result = await getRecentOrder();
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistory(result[i].history_id);
      }
      return helper.response(response, 200, "Success Get Order", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getChart: async (request, response) => {
    try {
      const result = await getChart();
      return helper.response(response, 200, "Succes", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postHistory: async (request, response) => {
    try {
      const { invoice, history_subTotal } = request.body;
      const setData = {
        invoice,
        history_subTotal,
      };
      const result = await postHistory(setData);
      console.log(result);
      // return helper.response(response, 201, "History Created",result.history_id)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  patchHistory: async (request, response) => {
    try {
      const { id } = request.params;
      const { invoice, history_subTotal } = request.body;
      const setData = {
        invoice,
        history_subTotal,
        history_updated_at: new Date(),
      };
      const checkId = await getHistoryById(id);
      if (checkId.length > 0) {
        const result = await patchHistory(setData, id);
        return helper.response(response, 200, "Patch Done", result);
      } else {
        return helper.response(response, 404, "Not found", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
