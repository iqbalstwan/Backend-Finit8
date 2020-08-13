const connection = require("../config/mysql")
const { getProductById } = require("../controller/product")

module.exports ={
    getAllProduct:() => {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM product`,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
        getProductById: (id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("SELECT * FROM product WHERE product_id = ?",id,(error,result)=>{
                    !error ? resolve(result) : reject(new Error(error))
                })
            })
        },
        postProduct : (setData)=>{
            return new Promise((resolve,reject)=>{
                connection.query("INSERT INTO product SET ?",setData,(error,result)=>{
                    if (!error) {
                        const newResult = {
                            product_id: result.insertId,
                            ...setData
                            //... mengambil semua data di setdata
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                    
                })

            })
        },
        // ==========================================
        patchProduct: (setData, id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("UPDATE product SET ? WHERE product_id = ?",
                [setData,id], (error,result)=>{
                    if (!error) {
                        const newResult = {
                            product_id: id,
                            ...setData
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                })
            })
        },
        deleteProduct:(id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("DELETE FROM product WHERE product_id = ?", id,(error,result)=>{
                    if (!error) {
                        const newResult = {
                            id : id
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                })
            })
        }
    }
