const dbModel = require("../models/dbHelpers/dbHelpers");
const dataExporter=require('json2csv').Parser
const json2csv=require('json2csv')
var itemPerPage = 15;
var totalPage = 0;
var currentPage = 0;
const loadPage = async (req, res) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
    console.log(user);
  }
  message = "";
  try {
    var currentDate = new Date();
    if (req.query.month) {
      currentMonth = req.query.month;
    } else {
      currentMonth = currentDate.getMonth() + 1;
    }
    if (req.query.year) {
      currentYear = req.query.year;
    } else {
      currentYear = currentDate.getFullYear();
    }
    var result = await dbModel.getStatistical(currentMonth, currentYear);
    if (result.rows) {
      result = result.rows;
      if (req.query.page) {
        if (req.query.page != "") {
          currentPage = parseInt(req.query.page);
        }
      }
      productList=[]
      number=[]
      color=[]
      for (i =0;i<result.length;i++){
        productList.push(`'${result[i].ten_mat_hang}'`)
        number.push(result[i].so_luong)
        color.push(`'#${Math.floor(Math.random()*16777215).toString(16)}'`)
      }
      totalPage =
        parseInt(result.length / itemPerPage) +
        (result.length % itemPerPage > 0 ? 1 : 0);
      var newResult = result.slice(
        currentPage * itemPerPage,
        currentPage * itemPerPage + itemPerPage
      );
      res.render("statisticPage", {
        title: "Thống kê",
        user: user,
        product: newResult,
        currentPage,
        totalPage,
        productList:productList,
        number:number,
        color:color,
        month:currentMonth,
        year:currentYear
      });
      return;
    } else {
      res.render("statisticPage", {
        title: "Thống kê",
        message: result.message,
        user: user,
        product: result,
        month:currentMonth,
        year:currentYear
      });
      return;
    }
  } catch (error) {
    res.render("errorPage", {
      title: "Lỗi",
      user: user,
      message: error.message,
    });
  }
};

const getCSV = async (req, res) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
    console.log(user);
  }
  message = "";
  try {
    var currentDate = new Date();
    if (req.body.month) {
      currentMonth = req.body.month;
    } else {
      currentMonth = currentDate.getMonth() + 1;
    }
    if (req.body.year) {
      currentYear = req.body.year;
    } else {
      currentYear = currentDate.getFullYear();
    }
    console.log(currentMonth,currentYear)
    var result = await dbModel.getStatistical(currentMonth, currentYear);
    console.log(result.rows)
    if (result.rows) {
      result=result.rows
      data=JSON.parse(JSON.stringify(result))
      fileHeader=[]
      var jsonData=new dataExporter({withBOM:true,excelStrings:true})
      var BOM = "\uFEFF"; 
      var csvData=jsonData.parse(data)
      res.setHeader("Content-type","text/csv;charset=utf-8")
      res.setHeader("Content-Disposition",`attachment; filename=ThongKe${currentMonth}_${currentYear}.csv`)
      res.status(200).end(csvData)
      return
    }

    else {
      res.status(403).send('Fail')
    }
  } catch (error) {
    res.render("errorPage", {
      title: "Lỗi",
      user: user,
      message: error.message,
    });
  }
};
module.exports = { loadPage,getCSV };
