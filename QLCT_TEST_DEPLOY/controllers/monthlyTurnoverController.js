const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;
const loadPage = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {

    var updateTurnover= await dbModel.updateMonthTurnover();
    // console.log('haha',updateTurnover)
    updateTurnover=updateTurnover.rows[0]
    updateTurnover.doanh_thu=parseInt(updateTurnover.doanhthuthang)
    console.log(updateTurnover)
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }

    var receiptIDArr;
    if (req.query.date) {
      if (req.query.month != "") {
        receiptIDArr = await dbModel.getTurnoverByMonth(req.query.month);
        // console.log(receiptIDArr)
      }
    } else {
      receiptIDArr = await dbModel.getThisMonthTurnover();
      // console.log(receiptIDArr)
   
    }
    if( receiptIDArr.rows){
      receiptIDArr=receiptIDArr.rows
      var tempReceiptIDArr = receiptIDArr.slice(
        currentPage * itemPerPage,
        currentPage * itemPerPage + itemPerPage
      );
      totalPage =
        parseInt(receiptIDArr.length / itemPerPage) +
        (receiptIDArr.length % itemPerPage > 0 ? 1 : 0);
      detailArr = [];
      temp = {};
  
      for (i = 0; i < tempReceiptIDArr.length; i++) {
        temp["doanh_thu"]=parseInt(tempReceiptIDArr[i].doanh_thu)
        temp["thong_tin"] = {
          ngaynhap: tempReceiptIDArr[i].ngay,
          trang_thai: tempReceiptIDArr[i].tg_cap_nhat,
        };
        detailArr.push(temp);
        temp = {};
      }
  
      
      if (detailArr.length > 0) {
        res.render("monthlyTurnoverPage", {
          title:'Doanh thu tháng',
          user: user,
          transactionsList: detailArr,
          totalPage: totalPage,
          currentPage: currentPage,
          total:updateTurnover
        });
      } else {
        res.render("monthlyTurnoverPage", {
          title:'Doanh thu tháng',
          user: user,
          transactionsList: detailArr,
          message:'Đã xảy ra lỗi'
        });
      }
    }
    else{
      res.render("monthlyTurnoverPage", {
        title:'Doanh thu tháng',
        user: user,
        message:'Đã xảy ra lỗi'
      });
    }
  
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const loadDetails = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }
    id = "";
    if (req.query.id) {
      id = req.query.id;
    }
    const orderInfor = await dbModel.getOrderByID(id);
    const result = await dbModel.getDetailTrading(id);

    res.render("tradingDetailsPage", {
      title:'Chi tiết giao dịch',
      user: user,
      details: result,
      header: orderInfor[0],
    });
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const updateState = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    var id=''
    if(req.body.id){
      id=req.body.id
    }

    var result
    result=await dbModel.updateState(id)
   
    if(result.rows){
      result=result.rows
      res.send('Thành công')
    }
    else{
      res.send(result)
    }
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};
module.exports = { loadPage, loadDetails,updateState };
