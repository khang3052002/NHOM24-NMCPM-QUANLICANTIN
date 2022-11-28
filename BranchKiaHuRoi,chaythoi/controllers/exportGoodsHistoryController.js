const dbModel = require("../models/dbHelpers/dbHelpers");
const loadHistory = async (req, res, next) => {
  try {
    user = {};
    if (req.session.user) {
      user = req.session.user;
    }

    receiptIDArr = await dbModel.getAllReCeiptID();
    // console.log(receiptIDArr)
    detailArr = [];
    temp = {};
    // console.log(Array.from({hehe:3}))
    for (i = 0; i < receiptIDArr.length; i++) {
      temp[receiptIDArr[i].ma_phieu] = { ngaynhap: receiptIDArr[i].ngay_nhap };
      detailArr.push(temp);
      temp = {};
    }
    var preparedArr = [];
    for (i = 0; i < receiptIDArr.length; i++) {
      var result;
      detail = await dbModel.getReCeiptInfo(receiptIDArr[i].ma_phieu);
      result = Object.keys(detailArr[i]).map((key) => [
        key,
        Object.keys(detailArr[i][key]).map((key1) => [
          key1,
          detailArr[i][key][key1],
        ]),
      ]);
      var c = result;
      result[0][1][0].push(detail);
      var a = result[0][1][0].reduce(function (result1, item, index, array) {
        if (index == 0) {
          result1[array[0]] = array[1];
        }
        if (index == 1) {
          result1["chi_tiet"] = array[2];
        }
        return result1;
      }, {});
      c[0][1] = a;
      var b = c[0].reduce(function (result1, item, index, array) {
        if (index == 0) {
          result1["ma_phieu"] = array[0];
        }
        if (index == 1) {
          result1["chi_tiet_phieu"] = array[1];
        }
        return result1;
      }, {});
      c[0] = b;
      preparedArr.push(c[0]);
    }
    if (preparedArr.length > 0) {
      res.render("importGoodsHistoryPage", {
        user: user,
        transactionsList: preparedArr,
      });
    } else {
      res.send("Thành công");
    }
    // console.log(preparedArr)
  } catch (err) {
    console.log(err.message)
  }
};

module.exports = { loadHistory };
