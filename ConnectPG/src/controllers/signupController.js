const pool = require('../config/db/db')

const hoTen = "Trần Duy Khang"
const sdt = "0938549163"
const email = "tranduyheo123@gmail.com"
const username ="khang1"
const password="123"
const sodu = 200000

const queryUsername = `SELECT * FROM khach_hang WHERE tai_khoan = '${username}'`

const queryInsertUser = `INSERT INTO khach_hang(

    tai_khoan,mat_khau,ten_kh,email,sdt,so_du
) VALUES('${username}','${password}','${hoTen}','${email}','${sdt}','${sodu}')`

const signup = (req,res) => {
    pool.query(queryUsername,(err,result) =>
    {
        if(err) throw err
        else
        {
            if(result.rows.length != 0)
            {
                res.send({exist: true, state: false})
            }
            else{
                pool.query(queryInsertUser,(err,result)=>
                {
                    if(err) throw err
                    else{
                        res.send({state: true})
                    }
                })
            }
        }
    })
    
}
module.exports ={signup}