const dbConnector = require("../dbConnect/db");

const addNewUser = async (user) => {

  try{
    const res= await dbConnector.query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
     '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`);
    return res.rows
  }
  catch(err){
    console.log(err)
  } 

 
  // console.log(user);
  // await dbConnector.connect().query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
  // '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`, (error, results) => {
  //     if (error) {
  //         console.log(error)
  //     }
  //     // if(results.rows.length == 0)
  //     // {
  //     //   response.send({exist: false })
  //     // }
  //     else {
  //         console.log(results)
  //         return results
  //     }

  // })
};

const userAuthentication = async (user) => {

  console.log("user log in", user);
  try{
    const res= await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE TAI_KHOAN='${user.username}'`);
    return res.rows
  }
  catch(err){
    console.log(err)
  } 
};

const adminAuthentication = async (user) => {

  console.log("user log in", user);
  try{
    const res= await dbConnector.query(`SELECT * FROM NGUOI_BAN WHERE TAI_KHOAN='${user.username}'`);
    //console.log(res.rows)
    return res.rows
  }
  catch(err){
    console.log(err)
  } 

  
};
module.exports = {
  addNewUser,
  userAuthentication,
  adminAuthentication,
};
