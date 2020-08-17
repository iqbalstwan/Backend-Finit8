const connection = require("../config/mysql")
const { getOrderById } = require("../controller/order")

module.exports ={
    getAllOrder:() => {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM orders",(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
        getOrderById: (id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("SELECT * FROM orders WHERE order_id = ?",id,(error,result)=>{
                    !error ? resolve(result) : reject(new Error(error))
                })
            })
        },
        postOrder : (setData)=>{
            return new Promise((resolve,reject)=>{
                connection.query("INSERT INTO orders SET ?",setData,(error,result)=>{
                    if (!error) {
                        const newResult = {
                            category_id: result.insertId,
                            ...setData
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                    
                })

            })
        },
        postHistory : (setData)=>{
            return new Promise((resolve,reject)=>{
                connection.query("INSERT INTO history SET ?",setData,(error,result)=>{
                    if (!error) {
                        const newResult = {
                            history_id: result.insertId,
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
        patchHistory: (setDataHist, id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("UPDATE history SET ? WHERE history_id = ?",
                [setDataHist,id], (error,result)=>{
                    if (!error) {
                        const newResult = {
                            history_id: id,
                            ...setDataHist
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                })
            })
        }
    }
