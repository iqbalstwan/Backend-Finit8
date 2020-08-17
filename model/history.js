const connection = require("../config/mysql")
const { getHistoryById } = require("../controller/history")

module.exports ={
    getAllHistory:() => {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM history",(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
        getHistoryById: (id) =>{
            return new Promise((resolve,reject)=>{
                connection.query("SELECT * FROM history WHERE history_id = ?",id,(error,result)=>{
                    !error ? resolve(result) : reject(new Error(error))
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
        patchHistory: (setData, id) =>{
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