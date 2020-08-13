const{getAllOrder, getOrderById,postOrder} = require("../model/order")
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const order = require("../model/order");

module.exports = {
    getAllOrder: async (request, response) =>{
        try {
            const result = await getAllOrder();
            return helper.response(response, 200, "Success get Order",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)          
        }
    },
    getOrderById: async (request,response) =>{
        try {
           const {id} = request.params
           const result = await getOrderById(id)
           if (result.length > 0) {
            return helper.response(response, 200, "Success get Order By Id",result)
           } else {
            return helper.response(response, 404, "Not Found")
           }
           
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    },

    postOrder: async (request,response)=> {
        try {
            const {history_id,product_id, order_qty, order_ppn, total_price} = request.body
            const setData = {
                history_id,
                product_id,
                order_qty,
                order_ppn,
                total_price
            }
            const result = await postOrder(setData)
            return helper.response(response, 201, "Order Created",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    }
}