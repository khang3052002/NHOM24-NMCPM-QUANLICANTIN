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
    if (resFoods.rows.length == 0) {
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
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang,mh.ten_mat_hang,sl.so_luong,sl.gia  FROM sl_hang_trong_kho sl, mat_hang mh where mh.ma_mat_hang=sl.ma_mat_hang and so_luong>0`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

const getCurrentCanteen = async () => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang,mh.ten_mat_hang,sl.so_luong,sl.gia  FROM sl_hang_canteen sl, mat_hang mh where mh.ma_mat_hang=sl.ma_mat_hang and so_luong>0`);
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

const getAllReCeiptID = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_nhap_kho pnk`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getUserReCeiptByID = async (id) => {
  try {
    const res = await dbConnector.query(`select * from don_hang dh where dh.ma_don_hang = '${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getUserReCeiptID = async (id) => {
  try {
    const res = await dbConnector.query(`select * from don_hang dh where dh.ma_khach_hang = '${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getReCeiptsByID = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_nhap_kho pnk where pnk.ma_phieu='${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}

const getReCeiptInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT mh.ten_mat_hang,ctnk.don_gia, ctnk.so_luong, ctnk.don_gia*ctnk.so_luong as thanh_tien, ctnk.ngay_san_xuat FROM  chi_tiet_nhap_kho ctnk, mat_hang mh where ctnk.ma_phieu='${id}' and ctnk.ma_mat_hang=mh.ma_mat_hang`)
    return res.rows
  } catch (error) {
    return error.message
  }
}

const getFoodInfoForCartHistory=async id=>{
  try {
    const res = await dbConnector.query(`select ctdh.ma_don_hang as id,ma.ten_mon_an as ten, ctdh.gia_ban as don_gia, ctdh.so_luong, ctdh.thanh_tien 
    from chi_tiet_don_hang ctdh, mon_an ma where ctdh.ma_don_hang = '${id}' and ma.ma_mon_an = ctdh.ma_mat_hang`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getGoodsInfoForCartHistory=async id=>{
  try {
    const res = await dbConnector.query(`select ctdh.ma_don_hang as id, mh.ten_mat_hang as ten, ctdh.gia_ban as don_gia, ctdh.so_luong, ctdh.thanh_tien
    from chi_tiet_don_hang ctdh, mat_hang mh where ctdh.ma_don_hang = '${id}' and mh.ma_mat_hang = ctdh.ma_mat_hang`)
    return res.rows
  } catch (error) {
    return error.message
  }
}

const getAllExportReCeiptID = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_xuat_kho pxk`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getExportReCeiptsByID = async (id) => {
  console.log(id)
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_xuat_kho pxk where pxk.ma_phieu='${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getExportReCeiptInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT mh.ten_mat_hang,ctxk.don_gia, ctxk.so_luong, ctxk.don_gia*ctxk.so_luong as thanh_tien FROM  chi_tiet_xuat_kho ctxk, mat_hang mh where ctxk.ma_phieu='${id}' and ctxk.ma_mat_hang=mh.ma_mat_hang`)
    return res.rows
  } catch (error) {
    return error.message
  }
}

const getPopularItems = async (amount) => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang, sl.gia_ban_ra, mh.ten_mat_hang, mh.img_url FROM sl_hang_canteen sl, mat_hang mh WHERE sl.ma_mat_hang=mh.ma_mat_hang and sl.so_luong>0 LIMIT ${amount}`)
    return res.rows
  } catch (error) {
    return error
  }
}
const getGoodSearchInfo = async (key) => {
  try {
    var arrResult = ''
    const resFoods = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND MA.TEN_MON_AN ILIKE '%${key}%'`)
    const resProduct = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url
     from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and mh.ten_mat_hang ILIKE '%${key}%'
    `)
    arrResult = resFoods.rows.concat(resProduct.rows)
    return arrResult
  } catch (error) {
    return error
  }
}


const searchByCategory = async (category) => {
  try {
    var res
    if (category == 'TYNU' || category == 'TYDCHT' || category == 'TYDAV') {
      res = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url
      from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and mh.ma_loai_hang = '${category}'
     `)
    }
    else {
      res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN`)
    }
    console.log(res)
    return res.rows
  } catch (error) {
    return error
  }
}

const addProductToCart = async (params) => {
  try {
    console.log(params.id, params.idPro)
    const res = await dbConnector.query(`call themvaogiohang('${params.id}', '${params.idPro}', '${params.quantity}')`)
    return res
  } catch (error) {
    return error
  }
}
const getProductsCart = async (idCart) => {
  try {
    var arrRes = ''
    console.log(idCart)

    // const resFoods = await dbConnector.query(`select distinct ma.ma_mon_an as id, ma.ten_mon_an as ten, giohang.so_luong, ma.gia_ban, (giohang.so_luong*ma.gia_ban)as thanh_tien 
    //   from mon_an ma, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    //   ) as giohang where ma.ma_mon_an = giohang.ma_mat_hang`)

    const resFoods = await dbConnector.query(`select distinct ma.ma_mon_an as id, ma.ten_mon_an as ten, giohang.so_luong, tatk.so_luong as so_luong_hang , ma.gia_ban, (giohang.so_luong*ma.gia_ban)as thanh_tien 
    from mon_an ma, thuc_an_trong_kho tatk, (select ctgh.ma_mat_hang, ctgh.so_luong from  chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    ) as giohang where ma.ma_mon_an = giohang.ma_mat_hang and tatk.ma_mon_an = giohang.ma_mat_hang
`)
    
    // const resProduct = await dbConnector.query(`
    //   select distinct mh.ma_mat_hang as id, mh.ten_mat_hang as ten, giohang.so_luong, slhct.gia_ban_ra as gia_ban, (giohang.so_luong*slhct.gia_ban_ra) as thanh_tien from sl_hang_canteen slhct, mat_hang mh, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    //   ) as giohang where giohang.ma_mat_hang = mh.ma_mat_hang and slhct.ma_mat_hang = giohang.ma_mat_hang
    //   `)


    const resProduct = await dbConnector.query(`
    select distinct mh.ma_mat_hang as id, mh.ten_mat_hang as ten, giohang.so_luong,slhct.so_luong as so_luong_hang, slhct.gia_ban_ra as gia_ban, (giohang.so_luong*slhct.gia_ban_ra) as thanh_tien from sl_hang_canteen slhct, mat_hang mh, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
          ) as giohang where giohang.ma_mat_hang = mh.ma_mat_hang and slhct.ma_mat_hang = giohang.ma_mat_hang`)
    // console.log('Cac mon ne',resFoods.rows)
    arrRes = resFoods.rows.concat(resProduct.rows)
    console.log(arrRes)
    return arrRes
  }
  catch (error) {
    return error
  }
}
const updateTodayFood = async menu => {
  try {
    const res = await dbConnector.query(`call suaDoiKhoThucAn(${menu});`)
    return res
  } catch (error) {
    return error
  }
}

const getAllFood = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM  MON_AN`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}
const getAllUserInfo = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG ORDER BY id asc`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}
const setUserBalance = async user => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du ='${user.balance}' WHERE id='${user.id}' `)
    return res
  } catch (error) {
    return error
  }
}

// const setUsersBalance = async users => {
//   for (var i = 0; i < users.length; i++) {
//     await setUserBalance(users[i]);
//   }

const setUsersBalance = async users => {
  try{
    var res
    for (var i = 1; i < users.length; i++) {
        res=await setUserBalance(users[i]);
    }
    return res
  }
  catch(err){
    return err
  }
}


const getCurrentStorageDetails = async () => {
  try {
    const res = await dbConnector.query(`SELECT *  FROM mat_hang_trong_kho kho, mat_hang MH WHERE kho.ma_mat_hang=MH.ma_mat_hang and ton_tai=1  `);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}

const getCurrentCanteenDetails = async () => {
  try {
    const res = await dbConnector.query(`SELECT *  FROM mat_hang_canteen kho, mat_hang MH WHERE kho.ma_mat_hang=MH.ma_mat_hang and ton_tai=1  `);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}

const editCart = async (idUser, strQuery) => {
  try {
    console.log(`call capnhatgiohang('${idUser}',${strQuery})`)
    const res = await dbConnector.query(`call capnhatgiohang('${idUser}',${strQuery})`)
    // console.log(res)
    return res
  } catch (error) {
    return error.message
  }
}

const deleteProductInStore = async (id, date) => {
  try {
    console.log(id, date)
    const res = await dbConnector.query(`call xoaHangTrongKho('${id}','${date}')`)
    return res
  } catch (err) {
    return err
  }
}
const deleteProductInCanteen = async (id, date) => {
  try {
    console.log(id, date)
    const res = await dbConnector.query(`call xoaHangCanteen('${id}','${date}')`)
    return res
  } catch (err) {
    return err
  }
}

const getAllGoodCategory=async()=>{
  try{

    const res = await dbConnector.query(`select * from loai_hang`)
    return res.rows
  }catch(err){
    return err
  }
}

const addNewGood=async(ma_loai_hang,ten_mat_hang,img_url,tien_loi,han_su_dung)=>{
  try{
    const res = await dbConnector.query(`call themMatHangMoi('${ma_loai_hang}', '${ten_mat_hang}','${img_url}','${tien_loi}','${han_su_dung}')`)
    return res
  }catch(err){
    return err.message
  }
}
const addNewFood=async(ten_mon_an,gia_ban,img_url)=>{
  // console.log(`call themMonAnMoi('${ten_mon_an}', ${gia_ban},'${img_url}')`)
  try{
   
    const res = await dbConnector.query(`call themMonAnMoi('${ten_mon_an}', ${gia_ban},'${img_url}')`)
    return res
  }catch(err){
    return err.message
  }
}
const createOrder = async (idUser, strQuery) => {
  try {
    console.log(`call capnhatgiohang('${idUser}',${strQuery})`)
    const res = await dbConnector.query(`call themdonhang('${idUser}',${strQuery})`)
    // console.log(res)
    // return 1
    return res
  } catch (error) {
    return error.message
  }
}
const getUserBalance = async (idUser)=>
{
  try {
    const res = await dbConnector.query(`select so_du from khach_hang where id = '${idUser}'`)
    return res.rows
  } catch (error) {
    return error
  }
}

const rechargeBalance = async(idUser,val) =>
{
  try {
    if(val == 100)
    {
      const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du = so_du + '100000' WHERE id='${idUser}' `)

    }
    else if(val == 50){
      const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du = so_du + '50000' WHERE id='${idUser}' `)

    }
    return res
  } catch (error) {
    
  }
}

const getAllOrder= async ()=>
{
  try {
    const res = await dbConnector.query(`SELECT * FROM DON_HANG`)
    return res.rows
  } catch (error) {
    return error.message
  }
}

const getOrderByID= async (id)=>
{
  try {
    const res = await dbConnector.query(`SELECT * FROM DON_HANG where ma_don_hang= '${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}


const getOrderInfo= async (id)=>
{
  try {
    const res = await dbConnector.query(`SELECT ct.so_luong, ct.gia_ban, ct.thanh_tien, dh.ma_don_hang, mh.ten_mat_hang FROM DON_HANG dh, CHI_TIET_DON_HANG ct, mat_hang mh where dh.ma_don_hang=ct.ma_don_hang and dh.ma_don_hang='${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}



const getDetailTrading= async (id)=>
{
  try {
    const res = await dbConnector.query(`SELECT ct.ma_don_hang,ct.so_luong, ct.gia_ban, ct.thanh_tien, dh.ma_don_hang, mh.ten_mat_hang FROM DON_HANG dh, CHI_TIET_DON_HANG ct, mat_hang mh where dh.ma_don_hang=ct.ma_don_hang and dh.ma_don_hang='${id}'`)
    return res.rows
  } catch (error) {
    return error.message
  }
}
const getOrderIDNewCreate = async(idUser) =>
{
  try {
    const res = await dbConnector.query(`
    select dh.ma_don_hang as id_order from don_hang dh where dh.ma_khach_hang = '${idUser}'
    ORDER BY dh.ma_don_hang DESC LIMIT 1
    `)
    return res.rows
  } catch (error) {
      return error.message
  }
}
module.exports = {
  updateTodayFood,
  getAllFood,
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
  getGoodSearchInfo,
  addProductToCart,
  getProductsCart,
  getPopularItems,
  getAllUserInfo,
  setUserBalance,
  
  getAllExportReCeiptID,
  getExportReCeiptInfo,
  getExportReCeiptsByID,
  getReCeiptsByID,
  getCurrentStorageDetails,
  editCart,
  deleteProductInStore,
  getCurrentCanteen,
  deleteProductInCanteen,
  getCurrentCanteenDetails,
  searchByCategory,
  getAllGoodCategory,
  addNewGood,
  addNewFood,
  createOrder,
  setUsersBalance,
  getUserBalance,
  rechargeBalance,

  getUserReCeiptID,
  getFoodInfoForCartHistory,
  getGoodsInfoForCartHistory,
  getAllOrder,
  getOrderInfo,
  getOrderByID,
  
  getDetailTrading,
  getUserReCeiptByID ,
  getOrderIDNewCreate
};
