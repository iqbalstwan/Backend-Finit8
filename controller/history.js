const{getAllHistory, getHistoryById,postHistory,patchHistory} = require("../model/history")
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const history = require("../model/history");

module.exports = {
    getAllHistory:async (request, response) =>{
        try {
            const result = await getAllHistory();
            return helper.response(response, 200, "Succes get History",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)          
        }
    },
    getHistoryById: async (request,response) =>{
        try {
        //    const id = request.params.id
           //sama aja
           const {id} = request.params
           const result = await getHistoryById(id)
           if (result.length > 0) {
            return helper.response(response, 200, "Succes get History By Id",result)
           } else {
            return helper.response(response, 404, "Not Found")
           }
           
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    },

    postHistory: async (request,response)=> {
        try {
            const {invoice,history_subTotal} = request.body
            const setData = {
                invoice,
                history_subTotal,
                history_created_at: new Date()
            }
            const result = await postHistory(setData)
            return helper.response(response, 201, "History Created",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    },

    patchHistory: async (request,response)=>{
        try {
            const {id} = request.params
            const{invoice,history_subTotal} = request.body
            const setData = {
                invoice,
                history_subTotal,
                history_updated_at: new Date()
            }
            const checkId = await getHistoryById(id)
            if (checkId.length > 0) {
                const result =  await patchHistory(setData,id)
                return helper.response(response, 200, "Patch Done",result)
            } else {
                return helper.response(response, 404, "Not found",result)
            }
            
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
        
    }
}