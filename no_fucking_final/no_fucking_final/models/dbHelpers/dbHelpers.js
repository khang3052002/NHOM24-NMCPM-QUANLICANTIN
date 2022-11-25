const dbConnector = require("../dbConnect/db");

const addNewUser = async (user) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
    // '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`, [1]);
    console.log(res.rows[0]);
    return res.rows[0]
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
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
    // const client = await dbConnector.connect();
    // try {
    //   const res = await client.query(`SELECT * FROM KHACH_HANG WHERE TAI_KHOAN='${user.username}'`, [1]);
    //   console.log(res.rows[0]);
    //   return res.rows[0]
    // } catch (err) {
    //   console.log(err.stack);
    // } finally {
    //   client.release();
    // }
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
  await dbConnector.query(
    `SELECT * FROM NGUOI_BAN WHERE TAI_KHOAN='${user.username}'`,
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return results.rows;
      }
    }
  );
};
module.exports = {
  addNewUser,
  userAuthentication,
  adminAuthentication,
};
