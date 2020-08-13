const{getAllProduct, getProductById,postProduct,patchProduct,deleteProduct} = require("../model/product")
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const product = require("../model/product");

module.exports = {
    getAllProduct:async (request, response) =>{
        try {
            const result = await getAllProduct();
            return helper.response(response, 200, "Succes get product",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)          
        }
    },
    getProductById: async (request,response) =>{
        try {
        //    const id = request.params.id
           //sama aja
           const {id} = request.params
           const result = await getProductById(id)
           if (result.length > 0) {
            return helper.response(response, 200, "Succes get product By Id",result)
           } else {
            return helper.response(response, 404, "Not Found")
           }
           
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    },

    postProduct: async (request,response)=> {
        try {
            const {category_id,product_name, product_price, product_status} = request.body
            const setData = {
                category_id,
                product_name,
                product_price,
                product_created_at: new Date(),
                product_status
            }
            // const setData = {
            //     //kanan dari database dan kiri dari postman
            //     product_nama: request.body.product_nama,
            //     product_harga: request.body.product_harga,
            //     product_created_at: new Date(),
            //     product_status: request.body.product_status
            // }
            const result = await postProduct(setData)
            return helper.response(response, 201, "Product Created",result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
    },

    //patch
    patchProduct: async (request,response)=>{
        try {
            const {id} = request.params
            const{category_id,product_name, product_price, product_status} = request.body
            const setData = {
                category_id,
                product_name,
                product_price,
                product_created_at: new Date(),
                product_status
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result =  await patchProduct(setData,id)
                return helper.response(response, 200, "Patch Done",result)
            } else {
                return helper.response(response, 404, "Not found",result)
            }
            
        } catch (error) {
            return helper.response(response, 400, "Bad Request",error)
        }
        
    },
    deleteProduct: async(request,response)=>{
        try {
            const {id} = request.params
            const result = await deleteProduct(id)
            return helper.response(response, 200, "Patch Done",result)
        } catch (error) {
            return helper.response(response, 400, "Delete Done",error)
        }
        
    }
}