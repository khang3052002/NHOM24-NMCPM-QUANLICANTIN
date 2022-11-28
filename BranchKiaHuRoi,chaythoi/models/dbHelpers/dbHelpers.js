const dbConnector = require("../dbConnect/db");

const addNewUser = async (user) => {

  try {
    const res = await dbConnector.query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
     '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`);
    return res.rows
  }
  catch (err) {
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

  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE TAI_KHOAN='${user.username}'`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }
};

const adminAuthentication = async (user) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM NGUOI_BAN WHERE TAI_KHOAN='${user.username}'`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }


};
const getTodayFood = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

const getFoodById = async (id) => {
  try {
    const resFoods = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND TA.MA_MON_AN='${id}'`);
    const resProduct = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and slh.ma_mat_hang = '${id}'
    `)
    console.log(resFoods.rows)
    console.log(resProduct.rows)
    if(resFoods.rows.length == 0)
    {
      return resProduct.rows
    }
    return resFoods.rows;
  }
  catch (err) {
    return err;
  }
};


const getUserInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE id='${id}'`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

const getCurrentStorage = async () => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang,mh.ten_mat_hang,sl.so_luong  FROM sl_hang_trong_kho sl, mat_hang mh where mh.ma_mat_hang=sl.ma_mat_hang and so_luong>0`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

// const getFoodInfo =async (foodID) => {
//   try{
//     const res= await dbConnector.query(`SELECT * FROM MON_AN WHERE MA_MON_AN='${foodID}'`);
//     return res.rows;
//   }
//   catch(err){
//     return err;
//   } 
// };

const updateUserInfo = async (id, name, email, phone) => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET ten_kh = '${name}', email='${email}', sdt='${phone}' WHERE id = '${id}'`)
    return res
  } catch (error) {
    return error
  }
}

const getAllGoods = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM MAT_HANG`)
    return res.rows
  } catch (error) {
    return error
  }
}

// call themPhieuNhapHang(ARRAY['#GDCxZxJT','#GDCxZxJT','#GDx3VH16','#GDCnX6D1'],ARRAY[10,10,15,20],ARRAY[17000,20000,30000,40000],'{2012-05-05,
//   ma mh, so luong																											 2012-07-07,2017-03-03,2019-01-01}');
const addNewReceipt = async (queryStringArr) => {
  try {
    const res = await dbConnector.query(`call themPhieuNhapHang(${queryStringArr})`)
    return res
  } catch (error) {
    return error.message
  }
}


const addNewReceiptCT = async (queryStringArr) => {
  try {
    console.log(`call themPhieuXuatHang(${queryStringArr})`)
    const res = await dbConnector.query(`call themPhieuXuatHang(${queryStringArr})`)
    return res
  } catch (error) {
    return error.message
  }
}

const getAllReCeiptID= async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_nhap_kho pnk`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getReCeiptInfo= async (id) => {
  try {
    const res = await dbConnector.query(`SELECT mh.ten_mat_hang,ctnk.don_gia, ctnk.so_luong, ctnk.don_gia*ctnk.so_luong as thanh_tien, ctnk.ngay_san_xuat FROM  chi_tiet_nhap_kho ctnk, mat_hang mh where ctnk.ma_phieu='${id}' and ctnk.ma_mat_hang=mh.ma_mat_hang`)
    return res.rows
  } catch (error) {
    return error.message
  }
}


const getGoodSearchInfo = async(key) =>
{
  try {
    var arrResult = ''
    const resFoods = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND MA.TEN_MON_AN LIKE '${key}%'`)
    // console.log(res)
    // const resProduct = await dbConnector.query(`select mhtk.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia, mh.img_url  
    // from mat_hang_trong_kho mhtk, mat_hang mh, sl_hang_trong_kho slh where slh.ma_mat_hang = mhtk.ma_mat_hang and mh.ma_mat_hang = mhtk.ma_mat_hang and mh.ten_mat_hang LIKE '${key}%'
    // `)
    const resProduct = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url
     from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and mh.ten_mat_hang LIKE '${key}%'
    `)
    arrResult = resFoods.rows.concat(resProduct.rows)
    console.log(arrResult)
    
    return arrResult
  } catch (error) {
    return error
  }
}


// const getPopularItems = async (amount) => {
//   try {
//     const res = await dbConnector.query(`SELECT * FROM MAT_HANG `)
//     return res
//   } catch (error) {
//     return error
//   }
// }

module.exports = {
  addNewUser,
  userAuthentication,
  adminAuthentication,
  getTodayFood,
  getUserInfo,
  updateUserInfo,
  getFoodById,
  getAllGoods,
  addNewReceipt,
  getReCeiptInfo,
  getAllReCeiptID,
  getCurrentStorage,
  addNewReceiptCT,
  getGoodSearchInfo
};
