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
        getTotalOrder: (id) => {
            return new Promise ((resolve, reject) => {
              connection.query("SELECT SUM(total_price) as total FROM orders WHERE history_id = ?",id, (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error))
              })
            })
          },
          getOrderByHistory: (id) => {
            return new Promise((resolve, reject) => {
              connection.query("SELECT * FROM orders WHERE history_id = ?", id, (error,result) => {
                !error ? resolve(result):reject(new Error(error))
              })
            })
          },
        postOrder : (setData)=>{
            return new Promise((resolve,reject)=>{
                connection.query("INSERT INTO orders SET ?",setData,(error,result)=>{
                    if (!error) {
                        const newResult = {
                            order_id: result.insertId,
                            ...setData
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                    
                })

            })
        }
    }
