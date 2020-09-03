const {
  getAllOrder,
  getOrderById,
  postOrder,
  getTotalOrder,
  getOrderByHistory,
} = require("../model/order");
const {
  getHistoryById,
  postHistory,
  patchHistory,
} = require("../model/history");
const { getProductById } = require("../model/product");
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const order = require("../model/order");
const { patch } = require("../routes/order");

module.exports = {
  getAllOrder: async (request, response) => {
    try {
      const result = await getAllOrder();
      // console.log(result)
      return helper.response(response, 200, "Success get Order", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOrderById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getOrderById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success get Order By Id",
          result
        );
      } else {
        return helper.response(response, 404, "Not Found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  postOrder: async (request, response) => {
    try {
      postHistory;

      const setData = {
        invoice: "IS-" + (Math.floor(Math.random() * 1000) + 1000),
        history_subTotal: 0,
      };
      const result = await postHistory(setData);

      let historyId = result.history_id;
      let orders = request.body.orders;
      let data = orders.map(async (item) => {
        const setDataOrder = {
          history_id: historyId,
          product_id: item.product_id,
          order_qty: item.order_qty,
          total_price: item.total_price * item.order_qty,
        };
        const resultOrder = await postOrder(setDataOrder);

        const totalPrice = await getTotalOrder(historyId);
        patchHist = {
          history_subTotal: totalPrice + (totalPrice * 10) / 100,
        };

        let fromHistory = await getHistoryById(historyId);
        let subTotal = await patchHistory(patchHist, historyId);
        let Order = await getOrderByHistory(historyId);
        let info = {
          Invoices: fromHistory[0].invoice,
          Id: fromHistory[0].history_id,
          Order,
          totalPrice,
          subTotal,
        };
        // console.log(info)
        //   console.log(request.body);
        return helper.response(response, 201, "Yap, Order Created", info);
      });
    } catch (error) {
      // console.log(error)
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
