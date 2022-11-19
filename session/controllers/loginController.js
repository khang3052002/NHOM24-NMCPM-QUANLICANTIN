
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: '192.168.1.12',
//   database: 'db_CanTin_new',
//   password: '300502',
//   port: 5432,
// })



const username = "khang"
const password = "123"
const pool = require('../config/db/db')

const queryUsername = `select * from khach_hang AS KH WHERE KH.tai_khoan = '${username}' `
const query = `
  SELECT * FROM khach_hang  WHERE tai_khoan  = '${username}' AND mat_khau = '${password}'  
`

const id = 1
// const query = `SELECT * FROM PUBLIC."KHACH_HANG"`
const checkLogin = (request, response) => {
    pool.query(queryUsername, (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length == 0) {
            response.send({ exist: false })
        }
        else {
            // const rs = await pool.query(query)
            pool.query(query, (err, rs) => {
                if (err) throw err
                else {
                    if (rs.rows.length == 0) {
                        response.send({ connect: false, exist: true })
                    }
                    response.send({ connect: true, exist: true })
                }
            })
        }
        // const rs = results.rows
        // const id = rs[0].MA_MAT_HANG
        // const{ID,TEN_LOAI_HANG,TEN_MAT_HANG,SO_LUONG,GIA} = rs[0]
        // console.log(ID,TEN_LOAI_HANG,TEN_MAT_HANG,SO_LUONG,GIA,id)

        // if(rs.length == 0)
        // {
        //   response.send('DANG NHAP THAT BAI')
        // }
        // else{

        //   response.status(200).json(rs)
        // }

        // response.status(200).json(results.rows)
    })
}
// client.query(`SELECT * FROM KHACH_HANG`,(err,res)=>
// {
//     if(!err)
//     {
//         console.log(res.rows)
//     }
//     else{
//         console.log(err)
//     }
//     client.end;
// })
module.exports = { checkLogin }

