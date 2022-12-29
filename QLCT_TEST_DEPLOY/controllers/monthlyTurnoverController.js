const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;
const hbsHelper=require("../models/hbsHelpers/hbsHelper");
const dataExporter=require('json2csv').Parser
const moment = require("moment");
const customDateWOTime = (date) => {
  try{
    return moment(date).format("DD");
  }catch(err){
    return date
  }

};
const loadPage = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {

    if (req.query.month && req.query.year) {
      month = req.query.month
      year=req.query.year
      // console.log(month,year)
    }
    else {
      const d = new Date();
      month = d.getMonth() + 1;
      year=d.getFullYear();
      // console.log(year)
    }
    var updateTurnover = await dbModel.updateMonthTurnover(month,year);
    // console.log('haha',updateTurnover)
    updateTurnover = updateTurnover.rows[0]
    updateTurnover.doanh_thu = parseInt(updateTurnover.doanhthuthang)
    updateTurnover.loi_nhuan = parseInt(updateTurnover.loinhuanthang)
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }

    var receiptIDArr;
    date=[]
    turnover=[]
    profit=[]

   
    receiptIDArr = await dbModel.getTurnoverByMonth(month, year);
    


    if (receiptIDArr.rows) {
      receiptIDArr = receiptIDArr.rows
      for(var i=0;i<receiptIDArr.length;i++){
        date.push(customDateWOTime( receiptIDArr[i].ngay))
        turnover.push(receiptIDArr[i].doanh_thu)
        profit.push(receiptIDArr[i].loi_nhuan)
      }
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
        temp["doanh_thu"] = parseInt(tempReceiptIDArr[i].doanh_thu)
        temp["thong_tin"] = {
          ngaynhap: tempReceiptIDArr[i].ngay,
          trang_thai: tempReceiptIDArr[i].tg_cap_nhat,
        };
        detailArr.push(temp);
        temp = {};
      }

      date.reverse()
      turnover.reverse()
      profit.reverse()
      if (detailArr.length > 0) {
        res.render("monthlyTurnoverPage", {
          title: 'Doanh thu tháng',
          user: user,
          month:month,
          transactionsList: detailArr,
          totalPage: totalPage,
          currentPage: currentPage,
          total: updateTurnover,
          date:date,
          turnover:turnover,
          profit:profit,
          year:year
        });
      } else {
        res.render("monthlyTurnoverPage", {
          title: 'Doanh thu tháng',
          month:month,
          user: user,
          transactionsList: detailArr,
          message: 'Đã xảy ra lỗi'
        });
      }
    }
    else {
      res.render("monthlyTurnoverPage", {
        title: 'Doanh thu tháng',
        user: user,
        month:month,
        message: 'Đã xảy ra lỗi'
      });
    }

  } catch (err) {
    res.render("errorPage", {
      title: 'Lỗi',
      user: user,
      month:month,
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
      title: 'Chi tiết giao dịch',
      user: user,
      details: result,
      header: orderInfor[0],
    });
  } catch (err) {
    res.render("errorPage", {
      title: 'Lỗi',
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
    var id = ''
    if (req.body.id) {
      id = req.body.id
    }

    var result
    result = await dbModel.updateState(id)

    if (result.rows) {
      result = result.rows
      res.send('Thành công')
    }
    else {
      res.send(result)
    }
  } catch (err) {
    res.render("errorPage", {
      title: 'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const getCSV = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    if(req.body.month){
      month=req.body.month
    }
    var updateTurnover = await dbModel.updateMonthTurnover(month);
    updateTurnover = updateTurnover.rows[0]

    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }

    var receiptIDArr;
    date=[]
    turnover=[]
    profit=[]
    if (req.query.month) {
   
        receiptIDArr = await dbModel.getTurnoverByMonth(req.query.month);
    
    } else {
      receiptIDArr = await dbModel.getThisMonthTurnover();

    }

    if (receiptIDArr.rows) {
      receiptIDArr = receiptIDArr.rows
      for(var i=0;i<receiptIDArr.length;i++){
        receiptIDArr[i].ngay=hbsHelper.customDate(receiptIDArr[i].ngay)
        receiptIDArr[i].tg_cap_nhat=hbsHelper.customDate(receiptIDArr[i].tg_cap_nhat)
      }
      data=JSON.parse(JSON.stringify(receiptIDArr))
      newData = data.map(
        obj => {
            return {
                "Ngày" : obj.ngay,
                "Doanh thu":obj.doanh_thu,
                "Thời gian cập nhật":obj.tg_cap_nhat,
                "Lợi nhuận":obj.loi_nhuan
            }
        }
    );
      fileHeader=["Ngày","Doanh thu","Thời gian cập nhật", "Lợi nhuận"]
      jsonData=new dataExporter({fileHeader})
      csvData=jsonData.parse(data)
      res.setHeader("Content-type","text/csv")
      res.setHeader("Content-Disposition",`attachment; filename=DuLieuThang${month}.csv`)
      res.status(200).end(csvData)
      return
    }
    else {
      res.status(403).send('Fail')
    }

  } catch (err) {
    console.log(err)
  }
};

module.exports = { loadPage, loadDetails, updateState,getCSV };
