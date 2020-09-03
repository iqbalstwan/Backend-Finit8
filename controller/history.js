const {
  getAllHistory,
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

module.exports = {
  getAllHistory: async (request, response) => {
    try {
      let result = await getAllHistory();
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistory(result[i].history_id);
      }
      return helper.response(response, 200, "Success get History", result);
    } catch (error) {
      // console.log(error)
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (request, response) => {
    try {
      //    const id = request.params.id
      //sama aja
      const { id } = request.params;
      const result = await getHistoryById(id);
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
