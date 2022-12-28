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
    var today = new Date().toISOString().slice(0, 10);
    queryDate=today
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }
    if (req.query.date) {
      if (req.query.date != "") {
        queryDate=req.query.date
      }
    }
    var dateAndTotalTurnover = await dbModel.getUpdatedDailyTurnoverTime(queryDate);
    if (dateAndTotalTurnover.rows && dateAndTotalTurnover.rows.length > 0) {
      dateAndTotalTurnover = dateAndTotalTurnover.rows[0];
      dateAndTotalTurnover.doanh_thu = parseInt(dateAndTotalTurnover.doanh_thu);
      var receiptIDArr;
      receiptIDArr = await dbModel.getTurnoverByDate(queryDate);

      if (receiptIDArr.rows) {
        receiptIDArr = receiptIDArr.rows;
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
          temp["id"] = tempReceiptIDArr[i].id;
          temp["tong_tien"] = parseInt(tempReceiptIDArr[i].tong_tien);
          temp["thong_tin"] = {
            ngaynhap: tempReceiptIDArr[i].ngay_mua,
            trang_thai: tempReceiptIDArr[i].trang_thai,
          };
          detailArr.push(temp);
          temp = {};
        }

        if (detailArr.length > 0) {
          res.render("dailyTurnoverPage", {
            title: "Doanh thu hôm nay",
            user: user,
            transactionsList: detailArr,
            totalPage: totalPage,
            currentPage: currentPage,
            total: dateAndTotalTurnover,
          });
          return
        } else {
          res.render("dailyTurnoverPage", {
            title: "Doanh thu hôm nay",
            user: user,
            transactionsList: detailArr,
            message: "Đã xảy ra lỗi",
          });
          return
        }
      } else {
        res.render("dailyTurnoverPage", {
          title: "Doanh thu hôm nay",
          user: user,
          message: "Đã xảy ra lỗi",
        });
        return
      }
    }
    if (dateAndTotalTurnover.rows && dateAndTotalTurnover.rows.length == 0) {
      res.render("dailyTurnoverPage", {
        title: "Doanh thu hôm nay",
        user: user,
        message:"Hôm nay không có giao dịch nào"
      });
      return
    }
    if (!dateAndTotalTurnover.rows) {
      res.render("dailyTurnoverPage", {
        title: "Doanh thu hôm nay",
        user: user,
        message:"Đã xảy ra lỗi, không thể lấy được các giao dịch hôm nay"
      });
      return
    }
  } catch (err) {
    res.render("errorPage", {
      title: "Lỗi",
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
      title: "Chi tiết giao dịch",
      user: user,
      details: result,
      header: orderInfor[0],
    });
  } catch (err) {
    res.render("errorPage", {
      title: "Lỗi",
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
    var id = "";
    if (req.body.id) {
      id = req.body.id;
    }

    var result;
    result = await dbModel.updateState(id);

    if (result.rows) {
      result = result.rows;
      res.send("Thành công");
    } else {
      res.send(result);
    }
  } catch (err) {
    res.render("errorPage", {
      title: "Lỗi",
      user: user,
      message: err.message,
    });
  }
};
module.exports = { loadPage, loadDetails, updateState };
