const{getAllOrder, getOrderById,postOrder} = require("../model/order")
const{postHistory,patchHistory} = require("../model/history")
const {getProductById} = require ("../model/product")
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const order = require("../model/order");
const { patch } = require("../routes/order");

module.exports = {
    getAllOrder: async (request, response) =>{
        try {
            const result = await getAllOrder();
            // console.log(result)
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
            // postHistory
            const setData = {
                    invoice : Math.floor(Math.random() * 100000) + 100000, 
                    history_subTotal : 0
                }
                const result = await postHistory(setData)

            let orderData = request.body.orders
            let data = orderData.map(async(item) => {
                setDataOrder = {
                    history_id : result.history_id,
                    product_id : item.product_id,
                    order_qty : item.order_qty,
                    total_price : item.total_price * item.order_qty
                }
                resultOrder = await postOrder(setDataOrder)
                console.log(resultOrder)
                return helper.response(response, 201, "Order Created",resultOrder)
            })

            // patchHistory
            // historyId = result.history_id
            // const setDataHist = {
            //     history_subTotal : history_subTotal,
            // }
         
        } catch (error) {
            // console.log(error)
            return helper.response(response, 400, "Bad Request",error)
        }
    }
}